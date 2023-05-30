import { Request, Response } from "express";

//CREATE MOVIE:
export const createMovie = (request: Request, response: Response): Response => {
  return response.status(201).json();
};

//READ ALL MOVIES:
export const readAllMovies = (request: Request, response: Response): Response => {
  return response.status(200).json();
};

//READ MOVIE BY ID:
export const readMovieById = (request: Request, response: Response): Response => {
  return response.status(200).json();
};

// UPDATE MOVIE:
export const updateMovie = (request: Request, response: Response): Response => {
  return response.status(200).json();
};

// DELETE MOVIE:
export const deleteMovie = (request: Request, response: Response): Response => {
  return response.status(204).json({ success: true });
};
