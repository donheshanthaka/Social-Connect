import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/Pages/HomePage";
import LoginPage from "scenes/Pages/LoginPage";
import ProfilePage from "scenes/Pages/ProfilePage";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;