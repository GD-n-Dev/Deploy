#![allow(unused_imports)]
#![allow(unused_variables)]

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::collections::HashMap;

use std::{fs, env};
use std::io::{self, Read, Stdout, Write};
use std::path::{Path, PathBuf};

use serde_json::Value;
use tauri::{command, App, Manager, Window, State};
use reqwest::Client;
use serde::{Serialize, Deserialize};


fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
         get_config,
         get_status,
         deploy_main,
         ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


#[tauri::command]
fn get_config() -> String {
    let cmd = Command::new("cmd")
        .arg("echo")
        .arg("test");
    let result = cmd.output();
}

#[tauri::command]
fn get_status() -> String {
    let mut cmd = Command::new("git");
    cmd.current_dir("C:\\Users\\Jonathan Lister\\jlister\\Github_Projects\\Deploy\\");
    cmd.args(["pull"]);

    let output = cmd.output().expect("Failed to execute Command");

    if output.status.success() {
        //println!("Output: {}", String::from_utf8_lossy(&output.stdout));
        String::from_utf8_lossy(&output.stdout).to_string()
    } else {
        //println!("Command Failed with error: {}", String::from_utf8_lossy(&output.stderr));
        String::from_utf8_lossy(&output.stderr).to_string()
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
