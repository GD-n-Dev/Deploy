#![allow(unused_imports)]
#![allow(unused_variables)]

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Stdio};

use std::{fs, env};
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};

use serde_json::Value;
use tauri::{command, App, Manager, Window, State};
use reqwest::Client;
use serde::{Serialize, Deserialize};


fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
         get_config,
         deploy_main,
         ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


#[tauri::command]
fn get_config() -> String {
   let raw_json: String = fs::read_to_string("../Deploy.json").unwrap();
   println!("raw_json: {}", raw_json);
   raw_json
}

#[tauri::command]
fn get_status() -> String {
    match Command::new("git")
        .arg("pull")
        .output()
        {
            Ok(output) => String::from_utf8_lossy(&output.stdout).to_string(),
            Err(err) => err.to_string(),
        }
}

#[tauri::command]
fn deploy_main() {
    let config: String = get_config();
    // Get config value to get live SEER path
    // Get config value backup SEER path
    // Backup SEER and create new folder with date and version

    // when backup is completed then go ahead and robocopy overwrite build files into live SEER
    // folder
}
