import { Notes } from "../models/notes.mo";
import { asyncHandler } from "../utils/asyncHandler.ut";
import { ApiError, ApiResponse } from "../utils/helper.ut";

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, synced } = req.body;

  if (!title || !content || !synced) {
    throw new ApiError(400, "Title, Content or Status are Required");
  }

  const notes = await Notes.create({
    title,
    content,
    synced,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes has been created successfully"));
});

const updateNotes = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (!note) {
    throw new ApiError(403, "No Notes found with this id");
  }

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;

  await note.save();
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Notes has been updates successfully"));
});


const getAllNotes = asyncHandler(async(req, res)=>{
    
})
export { createNotes, updateNotes };
