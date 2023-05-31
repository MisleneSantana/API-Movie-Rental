import express, { Application } from "express";
import {
  deleteMovie,
  insertQueryCreateMovie,
  selectQueryReadAllMovies,
  selectQueryReadMovieById,
  updateMovie,
} from "./logic";
import { startDatabase } from "./database";
import { idAlreadyExistsMiddleware, nameAlreadyExistsMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

// Endpoints da app:
app.post("/movies", nameAlreadyExistsMiddleware, insertQueryCreateMovie);

app.get("/movies", selectQueryReadAllMovies);

app.get("/movies/:id", idAlreadyExistsMiddleware, selectQueryReadMovieById);

app.patch("/movies/:id", nameAlreadyExistsMiddleware, idAlreadyExistsMiddleware, updateMovie);

app.delete("/movies/:id", idAlreadyExistsMiddleware, deleteMovie);

// Server e conectando ao banco de dados:
const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMsg);
});
