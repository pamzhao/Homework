-- Create the database
create database movies_db;

use movies_db;

create table grosses (
	rank int primary key,
    title varchar(255),
    studio varchar(255),
    worldwide double,
    domestic double,
    dom_pct double,
    overseas double,
    os_pct double);
    
create table movies (
	id int primary key auto_increment,
    title varchar(255),
    rank int,
    rating varchar(50),
    imdbscore double,
    directors varchar(255));