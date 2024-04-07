import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProvideUser } from "./context/ProvideUser";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AddBlogs from "./Components/AddBlogs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import Provider from "./context/Provider";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      username: "samir",
      password: "password",
    },
  ]);
  /* const changeStatus = (logged) => {
    setIsLoggedIn(logged);
  };*/

  return (
    <>
      <MantineProvider>
        <Provider>
          <ProvideUser>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />

                <Route path="/new" element={<AddBlogs />} />
              </Route>
            </Routes>
          </ProvideUser>
        </Provider>
      </MantineProvider>
      <Footer />
    </>
  );
}

export default App;
