const Listing=require("./models/listing");
const Review=require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
module.exports.isLoggedin=(req,res,next)=>{
  // console.log(req.path +".."+req.originalUrl);
    if(!req.isAuthenticated()){
        //redirectUrl
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You are must be logged in to created listing!");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRediretUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;

  let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listings ");
      return  res.redirect(`/listings/${id}`)
    }
    next();
}



//validate listings
module.exports. validateListings = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};


module.exports.isReviewAuthor=async(req,res,next)=>{
  let {id,reviewId}=req.params;

  let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You didn't create this review ");
      return  res.redirect(`/listings/${id}`)
    }
    next();
}