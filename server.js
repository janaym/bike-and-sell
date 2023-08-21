// load .env data into process.env
require("dotenv").config();
const itemsQueries = require("./db/queries/items");
// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const cookieSession = require("cookie-session");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(express.urlencoded({ extended: false }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

const itemRoutes = require("./routes/itemRoutes");
const adminRoutes = require("./routes/adminRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

// /api/items endpoint
app.use("/api/items", itemRoutes);

// /api/users endpoint
app.use("/users", adminRoutes);

app.use("/api/favourites", favouriteRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// search route
app.post("/search", (req, res) => {
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  console.log(req.body);
  itemsQueries
  .filterByPrice(minPrice, maxPrice)
    .then((data) => {
      res.send({ data });
      // res.redirect('/');
    })
    .catch((e) => {
      console.error(e.message);
      res.send(e.message);
    });
});


app.get("/login/:id", (req, res) => {
  const userId = req.params.id;
  req.session.user_id = userId;
  console.log(userId);
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
