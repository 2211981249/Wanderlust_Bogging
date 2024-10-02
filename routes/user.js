const express = require("express");

//mergeParams is the value that merge the :id parent with child

const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const  passport  = require("passport");
const flash=require("connect-flash");
const {saveRediretUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");

router.get("/signup", userController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",saveRediretUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 userController.login);


router.get("/logout",userController.logout)

module.exports = router;
