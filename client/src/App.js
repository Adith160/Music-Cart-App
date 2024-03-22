import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NoPageFound/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import SuccessPage from './pages/SuccessPage/SuccessPage'
import AllInvoice from './pages/AllInvoicePage/AllInvoice'
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
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Success" element={<SuccessPage />} />
          <Route path="/AllInvoice" element={<AllInvoice />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
