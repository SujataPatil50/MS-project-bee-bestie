const express = require("express");
const Routes = express.Router();

const {
  addResources,
  updateResources,
  getResourcesById,
  deleteResourcesById,
  resourcesListing,
  typeWiseResourcesListing,
  addEditImage,
} = require("../controllers/ResourcesController");

Routes.post("/add-resources", addResources);
Routes.put("/edit-resources", updateResources);
Routes.get("/get-resources", getResourcesById);
Routes.delete("/delete-resources", deleteResourcesById);
Routes.get("/list-resources", resourcesListing);
Routes.get("/title-wise-list", typeWiseResourcesListing);
Routes.post("/add-image", addEditImage);

module.exports = Routes;
