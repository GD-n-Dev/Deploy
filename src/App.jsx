import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

//  async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   setGreetMsg(await invoke("greet", { name }));
// }

  return (
    <div className="container">
      <h1>Deployment Tool</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
        }}
      >
      <div className='row'>
        <input placeholder="Choose folder location" disabled/>
        <button type="button">Browse</button>
      </div>
      <div className='row'>
        <input placeholder="Choose folder location" disabled/>
        <button type="button">Browse</button>
      </div>
      </form>
      <div className='row' style={{position: 'absolute', bottom: '0'}}>
        <button type='button'>Restore last backup</button>
        <button type='button'>Deploy</button>
      </div>
    </div>
  );
}

export default App;
