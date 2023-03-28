// module.exports = (handler) => {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (ex) {
//       next(ex);
//     }
//   };
// };

// in routes
// const asyncMiddleware = require("../middleware/async");

// router.get(
//   "/",
//   asyncMiddleware(async (req, res) => {
//     const genres = await Genre.find().select("-__v").sort("name");
//     res.send(genres);
//   })
// );

// router.get("/", async (req, res, next) => {
//   try {
//     const genres = await Genre.find().select("-__v").sort("name");
//     res.send(genres);
//   } catch (ex) {
//     next(ex);
//   }
// });
