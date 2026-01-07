import { Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Categories from "./Components/Categories";
import Podcasts from "./Components/Podcasts";
import MusicCard from "./Components/MusicCard";
function App() {

  return (
    <>
   
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/categories" element={<Categories/>}></Route>
        <Route path="/podcasts" element={<Podcasts/>}></Route>
        <Route path="/tracks" element={<MusicCard/>}></Route>
      </Routes>
    
    
    
    </>
  );
}

export default App;
