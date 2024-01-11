<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import Controls from "./control.svelte";
</script>

<main class="flex flex-col flex-1 px-4 py-6">
  <div class="flex flex-1 items-center justify-center gap-1 timer">
    <span>3</span>
    <span>0</span>
    <span>:</span>
    <span>0</span>
    <span>0</span>
  </div>
  <Controls />
</main>
