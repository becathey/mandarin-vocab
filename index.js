const restify = require("restify");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/keys");

const server = restify.createServer();

// const corsOptions = {
//   origin: "http://96.231.216.97:8080",
//   optionsSuccessStatus: 200,
// };

server.use(restify.plugins.bodyParser());
// server.use(cors({ origin: "http://96.231.216.97:8080" }));
// server.use(cors());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://96.231.216.97:8080");
  //   res.header("Access-Control-Allow-Credentials", true);
  //   res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  require("./routes/words")(server);
  require("./routes/users")(server);
  console.log(`Server started on port ${config.PORT}`);
});
