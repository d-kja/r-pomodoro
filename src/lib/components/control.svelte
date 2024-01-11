<script lang="ts">
  import { Play, Undo2, Settings } from "lucide-svelte";
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
    class="btn-icon controls-fill variant-glass-surface mt-auto font-semibold text-surface-400/75 group"
  >
    <Play class="group-hover:fill-surface-100" />
  </button>
</div>
