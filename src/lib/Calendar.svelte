<script lang="ts">
  import { generateCalendarData } from "./Calendar.utils.js";
  // onDayClick
  // dayClass
  // dayNames
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
  <div class="flex items-center justify-center">Su</div>
  <div class="flex items-center justify-center">Mo</div>
  <div class="flex items-center justify-center">Tu</div>
  <div class="flex items-center justify-center">We</div>
  <div class="flex items-center justify-center">Th</div>
  <div class="flex items-center justify-center">Fr</div>
  <div class="flex items-center justify-center">Sa</div>
  {#each data.days as day}
    <button
      on:click={() => {
        activeDate = day.date;
      }}
      class:bg-pink-500={day.date === activeDate}
      class="h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center"
    >
      {day?.day}
    </button>
  {/each}
</section>
