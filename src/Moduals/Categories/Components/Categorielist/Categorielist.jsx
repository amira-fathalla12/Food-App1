/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../Shared/Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmations from "../../../Shared/Components/DeleteConfirmations/DeleteConfirmations";
import NoData from "../../../Shared/Components/NoData/NoData";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import useCategories from "../HooksCategories/useCategories";

export default function Categorielist() {
  const CategoriesQuery = useCategories();
  console.log(CategoriesQuery);
  const {
    register,
    handleSubmit,
    setValue, // استيراد setValue لتحديث قيمة الحقل
    formState: { errors },
  } = useForm();

  const [Categorieslist] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // handel close
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseAdd = () => setShowAdd(false);

  // show handel
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  // update
  const handleShowUpdate = (id) => {
    const selectedCategory = Categorieslist.find((cat) => cat.id === id);
    setSelectedId(id);

    // تعيين القيمة باستخدام setValue
    setValue("name", selectedCategory?.name || ""); 
    setShowUpdate(true);
  };

  const handleShowAdd = () => setShowAdd(true);

  // get categories list
  

  // Add category
  const onSubmit = async (data) => {
    try {
      await axios.post(`https://upskilling-egypt.com:3006/api/v1/Category/`, data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Category added successfully");
      CategoriesQuery.trigger();
      handleCloseAdd();
    } catch (error) {
      toast.error("Error adding category");
    }
  };

  // update category
  const updateCategory = async (data) => {
    try {
      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
        { name: data.name },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Category updated successfully");
      CategoriesQuery.trigger();
      handleCloseUpdate();
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  // delete category
  const deleteCategory = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Category deleted successfully");
      CategoriesQuery.trigger();
    } catch (error) {
      toast.error("Failed to delete Category");
    }
    handleClose();
  };

  
  return (
    <>
      <Header
        title={"Categories Item"}
        decsription={
          "You can now add your items that any user can order from the Application and you can edit."
        }
      />
      <DeleteConfirmations
        show={show}
        handleClose={handleClose}
        deleteItem={"Category"}
        deleteFuncation={deleteCategory}
      />

      {/* Modal update */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateCategory)}>
            <div className="input-group mb-3 p-1">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Category Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            <button className="btn btn-warning w-100 my-2 mt-5">Update</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal add */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3 p-1">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Category Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            <button className="btn btn-success w-100 my-2 mt-5">Save</button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-between p-4">
        <h5>Categories Table Details</h5>
        <button className="btn btn-success" onClick={handleShowAdd}>
          Add new Category
        </button>
      </div>
      <div className="table-responsive p-4">
        {CategoriesQuery?.Categories?.data?.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {CategoriesQuery?.Categories?.data?.map((category) => (
                <tr key={category.id}>
                  <td className="px-3">{category.name}</td>
                  <td className="px-3">{category.creationDate}</td>
                  <td className="px-3">
                    <i
                      className="fa fa-trash mx-2 text-danger"
                      onClick={() => handleShow(category.id)}
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-edit mx-2 text-warning"
                      onClick={() => handleShowUpdate(category.id)}
                      aria-hidden="true"
                    ></i>
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
