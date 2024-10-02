const express = require("express");

//mergeParams is the value that merge the :id parent with child

const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const { isLoggedin ,isReviewAuthor} = require("../middleware.js");
const reviewController=require("../controllers/review.js");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Reviews -> post route

router.post(
  "/",
 isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview));


//Delete review id

router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview));

module.exports = router;
