const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var Teacher = require("../models/teacher");


exports.create_teacher = (req, res, next) => {
  const teacher = new Teacher({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    degree: req.body.degree,
    field: req.body.field,
    cost: req.body.cost,
    subjects: req.body.subjects
  });
  teacher
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created teacher successfully",
        createdTeacher: {
          name: result.name,
          email: result.email,
          degree: result.degree,
          field: result.field,
          cost: result.cost,
          subjects: result.subjects,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3002/teacher/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

//get all teachers
exports.get_all = (req, res, next) => {
  Teacher.find()
    .select()
    .exec()
    .then( docs=>{
          const response = {
            count: docs.length,
            teachers: docs.map(doc => {
              return {
                name: doc.name,
                email: doc.email,
                degree: doc.degree,
                field: doc.field,
                cost: doc.cost,
                subjects: doc.subjects,
                _id: doc._id,
                request: {
                  type: "GET",
                  url: "http://localhost:3002/teacher/" + doc._id
                }
              };
            })
          };
      //   if (docs.length >= 0) {
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_teacher = (req, res, next) => {
  const id = req.params.teacherId;
  Teacher.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3002/teacher"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};


exports.teacher_delete = (req, res, next) => {
  const id = req.params.teacherId;
  Teacher.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Teacher deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};