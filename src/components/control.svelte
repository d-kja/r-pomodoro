<script lang="ts">
  import { Play, Undo2, Pause } from "lucide-svelte";
  import {
    cycle,
    type Cycle,
    startCycle,
    stopCycle,
    resetCycle,
  } from "../stores/cycle-store";

  let currentCycle: Cycle | undefined;

  cycle.subscribe((value) => {
    currentCycle = value;
  });

  const handleToggleCycle = () => {
    if (!currentCycle?.isRunning) {
      startCycle();
      return;
    }

    stopCycle();
  };

  const handleResetCycle = () => {
    resetCycle();
  };
</script>

<div class="mt-auto flex justify-center gap-2">
  <button
    class="btn-icon rounded-full controls variant-glass-surface mt-auto font-semibold text-surface-400/75 group"
    title="Reset"
    on:click={handleResetCycle}
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
