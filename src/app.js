const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/config");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("../modules/user");
require("../services/passport");

mongoose.connect(keys.mongoKey);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("../routes/authRoutes")(app);
const port = 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${port}`);
});
