import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./context/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null)

  // to show the alert
  const showAlert=(message,type)=>{
    setAlert({
      msg :message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);


  }
  return (
    <>
      <div >
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
            <Routes>
              <Route exact path="/about" element={<About showAlert={showAlert} />} />
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login  showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
