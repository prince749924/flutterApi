const express = require("express");
const { verify } = require("jsonwebtoken");
const { updateUser, deleteUser, getUser, getUsers } = require("../controller/usercontroller");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken")
const router = express.Router();

//update
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;