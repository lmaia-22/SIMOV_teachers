const express = require("express");
const router = express.Router();

var TeacherController = require('../controllers/teacher');
var checkAuth = require('../middleware/check-auth');

//create a new teacher
router.post("/", TeacherController.create_teacher);

//get all teachers
router.get("/", TeacherController.get_all);

//get a teacher
router.get("/:teacherId", TeacherController.get_teacher);

//delete a teacher
router.delete("/:teacherId", TeacherController.teacher_delete);


module.exports = router;