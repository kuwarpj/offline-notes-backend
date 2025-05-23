import { Notes } from "../models/notes.mo.js";
import { asyncHandler } from "../utils/asyncHandler.ut.js";
import { ApiError, ApiResponse } from "../utils/helper.ut.js";

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

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find().sort({ updatedAt: -1 }); // Sort by last updated
  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes has been fetched successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Notes.findById(id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  await note.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Notes has been deleted successfully"));
});
export { createNotes, updateNotes, getAllNotes, deleteNote };
