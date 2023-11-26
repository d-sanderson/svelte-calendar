<script lang="ts">
  // onDayClick

  const currentDate = new Date();
  const options = { month: "long" };
  let activeDate = new Date().setHours(0, 0, 0, 0);
  function generateCalendarData(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();

    const calendarData = [];

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
        date: new Date(year, month - 1, i),
      });
    }
    // Add days of the month
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

  $: data = generateCalendarData(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
</script>

<section class="grid grid-rows-5 grid-cols-7 h-full gap-1 w-full">
  <button
    class="col-span-1 text-center"
    on:click={() => {
      data = generateCalendarData(
        data.month.getFullYear(),
        data.month.getMonth() - 1
      );
    }}>prev</button
  >
  <div class="col-span-5 text-center">
    {data.month.toLocaleString("en-US", options)}
    {data.year}
  </div>
  <button
    class="col-span-1 text-center"
    on:click={() => {
      data = generateCalendarData(
        data.month.getFullYear(),
        data.month.getMonth() + 1
      );
    }}>next</button
  >
  <div>Su</div>
  <div>Mo</div>
  <div>Tu</div>
  <div>We</div>
  <div>Th</div>
  <div>Fr</div>
  <div>Sa</div>
  {#each data.days as day}
    <button
      on:click={() => {
        activeDate = day.date;
      }}
      class={`${
        day.date === activeDate ? "bg-pink-500" : "bg-transparent"
      } h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center`}
    >
      {day?.day}
    </button>
  {/each}
  {activeDate && activeDate}
</section>
