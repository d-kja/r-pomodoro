<script lang="ts">
  import Controls from "./control.svelte";
  import { cycle } from "../stores/cycle-store";
  import { getTimeFromElapsed } from "../utils/cycle-utils";

  let currentTime: string[] = ["25", "00"];

  cycle.subscribe((value) => {
    currentTime = value.elapsedTime
      ? getTimeFromElapsed(value.elapsedTime)
      : value.baseTime.split(":");
  });

  $: minutes = currentTime[0];
  $: seconds = currentTime[1];
</script>

<main class="flex flex-col flex-1 px-4 pb-6">
  <div class="flex flex-1 items-center justify-center gap-1 timer">
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <span>:</span>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </div>
  <Controls />
</main>
