import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Topics from "./pages/Topics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
