const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  //populate method  help to find the details of reviews.

  const listings = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing you have requested does not exits!");
    res.redirect("/listings");
  }
  //console.log(listings);
  res.render("./listings/show.ejs", { listings });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query:req.body.listing.location,
      limit: 1,
    })
    .send();

    //console.log(response.body.features[0].geometry);

    //res.send("done");

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry=response.body.features[0].geometry;

  let savedListing = await newListing.save();

  console.log(savedListing);

  req.flash("sucess", "New listing created!");
  res.redirect("/listings");
};

module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  if (!listings) {
    req.flash("error", "Listing you have requested does not exits!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listings });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("sucess", " Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedId = await Listing.findByIdAndDelete(id);
  console.log(deletedId);
  req.flash("sucess", " Listing deleted!");
  res.redirect("/listings");
};
