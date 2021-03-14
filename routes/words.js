const errors = require("restify-errors");
const rjwt = require("restify-jwt-community");
const Word = require("../models/Word");
const config = require("../config/keys");

module.exports = (server) => {
  server.get("/words", async (req, res, next) => {
    response.set("Access-Control-Allow-Origin", "*");
    try {
      const words = await Word.find({});
      res.send(words);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get("/words/:id", async (req, res, next) => {
    try {
      const word = await Word.findById(req.params.id);
      res.send(word);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no word with id of ${req.params.id}`
        )
      );
    }
  });

  server.post(
    "/words",
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      if (!req.is("application/json")) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }
      const { mandarin, pinyin, english, wordId } = req.body;
      const word = new Word({
        mandarin,
        pinyin,
        english,
        wordId,
      });
      try {
        const newWord = await word.save();
        res.send(201);
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  server.put(
    "/words/:id",
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      if (!req.is("application/json")) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }
      try {
        const word = await Word.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no word with id of ${req.params.id}`
          )
        );
      }
    }
  );

  server.del(
    "/words/:id",
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const word = await Word.findOneAndRemove({ _id: req.params.id });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no word with id of ${req.params.id}`
          )
        );
      }
    }
  );
};
