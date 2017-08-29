# The Simpsons | by the numbers

[thesimpsonsbtn][simpsonsbtn]

thesimpsonsbtn is a web application built using Ruby on Rails, D3, and React/Redux.

[simpsonsbtn]: https://www.thesimpsonsbtn.com/#/
[kaggle]: https://www.kaggle.com/wcukierski/the-simpsons-by-the-data
[todd]: http://toddwschneider.com/posts/the-simpsons-by-the-data/
[dafoe]: http://thomasdafoestudio.blogspot.com/2016/05/the-simpsons-characters-png-pack.html

## Schema

The data source comes from a kaggle post by user @wcukierski ([kaggle][kaggle])

There are 4 tables available as a csv from the kaggle post:
- characters
- locations
- episodes
- script lines

A good amount of cleaning is required to ingest these into active record. I did a few runs to remove unnecessary commas and quotations, as well as remove excess columns.

It's a postgres database - Once the seed data is good to go seeding in total can take around 30 minutes.  The script lines table is a doozy (and very awesome)

## Shout Outs

The project found inspiration from a post by Todd W. Schneider ([Simpsons by the data][todd]) - Awesome stuff and excited to expand upon the idea!

Additionally, thanks to thomasdafoestudio.blogspot.com ([blog][dafoe]) for the assets.
