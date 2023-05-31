import { Request, Response } from 'express';
import { IMovie, TMovieCreate, TMovieResult } from './interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from './database';
import format from 'pg-format';

//CREATE MOVIE:
export const insertQueryCreateMovie = async (request: Request, response: Response): Promise<Response> => {
  // const { foundMovieByName } = response.locals;
  const requestBody: TMovieCreate = request.body;

  const queryFormat: string = format(
    'INSERT INTO movies (%I) VALUES (%L) RETURNING *;',
    Object.keys(requestBody),
    Object.values(requestBody)
  );

  const queryResult: TMovieResult = await client.query(queryFormat);
  const newMovie: IMovie = queryResult.rows[0];

  return response.status(201).json(newMovie);
};

//READ ALL MOVIES:
export const selectQueryReadAllMovies = async (request: Request, response: Response): Promise<Response> => {
  const { category } = request.query;

  if (category === 'Animação') {
    const queryTemplate: string = `
    SELECT * FROM movies WHERE category = $1;
`;

    const queryConfig: QueryConfig = {
      text: queryTemplate,
      values: [category],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rowCount > 0) {
      const moviesByCategory: IMovie[] = queryResult.rows;

      return response.status(200).json(moviesByCategory);
    }
  }

  const queryString: string = `
   SELECT * FROM "movies" ORDER BY id;
  `;

  const queryResult: TMovieResult = await client.query(queryString);
  const allMovies: IMovie[] = queryResult.rows;

  return response.status(200).json(allMovies);
};

//READ MOVIE BY ID:
export const selectQueryReadMovieById = async (request: Request, response: Response): Promise<Response> => {
  const { foundMovieById } = response.locals;

  return response.status(200).json(foundMovieById);
};

// UPDATE MOVIE:
export const updateMovie = async (request: Request, response: Response): Promise<Response> => {
  const { foundMovieByName, foundMovieById } = response.locals;
  const { body, params } = request;

  const updateColumns: string[] = Object.keys(body);
  const updateValues: string[] = Object.values(body);

  const queryTemplate: string = ` 
  UPDATE "movies" 
  SET (%I) = ROW (%L) 
  WHERE id = $1
  RETURNING *;
  `;

  const queryFormat: string = format(queryTemplate, updateColumns, updateValues);
  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [params.id],
  };
  const queryResult: TMovieResult = await client.query(queryConfig);
  const updatedMovie: IMovie = queryResult.rows[0];

  return response.status(200).json(updatedMovie);
};

// DELETE MOVIE:
export const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  const { foundMovieById } = response.locals;
  const { body, params } = request;

  const deleteColumns: string[] = Object.keys(body);
  const deleteValues: string[] = Object.values(body);

  const queryTemplate: string = ` 
  DELETE FROM "movies" 
  WHERE id = $1
  RETURNING *;
  `;

  const queryFormat: string = format(queryTemplate, deleteColumns, deleteValues);
  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [params.id],
  };
  const queryResult: TMovieResult = await client.query(queryConfig);
  const deleteMovie: IMovie = queryResult.rows[0];

  return response.status(204).json();
};
