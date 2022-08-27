const express = require("express");
const path = require("path");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// connect to DB
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err.message.red));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // graphiql: process.env.NODE_ENV === "development",
    graphiql: true,
  })
);

// static files (build of your frontend)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("/", (_, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));

//     (err) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//     };
//   });
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

// if (process.env.NODE_ENV == "production") {
//   app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "../client", "build")));
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }
