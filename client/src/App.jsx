import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
