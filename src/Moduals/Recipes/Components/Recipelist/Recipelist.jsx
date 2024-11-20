/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nodata from "../../../../assets/No-Data.png";
import DeleteConfirmations from "../../../Shared/Components/DeleteConfirmations/DeleteConfirmations";
import NoData from "../../../Shared/Components/NoData/NoData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Recipelist() {
  const [recipesList, setRecipesList] = useState([]);

  const [selectedId, setSelectedId] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getRecipes = async () => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error("Error fetching recipes");
    }
  };

  const deleteRecipe = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Recipe deleted successfully");
      getRecipes();
    } catch (error) {
      toast.error("Failed to delete Recipe");
    }
    handleClose();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Header
        title={"Recipes List"}
        decsription={
          "You can now add your items that any user can order from the Application and you can edit."
        }
      />
      <DeleteConfirmations
        show={show}
        handleClose={handleClose}
        deleteItem={"Recipe"}
        deleteFuncation={deleteRecipe}
      />
      <div className="d-flex justify-content-between p-4">
        <h5>Recipes Table Details</h5>
        <Link to="/dashboard/recipes/new-recipe" className="btn btn-success">
          Add new Recipe
        </Link>
      </div>
      <div className="table-responsive p-4">
        {recipesList.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="px-3">{recipe.name}</td>
                  <td className="px-3">
                    {recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        alt={recipe.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={Nodata}
                        alt={recipe.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td className="px-3">{recipe.price}</td>
                  <td className="px-3">{recipe.description}</td>
                  <td className="px-3">
                    {recipe.category[0]?.name || "No Category"}
                  </td>
                  <td className="px-3">
                    <i
                      className="fa fa-trash mx-2 text-danger"
                      onClick={() => handleShow(recipe.id)}
                      aria-hidden="true"
                    ></i>
                    <Link to={`/dashboard/recipes/${recipe?.id}`}>
                      <i
                        className="fa fa-edit mx-2 text-warning"
                        aria-label="Edit Recipe"
                      ></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
      <ToastContainer />
    </>
  );
}
