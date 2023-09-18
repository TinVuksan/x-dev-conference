import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from "./Components/Auth/RequireAuth";
import PersistLogin from "./Components/PersistLogin/PersistLogin";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Speakers from "./Pages/Speakers/Speakers";
import Pricing from "./Pages/Pricing/Pricing";
import About from "./Components/About/About";
import News from "./Pages/News/News";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route path="/signup" element={<Signup></Signup>} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/speakers" element={<Speakers></Speakers>} />
          <Route path="/pricing" element={<Pricing></Pricing>} />
          <Route path="/news" element={<News></News>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
