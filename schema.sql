DROP TABLE IF EXISTS booktable;
CREATE TABLE booktable  (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  type VARCHAR(255)
);
INSERT INTO booktable (title, author, image_url, description, type)
VALUES('food','Sam','image','i love food','5554');