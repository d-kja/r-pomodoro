<script>
  import { appWindow } from "@tauri-apps/api/window";

  function handleMinimize() {
    appWindow.minimize();
  }

  function handleClose() {
    appWindow.close();
  }
</script>

<nav data-tauri-drag-region class="titlebar">
  <h1
    class="ml-1 text-sm font-medium tracking-wide leading-snug uppercase opacity-30"
  >
    Pomodoro
  </h1>

  <div>
    <button
      on:click={handleMinimize}
      class="titlebar-button"
      title="Minimize"
      id="titlebar-minimize"
    >
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize"
      />
    </button>
    <button
      on:click={handleClose}
      title="Close"
      class="titlebar-button"
      id="titlebar-close"
    >
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </button>
  </div>
</nav>
