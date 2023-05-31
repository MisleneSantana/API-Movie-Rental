import { NextFunction, Request, Response } from "express";
import { IMovie, TMovieResult } from "./interfaces";
import { client } from "./database";
import { QueryConfig } from "pg";

export const nameAlreadyExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = request.body;

  const queryTemplate: string = `SELECT * FROM "movies" WHERE name = $1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [name],
  };

  const queryResult: TMovieResult = await client.query(queryConfig);

  const foundMovieByName: IMovie = queryResult.rows[0];

  if (foundMovieByName) {
    const error: string = "Movie name already exists!";
    return response.status(409).json({ error });
  }

  response.locals = { ...response.locals, foundMovieByName };
  return next();
};

export const idAlreadyExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;

  const queryTemplate: string = `SELECT * FROM "movies" WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [id],
  };

  const queryResult: TMovieResult = await client.query(queryConfig);

  const foundMovieById: IMovie = queryResult.rows[0];

  if (!foundMovieById) {
    const error: string = "Movie not found!";
    return response.status(404).json({ error });
  }

  response.locals = { ...response.locals, foundMovieById };
  return next();
};
