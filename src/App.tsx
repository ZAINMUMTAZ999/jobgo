import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import HomeLayout from "./Layout/HomeLayout";
import { AppContext } from "./context/AppNotify";
import AddPage from "./pages/AddPage";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import DashBoard from "./components/DashBoard";
const App = () => {
  const { isLogged } = AppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <HomeLayout>
              <Register />
            </HomeLayout>
          }
        />
        <Route
          path="/login"
          element={
            <HomeLayout>
              <Login />
            </HomeLayout>
          }
        />
        <Route
          path="/search"
          element={
            <HomeLayout>
              <Search />
            </HomeLayout>
          }
        />

        {isLogged && (
          <>
            <Route
              path="/addjob"
              element={
                <HomeLayout>
                  <AddPage />
                </HomeLayout>
              }
            />
            <Route
              path="/search"
              element={
                <HomeLayout>
                  <Search />
                </HomeLayout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <HomeLayout>
                  <DashBoard />
                </HomeLayout>
              }
            />
            <Route
              path="/userProfile"
              element={
                <HomeLayout>
                  <UserProfile />
                </HomeLayout>
              }
            />
          </>
        )}
        <Route
          path="*"
          element={
            <HomeLayout>
              <Login />
            </HomeLayout>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
