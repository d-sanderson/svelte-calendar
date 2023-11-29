
interface CalendarData {
  year: number;
  month: Date;
  days: {
    day: number;
    date: number;
  }[];
}

export const generateCalendarData = (year: number, month: number): CalendarData => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const calendarData = [];
  // days of week from last month
  const prevMonthLastDay = new Date(year, month, 0);
  const daysInPrevMonth = prevMonthLastDay.getDate();
  const prevMonthStartIndex = firstDayIndex - 1;
  for (
    let i = daysInPrevMonth - prevMonthStartIndex;
    i <= daysInPrevMonth;
    i++
  ) {
    calendarData.push({
      day: i,
      date: new Date(year, month - 1, i).setHours(0, 0, 0, 0),
    });
  }

  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarData.push({
      day: i,
      date: new Date(year, month, i).setHours(0, 0, 0, 0),
    });
  }

  // Calculate the number of days from the next month needed to fill the grid
  const remainingDays =
    (calendarData.length >= 36 ? 42 : 35) - calendarData.length;

  // Add days from the next month
  for (let i = 1; i <= remainingDays; i++) {
    calendarData.push({
      day: i,
      date: new Date(year, month + 1, i).setHours(0, 0, 0, 0),
    });
  }

  return {
    year: firstDay.getFullYear(),
    month: firstDay,
    days: calendarData,
  };
}

export const limiter = (
  now: Date,
  limitDate: Date,
  type: "prev" | "next"
): boolean => {
  if(!limitDate) return false
  switch (type) {
    case "prev":
      return now >= limitDate;
    case "next":
      return now <= limitDate;
  }
};

export const getYearandMonth = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth()
})
