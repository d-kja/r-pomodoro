<script>
  import { ProgressBar } from "@skeletonlabs/skeleton";
</script>

<main class="flex flex-col flex-1 px-4 py-6">
  <div class="mt-auto flex flex-col">
    <button
      class="btn rounded-b-none variant-glass-primary mt-auto font-semibold text-surface-400/75 hover:text-surface-200"
    >
      Start
    </button>

    <ProgressBar
      meter="bg-secondary-500/20"
      track="bg-surface-900/50"
      rounded="rounded-b-md"
      label="Progress Bar"
      value={15}
      max={100}
    />
  </div>
</main>
