import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./Moduals/Users/Components/UsersList/UsersList";
import CategoriesList from "./Moduals/Categories/Components/Categorielist/Categorielist";
import RecipesList from "./Moduals/Recipes/Components/Recipelist/Recipelist";
import Login from "./Moduals/Authentication/Components/Login/Login";
import ForgetPass from "./Moduals/Authentication/Components/ForgetPass/ForgetPass";
import ResetPass from "./Moduals/Authentication/Components/RestePass/RestePass";
import Registration from "./Moduals/Authentication/Components/Registration/Registration";
import NotFound from "./Moduals/Shared/Components/NotFound/NotFound";
import AuthLayout from "./Moduals/Shared/Components/AuthLayout/AuthLayout";
import MasterLayout from "./Moduals/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./Moduals/dashboard/Components/Dashboard/Dashboard";
import Recipedata from "./Moduals/Recipes/Components/Recipedata/Recipedata";
import Categoriedata from "./Moduals/Categories/Components/Categoriedata/Categoriedata";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./Moduals/Shared/Components/ProtectedRoute/ProtectedRoute";
import Recipesform from "./Moduals/Recipes/Components/Recipesform/Recipesform";
import VerifyUser from "./Moduals/Authentication/Components/verifyUser/verifyUser";

function App() {
  //*************control admin data state***********
  const [loginData, setloginData] = useState(null);

  //**************save admin data *********************
  let saveAdminData = () => {
    let decodedToken = localStorage.getItem("adminToken");
    let encodedToken = jwtDecode(decodedToken);
    setloginData(encodedToken);
  };
  // to handle click refresh in browser 3shan myzharsh null
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveAdminData();
    }
  }, []);

  // Routing
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "register", element: <Registration /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: 'verifyuser', element: <VerifyUser/> },

      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: "recipes", element: <RecipesList loginData={loginData} /> },
        { path: "recipes/new-recipe", element: <Recipesform /> }, 
        {path: "recipes/:recipeId",element: <Recipesform />},
        { path: "recipe-data", element: <Recipedata /> },
        { path: "Categories", element: <CategoriesList /> },
        { path: "Category-data", element: <Categoriedata /> },
        { path: "users", element: <UsersList /> },
      ],
    }
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
// <Link to={`/recipes/${recipe?.id}`}></Link>