-- Criação de movies:
INSERT INTO movies(name, category, duration, price) VALUES('Divertidamente', 'Animação', 120, 35);
INSERT INTO movies(name, category, duration, price) VALUES('Matrix', 'Ficção', 220, 40);
-- Listagem de movies:
SELECT * FROM movies;

-- Listagem de movies por categoria:
SELECT category FROM products;

-- Listagem de um movie filtrando pelo id:
 SELECT * FROM movies WHERE id= $1;

--  Update de um movie através do id:
UPDATE FROM movies WHERE id= $1;

-- Deleção de um movie através do id:
DELETE FROM movies WHERE id= $1;