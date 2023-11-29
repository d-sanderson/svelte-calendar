<script lang="ts">
  import { generateCalendarData, limiter } from "./Calendar.utils.js";
  // onDayClick
  // dayClassActive
  // prev
  // next
  // activeDate
  export let maxDate: Date;
  export let minDate: Date;
  export let calendarContainerClass =
    "grid grid-rows-5 grid-cols-7 h-full gap-1 w-full";
  export let dayClass =
    "h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center";
  export let dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const currentDate = new Date();
  export let selectedDate = new Date().setHours(0, 0, 0, 0);

  $: data = generateCalendarData(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
</script>

<section class={calendarContainerClass}>
  <button
    class="col-span-1 flex items-end justify-center"
    on:click={() => {
      const year = data.month.getFullYear();
      const month = data.month.getMonth();
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
      const year = data.month.getFullYear();
      const month = data.month.getMonth();
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
      disabled={day.date < currentDate.setHours(0, 0, 0, 0)}
      on:click={() => {
        selectedDate = day.date;
        const month = new Date(selectedDate).getMonth();
        const year = new Date(selectedDate).getFullYear();
        data = generateCalendarData(year, month);
      }}
      class:bg-gray-200={day.date < currentDate.setHours(0, 0, 0, 0)}
      class:bg-pink-500={day.date === selectedDate}
      class:cursor-not-allowed={day.date < currentDate.setHours(0, 0, 0, 0)}
      class={dayClass}
    >
      {day?.day}
    </button>
  {/each}
  <span class="col-span-7">
    The selected date is:
    {new Date(selectedDate).toLocaleDateString()}
  </span>
</section>
