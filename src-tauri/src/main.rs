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
         git_pull,
         get_config,
         check_git_installed,
         ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


// need to update this with the new token api
// create another test one with github if working from home for testing purposes
// both should work similar enough to use both bitbucket and github.
#[tauri::command]
async fn git_pull() -> Result<String, String> {
    let output = std::process::Command::new("git")
        .arg("pull")
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
        Ok("Git pull successful".to_string())
    } else {
        Err(format!("Error during git pull: {}", String::from_utf8_lossy(&output.stderr)))
    }
}


#[tauri::command] // Mark this function as a Tauri command
fn check_git_installed() -> Result<String, String> {
    match Command::new("git").arg("--version").output() {
        Ok(res) => Ok(String::from_utf8_lossy(&res.stdout).to_string()),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command] // Mark this function as a tauri command
fn get_config() -> String {
   
   // let raw_json: String = fs::read_to_string().unwrap();
   // println!("path was passed: {}", path);
   // println!("raw_json: {}", raw_json);
   // raw_json
   String::from("test")
}
