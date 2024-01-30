// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// For check_git_installed
use std::process::Command;
use std::process::Stdio;

// For Opening File Dialogs and Invoke
use rfd::AsyncFileDialog;

// For exchange_code_for_token
use tauri::{command, App, Manager, Window, State};
use reqwest::Client;
use serde::Deserialize;

// For reading config file
use std::fs;
use std::io::Read;
use std::env;

struct AuthClient {
    client: Client,
}

#[derive(Deserialize)]
struct AuthCode {
    code: String,
}

#[tauri::command]
async fn open_file_dialog() -> Result<Vec<u8>, String> {
    let path = AsyncFileDialog::new()
    .set_directory("/")
    .pick_folder()
    .await;
    let result = path.unwrap().read().await;
    Ok(result)
}

#[tauri::command]
async fn exchange_code_for_token(auth_client: State<'_, AuthClient>, auth_code: AuthCode) -> Result<String, String> {
    let response = auth_client.client.post("https://bitbucket.org/site/oauth2/access_token")
        .form(&[
            ("grant_type", "authorization_code"),
            ("code", &auth_code.code),
            ("redirect_uri", "uri"),
            ("client_id", "key"), // Replace with actual client ID
            ("client_secret", "secret"), // Replace with actual client secret
        ])
        .send()
        .await;

    match response {
        Ok(res) => {
            let token_data = res.text().await.unwrap(); // Handle this properly
            Ok(token_data)
        }
        Err(err) => Err(err.to_string()),
    }
}


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

 /* #[derive(Debug, Serialize)]
 struct CustomError {
     message: String,
 }

 impl From<std::io::Error> for CustomError {
     fn from(error: std::io::Error) -> Self {
         CustomError {
             message: error.to_string(),
         }
     }
 }

 #[command]
 async fn get_config() -> Result<String, CustomError> {
     let mut path = env::current_dir()?;
     path.push("../config/test.json");

     let mut file = fs::File::open(path)?;
     let mut contents = String::new();
     file.read_to_string(&mut contents)?;
    
     Ok(contents)
 } */

#[derive(Debug, serde::Serialize)]
struct CustomError {
    message: String,
}

impl From<std::io::Error> for CustomError {
    fn from(error: std::io::Error) -> Self {
        CustomError {
            message: error.to_string(),
        }
    }
}

#[command]
async fn get_config() -> Result<String, CustomError> {
    let current_directory = env::current_dir().map_err(|_| CustomError { message: "Failed to get current directory".to_owned() })?;

    let new_path = current_directory.join("config").join("test.json");

    let mut file = fs::File::open(new_path)?;

    let mut contents = String::new();

    file.read_to_string(&mut contents)?;
    Ok(contents)
}


fn main() {
    tauri::Builder::default()
    .manage(AuthClient {
        client: Client::new(),
    })
    .invoke_handler(tauri::generate_handler![exchange_code_for_token,
         get_config,
         open_file_dialog,
         ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
