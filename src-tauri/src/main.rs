#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]
  
  use tauri::Manager;
  use window_vibrancy::{apply_blur};
  
  fn main() {
    tauri::Builder::default()
      .setup(|app| {
        #[cfg(target_os = "windows")]
        apply_blur(&app.get_window("main").unwrap(), Some((18, 18, 18, 125)))
          .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
        
        #[cfg(target_os = "linux")]
        println!("Unsupported platform! Glass effect is not supported on this OS, using fallback");
  
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
