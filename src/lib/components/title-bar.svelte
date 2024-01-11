<script>
  import { appWindow } from "@tauri-apps/api/window";
  import { Minimize2, Settings, X } from "lucide-svelte";

  function handleClose() {
    appWindow.close();
  }
</script>

<nav data-tauri-drag-region class="titlebar mx-1">
  <div>
    <button
      class="btn controls mt-auto p-1 font-semibold text-surface-400/75 group"
      title="Settings"
    >
      <Settings class="group-hover:stroke-surface-50" strokeWidth={1.5} />
    </button>
  </div>

  <div>
    <button
      class="btn controls mt-auto p-1 font-semibold text-surface-400/75 group"
      title="Minimize"
    >
      <Minimize2 class="group-hover:stroke-surface-50" strokeWidth={1.5} />
    </button>

    <button
      on:click={handleClose}
      class="btn controls mt-auto p-1 font-semibold text-surface-400/75 group"
      title="Close"
    >
      <X class="group-hover:stroke-surface-50" strokeWidth={1.5} />
    </button>
  </div>
</nav>
