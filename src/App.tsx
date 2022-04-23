import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Tv from "./Screens/Tv";
import Search from "./Screens/Search";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="tv" element={<Tv />} />
        <Route path="search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="movies/:movieId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
