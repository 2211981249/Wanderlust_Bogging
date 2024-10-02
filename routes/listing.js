const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

const { isLoggedin, isOwner, validateListings } = require("../middleware.js");
const listingController = require("../controllers/listing.js");


router.route("/")
.get( wrapAsync(listingController.index))
.post(
  isLoggedin,
  // validateListings,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
);



//new route

router.get("/new", isLoggedin, listingController.renderNewForm);




router.route("/:id").get(wrapAsync(listingController.showListing))
.put(
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  validateListings,
  wrapAsync(listingController.updateListing)
).delete(
  isLoggedin,
  isOwner,
  wrapAsync(listingController.destroyListing)
);


// //index route
// router.get("/", wrapAsync(listingController.index));

//new route define the firstly because it search the id so it define the firstly


//Show routes

// router.get("/:id", wrapAsync(listingController.showListing));



//create route
// router.post(
//   "/",
//   validateListings,
//   isLoggedin,
//   wrapAsync(listingController.createListing)
// );



//edit route

router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editForm)
);



//update route
// router.put(
//   "/:id",
//   isLoggedin,
//   isOwner,
//   validateListings,
//   wrapAsync(listingController.updateListing)
// );



//Delete route

// router.delete(
//   "/:id",
//   isLoggedin,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );

module.exports = router;
