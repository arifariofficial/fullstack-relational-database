CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Ariful Islam', 'www.ariful.org', 'Relational databases rule the world');
insert into blogs (author, url, title, likes) values ('Juuso Rantanen', 'www.juuso.org', 'MongoDB is webscale', 3);

