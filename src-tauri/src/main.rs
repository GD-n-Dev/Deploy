#![allow(unused_imports)]
#![allow(unused_variables)]

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Stdio};

use serde_json::Value;
use tauri::{command, App, Manager, Window, State};
use reqwest::Client;
use serde::{Serialize, Deserialize};

use std::fs;
use std::io::{self, Read};
use std::path::{Path, PathBuf};
use std::env;


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

#[tauri::command] // Tauri Command
fn deploy_main(deploy_path: String) {
    
}
