// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::process::Stdio;

#[tauri::command] // Mark this function as a Tauri command
fn check_git_installed() -> bool {
    match Command::new("git")
        .arg("--version")
        .stdout(Stdio::piped())
        .output() 
    {
        Ok(output) => output.status.success(),
        Err(_) => false,
    }
}


fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![check_git_installed])
    .run(tauri::generate_context!())
    .expect("eror while running tauri appliction");
}