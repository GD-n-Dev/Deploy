#![allow(unused_imports)]
#![allow(unused_variables)]

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Stdio};
use std::collections::HashMap;

use std::{fs, env};
use std::io::{self, Read, Stdout, Write};
use std::path::{Path, PathBuf};

use serde::de::Error;
use serde_json::Value;
use tauri::{command, App, Manager, Window, State};
use reqwest::Client;
use serde::{Serialize, Deserialize};

use rfd::FileDialog;


fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
         get_directory,
         get_status,
         project_backup,
         open_dialog
         ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_directory() -> String {
    let mut cmd = Command::new("Powershell");
    cmd.args(["/C", "PWD", "|", "% { $_.Path }"]);
    
    let output = cmd.output().expect("Failed to execute Command");

    if output.status.success() {
        String::from_utf8_lossy(&output.stdout).to_string()
    } else{
        String::from_utf8_lossy(&output.stdout).to_string()
    }
}


#[tauri::command]
fn get_status() -> String {
    let mut cmd = Command::new("Powershell");
    cmd.current_dir("C:\\Users\\Jonathan Lister\\jlister\\Github_Projects\\Deploy\\");
    cmd.args(["git","pull"]);

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
fn project_backup(source_path: String, target_path: String) -> String {
    println!("Source Path: {}", source_path);
    println!("Target Path: {}", target_path);
    "testing".to_string()
}

#[tauri::command]
fn open_dialog() -> String {

    let path_dialog = FileDialog::new()
        .set_directory("/")
        .pick_folder();
    
    let data = path_dialog.unwrap().to_str().unwrap().to_string();
    println!("{}", &data);
    data

}

#[allow(unused)]
fn get_profile_path() -> String {
    let mut cmd = Command::new("Powershell");
    cmd.args(["echo", "$USERPROFILE"]);
    String::from_utf8_lossy(&cmd.output().unwrap().stdout).to_string()
}
