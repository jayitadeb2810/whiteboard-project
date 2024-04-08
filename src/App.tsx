import React from "react"
import logo from "./logo.svg"
import "./App.css"
import ImageUpload from "./components/ImageUpload"
import Whiteboard from "./components/WhiteBoard"

function App() {
  return (
    <div className="App">
      <Whiteboard />
      {/* <ImageUpload /> */}
    </div>
  )
}

export default App
