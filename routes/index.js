const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Article routes
router.use("/userRoutes", userRoutes);

module.exports = router;