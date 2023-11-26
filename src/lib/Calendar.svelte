<script lang="ts">
  import { generateCalendarData } from "./Calendar.utils.js";
  // onDayClick
  // dayClass
  export let dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const currentDate = new Date();
  const options = { month: "long" };
  let activeDate = new Date().setHours(0, 0, 0, 0);

  $: data = generateCalendarData(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
</script>

<section class="grid grid-rows-5 grid-cols-7 h-full gap-1 w-full">
  <button
    class="col-span-1 flex items-end justify-center"
    on:click={() => {
      data = generateCalendarData(
        data.month.getFullYear(),
        data.month.getMonth() - 1
      );
    }}>prev</button
  >
  <div class="col-span-5 flex items-end justify-center">
    {data.month.toLocaleString("en-US", options)}
    {data.year}
  </div>
  <button
    class="col-span-1 flex items-end justify-center"
    on:click={() => {
      data = generateCalendarData(
        data.month.getFullYear(),
        data.month.getMonth() + 1
      );
    }}>next</button
  >
  {#each dayNames as dn}
  <div class="day-name">{dn}</div>
  {/each}
  {#each data.days as day}
    <button
      on:click={() => {
        activeDate = day.date;
        const month = new Date(activeDate).getMonth()
        const year = new Date(activeDate).getFullYear()
        data = generateCalendarData(year, month)
      }}
      class:bg-pink-500={day.date === activeDate}
      class="h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center"
    >
      {day?.day}
    </button>
  {/each}
</section>
