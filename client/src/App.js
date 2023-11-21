// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./Utils/DataContext";
import NavBar from "./Components/NavBar";
import LogIn from "./Components/Authentication/LogIn";
import Problems from "./Components/Problems";
import ProblemDescription from "./Components/ProblemDescription";

function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Problems />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/problem/:probid" element={<ProblemDescription />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
