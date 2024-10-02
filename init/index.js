// const mongoose=require("mongoose");
// const initData=require("./data");
// const Listing =require("../models/listing");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

// main().then(()=>{
//     console.log('Connect to DB');

// }).catch(err=>{
//     console.log(err);
// })

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// const initDB=async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("Data is initialized");
// }

// initDB();

if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

// MongoDB connection string
const MONGO_URL =process.env.MONGO_URI;

// Connect to the MongoDB database
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Handle the connection and error logging
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Initialize the database with sample data
const initDB = async () => {
  await Listing.deleteMany({}); // Clear existing data
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66c39d8381f4cce79f3a892e",
  }));
  await Listing.insertMany(initData.data); // Insert sample data
  console.log("Data is initialized");
};

initDB(); // Run the database initialization
