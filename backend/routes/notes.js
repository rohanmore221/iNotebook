const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const { body, validationResult, param } = require("express-validator");
const Notes = require("../models/Notes");

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE : Update a existing Note using: PUT "/api/auth/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    
 //create a new note
  const newnote = {};

  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  let note= await Notes.findById(req.params.id)
  
  if(!note)
  {
    return res.status(404).send("not found")
  }

   if(note.user.toString()!==req.user.id){
    return res.status(404).send("unathuorized access")
   }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(note)
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
});



// ROUTE : Delete an existing Note using: PUT "/api/auth/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

try {
  
 
  let note= await Notes.findById(req.params.id)
  
  if(!note)
  {
    return res.status(404).send("not found")
  }

   if(note.user.toString()!==req.user.id){
    return res.status(404).send("unathuorized access")
   }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Sucess":"Notes has been deleted",note:note})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  //
});
module.exports = router;
