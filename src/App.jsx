import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./DefaultLayout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<HomePage/>}/>
          
          
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
