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
import UpdateDogPage from "./pages/UpdateDogPage/UpdateDogPage.jsx";
import DogDetailPage from "./pages/DogDetailPage/DogDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage";
import BreedsDetailPage from "./pages/BreedsDetailPage/BreedsDetailPage";
import CountryDetailPage from "./pages/CountryDetailPage/CountryDetailPage";
import { CountryProvider } from "./providers/countriesProvider";
import { BreedProvider } from "./providers/breedsProvider";
import { AuthProvider } from "./providers/authProvider";
import UserPage from "./pages/UserPage/UserPage";
import ProtectedRoute from "../src/assets/components/ProtectedRoute.jsx";
import { DogsProvider } from "./providers/dogsProvider.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import UserAuth from "./middlewares/UserAuth.jsx";
import { UtilsProvider } from "./providers/utilsProvider.jsx";
import ComplaintPage from "./pages/ComplaintPage/ComplaintPage.jsx";
import FeedBackPage from "./pages/FeedBackPage/FeedBackPage.jsx";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <UtilsProvider>
          <DogsProvider>
            <BreedProvider>
              <CountryProvider>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                      <Route index element={<HomePage />} />
                      <Route path="latest-news" element={<NewsPage />} />
                      <Route path="contact-us" element={<ContactusPage />} />
                      <Route path="register" element={<RegisterPage />} />
                      <Route path="search-a-dog" element={<SearchDogPage />} />
                      <Route path="dogs-list" element={<DogsListPage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="complaint" element={<ComplaintPage />} />
                      <Route path="feedback" element={<FeedBackPage />} />
                      <Route path="privacy" element={<PrivacyPage />} />
                      {/* rotta protetta  */}
                      <Route element={<UserAuth />}>
                        <Route path="add-new-dog" element={<AddDogPage />} />
                        <Route
                          path=":id/update-dog"
                          element={<UpdateDogPage />}
                        />
                        <Route path="test-mating" element={<Testmating />} />
                      </Route>
                      <Route
                        path="userDetail"
                        element={
                          <ProtectedRoute>
                            <UserPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="dogDetail/:id" element={<DogDetailPage />} />
                      <Route
                        path="newsDetail/:id"
                        element={<NewsDetailPage />}
                      />
                      <Route
                        path="breedsDetail/:breedSlug"
                        element={<BreedsDetailPage />}
                      />
                      <Route
                        path="countryDetail/:countrySlug"
                        element={<CountryDetailPage />}
                      />

                      {/* Not Found Route */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </AuthProvider>
              </CountryProvider>
            </BreedProvider>
          </DogsProvider>
        </UtilsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
