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
      title: "Usual work",
      subtitle: "C7",
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div class="p-4 mx-auto max-w-screen-sm font-sans bg-gray-900 min-h-screen text-white">
      {/* Заголовок в стиле Silavetra */}
      <div class="text-center mb-10 mt-8">
        <h1 class="text-3xl font-light tracking-wide text-gray-100">
          РАСПИСАНИЕ
        </h1>
      </div>

      {isLoading ? (
        <div class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-600 border-t-transparent"></div>
          <p class="mt-4 text-gray-500 font-light">Загрузка событий...</p>
        </div>
      ) : days.length > 0 ? (
        <div
          class={`${
            mounted ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <div class="space-y-10">
            {days.map((day, index) => (
              <div key={index} class="relative">
                {/* Разделитель недели */}
                {shouldAddWeekDivider(index) && (
                  <div class="relative mb-10 mt-8">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-700"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="px-4 bg-gray-900 text-sm text-gray-400 font-light tracking-wider">
                        {formatWeekTitle(day.date)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Блок дня */}
                <div>
                  {/* Заголовок дня */}
                  <h3 class="text-xl font-normal text-gray-300 mb-4 pb-2 border-b border-gray-800">
                    {formatDayTitle(day.date)}
                  </h3>

                  {/* Список событий */}
                  <div class="space-y-6 ml-1">
                    {day.events.map((event, idx) => (
                      <div key={idx} class="flex group">
                        {/* Время события */}
                        <div class="w-24 flex-shrink-0 pt-0.5">
                          <div class="text-gray-500 font-light group-hover:text-gray-300 transition-colors">
                            {event.time}
                          </div>
                        </div>

                        {/* Детали события */}
                        <div class="border-l border-gray-800 pl-4 pb-4 group-hover:border-gray-600 transition-colors">
                          <div class="font-normal text-gray-100 tracking-wide group-hover:text-white transition-colors">
                            {event.title}
                          </div>
                          <div class="text-gray-500 font-light mt-1 group-hover:text-gray-300 transition-colors">
                            {event.subtitle}
                          </div>
                          {event.note && (
                            <div class="text-sm text-gray-600 font-light mt-2 italic group-hover:text-gray-400 transition-colors">
                              {event.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div class="py-16 text-center">
          <p class="text-gray-500 font-light">Нет предстоящих событий</p>
        </div>
      )}
    </div>
  );
}
