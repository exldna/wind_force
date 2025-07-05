import { useEffect, useState } from "preact/hooks";
import { format, isSameDay, startOfWeek, addDays, getWeek } from "date-fns";
import { ru } from "date-fns/locale";

interface Event {
  time: string;
  title: string;
  subtitle: string;
  note?: string;
}

const mockData: Record<string, Event[]> = {
  "2025-04-07": [
    {
      time: "09:00–11:00",
      title: "Training",
      subtitle: "RS Quest 5",
    },
    {
      time: "10:30–12:30",
      title: "Cup Race",
      subtitle: "Swan 35",
      note: "➔ Collisions c 1 (Harbor A)",
    },
  ],
  "2025-07-07": [
    {
      time: "09:00–11:00",
      title: "Training",
      subtitle: "RS Quest 5",
    },
    {
      time: "10:30–12:30",
      title: "Cup Race",
      subtitle: "Swan 35",
      note: "➔ Collisions c 1 (Harbor A)",
    },
  ],
  "2025-07-08": [
    {
      time: "08:00–10:00",
      title: "Cruise",
      subtitle: "Laser 12",
    },
    {
      time: "11:00–13:00",
      title: "Private Lesson",
      subtitle: "Swan 35",
    },
  ],
  "2025-07-14": [
    {
      time: "10:00–12:00",
      title: "Team Practice",
      subtitle: "J70",
    },
  ],
  "2025-07-16": [
    {
      time: "14:00–16:00",
      title: "Regatta",
      subtitle: "Flying Scot",
    },
  ],
  "2025-07-21": [
    {
      time: "12:00–14:00",
      title: "Junior Training",
      subtitle: "Optimist",
    },
  ],
  "2026-09-09": [
    {
      time: "12:00–14:00",
      title: "Junior Training",
      subtitle: "Optimist",
    },
  ],
};

interface UpcomingEvent extends Event {
  date: Date;
  dateTime: Date;
}

interface DayGroup {
  date: Date;
  events: UpcomingEvent[];
  weekNumber: number;
  year: number;
}

export default function Schedule() {
  const [days, setDays] = useState<DayGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentYear = new Date().getFullYear(); // Текущий год

  useEffect(() => {
    setIsLoading(true);

    const now = new Date();
    const allEvents: UpcomingEvent[] = [];

    // Собираем все события в единый массив
    for (const dateKey in mockData) {
      const eventDate = new Date(dateKey);
      const dayEvents = mockData[dateKey] || [];

      dayEvents.forEach((event) => {
        const [startTime] = event.time.split("–");
        const [hours, minutes] = startTime.split(":").map(Number);

        const dateTime = new Date(eventDate);
        dateTime.setHours(hours, minutes);

        allEvents.push({
          ...event,
          date: eventDate,
          dateTime,
        });
      });
    }

    // Фильтруем и сортируем события
    const filteredEvents = allEvents
      .filter((event) => event.dateTime >= now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    // .slice(0, 10); // (Потенциально) ограничиваем макс. ближайших событий

    // Группируем события по дням и добавляем номер недели
    const groupedDays: DayGroup[] = [];
    filteredEvents.forEach((event) => {
      const existingDay = groupedDays.find((day) =>
        isSameDay(day.date, event.date)
      );

      if (existingDay) {
        existingDay.events.push(event);
      } else {
        groupedDays.push({
          date: event.date,
          events: [event],
          weekNumber: getWeek(event.date, { weekStartsOn: 1 }), // Недели начинаются с понедельника
          year: event.date.getFullYear(),
        });
      }
    });

    setDays(groupedDays);
    setIsLoading(false);
  }, []);

  // Функция для определения, нужно ли добавлять разделитель недели
  const shouldAddWeekDivider = (currentIndex: number) => {
    if (currentIndex === 0) return true; // Всегда показываем для первой недели

    const currentDay = days[currentIndex];
    const previousDay = days[currentIndex - 1];

    // Сравниваем недели И годы
    return (
      currentDay.weekNumber !== previousDay.weekNumber ||
      currentDay.year !== previousDay.year
    );
  };

  // Форматирование даты дня с годом (если не текущий)
  const formatDayTitle = (date: Date) => {
    const year = date.getFullYear();
    const formatPattern =
      year !== currentYear ? "EEEE, d MMMM yyyy" : "EEEE, d MMMM";
    return format(date, formatPattern, { locale: ru });
  };

  // Форматирование заголовка недели
  const formatWeekTitle = (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    const weekYear = date.getFullYear();

    const startFormat = weekYear !== currentYear ? "d MMM yyyy" : "d MMM";
    const endFormat =
      weekEnd.getFullYear() !== currentYear ? "d MMM yyyy" : "d MMM";

    return `Неделя ${format(weekStart, startFormat, { locale: ru })} - ${format(
      weekEnd,
      endFormat,
      { locale: ru }
    )}`;
  };

  return (
    <div class="p-4 mx-auto max-w-screen-sm">
      <h2 class="text-lg font-bold text-center mb-6">Ближайшие события</h2>

      {isLoading ? (
        <div class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-600">Загрузка событий...</p>
        </div>
      ) : days.length > 0 ? (
        <div class="space-y-8">
          {days.map((day, index) => (
            <div key={index}>
              {/* Разделитель недели */}
              {shouldAddWeekDivider(index) && (
                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center">
                    <span class="px-4 bg-white text-sm font-medium text-gray-600">
                      {formatWeekTitle(day.date)}
                    </span>
                  </div>
                </div>
              )}

              {/* Карточка дня */}
              <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div class="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <h3 class="font-bold text-blue-800">
                    {formatDayTitle(day.date)}
                  </h3>
                </div>

                <div class="divide-y divide-gray-100">
                  {day.events.map((event, idx) => (
                    <div key={idx} class="px-4 py-3">
                      <div class="flex justify-between items-start">
                        <div class="font-medium text-gray-700 w-16 flex-shrink-0">
                          {event.time}
                        </div>
                        <div class="flex-1 pl-3">
                          <div class="font-semibold text-gray-900">
                            {event.title}
                          </div>
                          <div class="text-gray-600 mt-1">{event.subtitle}</div>
                          {event.note && (
                            <div class="text-sm text-red-500 mt-1">
                              {event.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="py-6 text-center text-gray-500">
          Нет предстоящих событий
        </div>
      )}
    </div>
  );
}
