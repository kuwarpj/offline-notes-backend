import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import notesRouter from "./routes/notes.rt.js"
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);



app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/note", notesRouter);


app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const response = {
    success: err.success,
    message: err.message || "Internal Server Error",
    ...(err.data && { data: err.data }),
    ...(Array.isArray(err.errors) && err.errors.length > 0 && { errors: err.errors }),
  };

  res.status(statusCode).json(response);
});

export default app;
