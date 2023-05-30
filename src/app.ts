import express, { Application } from "express";
import { createMovie, deleteMovie, readAllMovies, readMovieById, updateMovie } from "./logic";

const app: Application = express();
app.use(express.json());

// Endpoints da app:
app.post("/movies", createMovie);

app.get("movies", readAllMovies);

app.get("/movies/:id", readMovieById);

app.patch("/movies/:id", updateMovie);

app.delete("/movies/:id", deleteMovie);

// Server:
const port: number = 3000;
const runningMsg: string = `Server running on http://localhost:${port}`;
app.listen(port, () => console.log(runningMsg));
