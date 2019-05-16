use movies_db;

select * from movies;

select * from grosses;

-- Create a view for combie data
create view movies_info as
select g.rank, g.title, m.rating, m.imdbscore, m.directors, g.worldwide, g.domestic, g.dom_pct, g.overseas, g.os_pct
from movies m
inner join grosses g
on m.rank = g.rank;

-- No data in OMDB API
select g.rank, g.title
from grosses g
left outer join movies m
on g.rank = m.rank
where m.rank is null

select * from movies_info;
