import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NoPageFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import SuccessPage from './pages/SuccessPage/SuccessPage'
import AllInvoice from './pages/AllInvoicePage/AllInvoice'
import ProductPage from "./pages/ProductPage/ProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/allInvoice" element={<AllInvoice />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
