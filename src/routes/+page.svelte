<script>
  import Calendar from "$lib/Calendar.svelte";
  import "../app.css";
</script>

<div class="w-80 mx-auto">
  <Calendar
    minDate={new Date('08/22/2023')}
    maxDate={new Date('2/22/2024')}
    dayClass="h-10 w-10 rounded-full border-blue-500 border items-center flex justify-center"
    onClickDay={(day) => {
        console.log({day})
    }}
  />
</div>

