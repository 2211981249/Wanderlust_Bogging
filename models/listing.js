const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // type:[],
    // // //unplash image link
    // default:"https://unsplash.com/photos/a-person-using-a-laptop-computer-on-a-table-AoDMssi2UOU",
    // set:(v)=>v===""?
    // "https://unsplash.com/photos/a-person-using-a-laptop-computer-on-a-table-AoDMssi2UOU"
    // :v,

    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  category:{
    type:String,
    enum:["mountain","arctic","farms","deserts"]
  }
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
