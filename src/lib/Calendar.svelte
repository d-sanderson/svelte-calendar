<script lang="ts">
  import type { DayClick, NextPrevClick } from "./Calendar.types.js";
  import { generateCalendarData, getYearandMonth, limiter } from "./Calendar.utils.js";

  // dayClassActive
  // calendarType
  export let onClickNext: NextPrevClick
  export let onClickPrev: NextPrevClick
  export let onClickDay: DayClick

  export let maxDate: Date;
  export let minDate: Date;

  export let calendarContainerClass =
    "grid grid-rows-5 grid-cols-7 h-full gap-1 w-full";

  export let dayClass =
    "h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center";

  export let dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  export let activeDate = new Date().setHours(0, 0, 0, 0);

  const now = new Date();

  $: data = generateCalendarData(
    now.getFullYear(),
    now.getMonth()
  );
</script>

<section class={calendarContainerClass}>
  <button
    class="col-span-1 flex items-end justify-center"
    on:click={() => {
      const { year, month } = getYearandMonth(data.month)
      onClickPrev?.(month)
      if (limiter(data.month, minDate, "prev")) {
        data = generateCalendarData(year, month - 1);
      }
    }}>prev</button
  >
  <div class="col-span-5 flex items-end justify-center">
    {data.month.toLocaleString("en-US", { month: "long" })}
    {data.year}
  </div>
  <button
    class="col-span-1 flex items-end justify-center"
    on:click={() => {
      const { year, month } = getYearandMonth(data.month)
      onClickNext?.(month)
      if (limiter(data.month, maxDate, "next")) {
        data = generateCalendarData(year, month + 1);
      }
    }}>next</button
  >
  {#each dayNames as dn}
    <div class="day-name">{dn}</div>
  {/each}
  {#each data.days as day}
    <button
      disabled={day.date < now.setHours(0, 0, 0, 0)}
      on:click={() => {
        activeDate = day.date;
        onClickDay(activeDate)
        const { year, month } = getYearandMonth(new Date(activeDate))
        data = generateCalendarData(year, month);
      }}
      class:bg-gray-200={day.date < now.setHours(0, 0, 0, 0)}
      class:bg-pink-500={day.date === activeDate}
      class:cursor-not-allowed={day.date < now.setHours(0, 0, 0, 0)}
      class={dayClass}
    >
      {day?.day}
    </button>
  {/each}
  <span class="col-span-7">
    The selected date is:
    {new Date(activeDate).toLocaleDateString()}
  </span>
</section>
