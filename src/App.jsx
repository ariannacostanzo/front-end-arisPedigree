import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./DefaultLayout";
import HomePage from "./pages/HomePage/HomePage";
import Testmating from "./pages/TestmatingPage/TestmatingPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import ContactusPage from "./pages/ContactusPage/ContactusPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchDogPage from "./pages/SearchDogPage/SearchDogPage";
import DogsListPage from "./pages/DogsListPage/DogsListPage";
import AddDogPage from "./pages/AddDogPage/AddDogPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="test-mating" element={<Testmating/>}/>
            <Route path="latest-news" element={<NewsPage/>}/>
            <Route path="contact-us" element={<ContactusPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="search-a-dog" element={<SearchDogPage/>}/>
            <Route path="dogs-list" element={<DogsListPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="add-new-dog" element={<AddDogPage/>}/>
          
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
