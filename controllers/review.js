const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`);
  };


  module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;

    //It delete the review array and update with the help of pull request
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess", "Review created!");
    res.redirect(`/listings/${id}`);
  };