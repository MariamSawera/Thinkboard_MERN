
import Note from "../models/Note.js"

export async function getAllNotes(_,res) { 
    try{
        const notes = await Note.find().sort({createdAt:-1});  //find all notes 
        res.status(200).json(notes) //return array of note object
    }catch(error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }                                      
 }

 export async function getNoteById(req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found!"})
        res.status(200).json(note);

    } catch(error){
        console.error("Error in getNoteById controller", error)
        res.status(500).json({message:"Internal Server Error"})


    }
 }

//  Client sends data
//       ↓
// req.body gets data
//       ↓
// Create Note object
//       ↓
// Save to MongoDB
//       ↓
// Send success response

export async function createNote(req, res) { 
    try {
        const {title, content} = req.body;
        const note = new Note ({title, content})
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    }catch(error){
        console.error("Error in createNote controller", error)
        res.status(500).json({message:"Internal Server Error"})

    }                             

}

 export async function updateNote (req, res) {
    try{

        const {title,content}=req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updatedNote)
    } catch(error){
        console.error("Error in updatedNote controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteNote(req, res) {
    try{
    const {title,content}=req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json({message: "Note deleted sucessfully!"});

    
    }catch(error){
        console.error("Error in deletedNote controller", error)
        res.status(500).json({message:"Internal Server Error"})

    }
}

 //use router instead of app and / no need to write api/notes bcz its prefixed in server.js    

//  export const getAllNotes = (req,res) => {                                          
//     res.status(200).send("fetched notes");
//  }

// export const createNote = (req, res) => {                               
//     res.status(201).json({message:"Note created succesfully!"})

// }

//  export const updateNote = (req, res) => {
//     res.status(200).json({message:"Note updated successfully!"})
// }

// export const deleteNote = (req, res) => {
//     res.status(200).json({message:"Note deleted successfully!"})
// }