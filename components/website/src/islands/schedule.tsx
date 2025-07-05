import { useState, useEffect } from "preact/hooks";
import { format, addWeeks, startOfWeek, addDays } from "date-fns";
import { ru } from "date-fns/locale";

interface Event {
  time: string;
  title: string;
  subtitle: string;
  note?: string;
}

interface DaySchedule {
  date: Date;
  events: Event[];
}

const mockData: Record<string, Event[]> = {
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
};

export default function Schedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(2025, 6, 7), { weekStartsOn: 1 })
  );
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([]);

  // Генерация недельного расписания
  const generateWeekSchedule = (startDate: Date) => {
    const week: DaySchedule[] = [];

    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(startDate, i);
      const dateKey = format(dayDate, "yyyy-MM-dd");
      const events = mockData[dateKey] || [];

      week.push({
        date: dayDate,
        events,
      });
    }

    return week;
  };

  // Переключение недель
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  // Обновление расписания при смене недели
  useEffect(() => {
    setWeekSchedule(generateWeekSchedule(currentWeekStart));
  }, [currentWeekStart]);

  // Форматирование заголовка недели
  const weekTitle = () => {
    const endDate = addDays(currentWeekStart, 6);
    return `Неделя ${format(currentWeekStart, "d MMM", {
      locale: ru,
    })} - ${format(endDate, "d MMM", { locale: ru })}`;
  };

  return (
    <div class="p-4 mx-auto max-w-screen-sm">
      {/* Навигация по неделям */}
      <div class="flex items-center justify-between mb-6">
        <button
          type="submit"
          onClick={goToPreviousWeek}
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Пред
        </button>

        <h2 class="text-lg font-bold text-center">{weekTitle()}</h2>

        <button
          type="submit"
          onClick={goToNextWeek}
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          След →
        </button>
      </div>

      {/* Расписание по дням */}
      {weekSchedule.map((day, index) => (
        <div key={index} class="mt-6">
          <h2 class="text-lg font-bold py-2 border-b border-gray-200">
            {format(day.date, "EEE, d MMM", { locale: ru })}
          </h2>

          {day.events.length > 0 ? (
            <div class="divide-y divide-gray-100">
              {day.events.map((event, idx) => (
                <div key={idx} class="py-3">
                  <div class="flex justify-between items-start">
                    <div class="font-medium text-gray-700">{event.time}</div>
                    <div class="flex-1 pl-4">
                      <div class="font-semibold">{event.title}</div>
                      <div class="text-gray-600">{event.subtitle}</div>
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
          ) : (
            <div class="py-6 text-center text-gray-500">Нет мероприятий</div>
          )}
        </div>
      ))}
    </div>
  );
}
