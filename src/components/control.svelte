<script lang="ts">
  import { Play, Undo2, Settings, Pause } from "lucide-svelte";
  import {
    cycle,
    updateTime,
    type Cycle,
    startCycle,
    stopCycle,
  } from "../stores/cycle-store";
  import day from "dayjs";

  let currentCycle: Cycle | undefined;

  cycle.subscribe((value) => {
    currentCycle = value;
  });

  const handleToggleCycle = () => {
    const startingTime = day();

    if (!currentCycle?.isRunning) {
      startCycle({ startingTime });
      return;
    }

    stopCycle();
  };

  const handleResetCycle = () => {};
</script>

<div class="mt-auto flex justify-center gap-2">
  <button
    class="btn-icon rounded-full controls variant-glass-surface mt-auto font-semibold text-surface-400/75 group"
    title="Reset"
  >
    <Undo2 class="group-hover:stroke-surface-50" strokeWidth={1.5} />
  </button>

  <button
    title="Start"
    on:click={handleToggleCycle}
    class="btn-icon controls-fill variant-glass-surface mt-auto font-semibold text-surface-400/75 group"
  >
    {#if currentCycle?.isRunning}
      <Pause class="group-hover:fill-surface-100" />
    {:else}
      <Play class="group-hover:fill-surface-100" />
    {/if}
  </button>
</div>
