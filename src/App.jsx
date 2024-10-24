import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import DogDetailPage from "./pages/DogDetailPage/DogDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage";
import BreedsDetailPage from "./pages/BreedsDetailPage/BreedsDetailPage";
import CountryDetailPage from "./pages/CountryDetailPage/CountryDetailPage";
import CountryFilterPage from "./pages/CountryFilterPage/CountryFilterPage";
import { CountryProvider } from "./providers/countriesProvider";
import { BreedProvider } from "./providers/breedsProvider";
import { AuthProvider } from "./providers/authProvider";
import UserPage from "./pages/UserPage/UserPage";
import ProtectedRoute from "../src/assets/components/ProtectedRoute.jsx";
import { DogsProvider } from "./providers/dogsProvider.jsx";

function App() {
  return (
    <>
      <DogsProvider>
        <BreedProvider>
          <CountryProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="test-mating" element={<Testmating />} />
                    <Route path="latest-news" element={<NewsPage />} />
                    <Route path="contact-us" element={<ContactusPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="search-a-dog" element={<SearchDogPage />} />
                    <Route path="dogs-list" element={<DogsListPage />} />
                    <Route path="login" element={<LoginPage />} />
                    {/* rotta protetta  */}
                    <Route path="add-new-dog" element={<AddDogPage />} />
                    <Route
                      path="userDetail"
                      element={
                        <ProtectedRoute>
                          <UserPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="dogDetail" element={<DogDetailPage />} />
                    {/* da sistemare con l'id ^ */}
                    <Route path="newsDetail" element={<NewsDetailPage />} />
                    {/* da sistemare con l'id ^ */}
                    <Route path="breedsDetail" element={<BreedsDetailPage />} />
                    {/* da sistemare con l'id ^ */}
                    <Route
                      path="countryDetail"
                      element={<CountryDetailPage />}
                    />
                    {/* da sistemare con l'id ^ */}
                    <Route
                      path="countryFilter"
                      element={<CountryFilterPage />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </CountryProvider>
        </BreedProvider>
      </DogsProvider>
    </>
  );
}

export default App;
