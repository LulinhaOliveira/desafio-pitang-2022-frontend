import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Schedulings from "./pages/Scheduling";
import Scheduling from "./pages/Scheduling/Scheduling";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Schedulings />} index />
          <Route path="/create" element={<Scheduling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
