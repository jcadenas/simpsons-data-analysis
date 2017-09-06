# Julian Cadenas
## The Simpsons | by the numbers

[thesimpsonsbtn][simpsonsbtn]

Take a look through the data of the Simpsons and explore your favorite characters!

thesimpsonsbtn is a data visualization web application built using D3, React/Redux, and Ruby on Rails.

[simpsonsbtn]: http://www.thesimpsonsbtn.com/#/
[kaggle]: https://www.kaggle.com/wcukierski/the-simpsons-by-the-data
[todd]: http://toddwschneider.com/posts/the-simpsons-by-the-data/
[dafoe]: http://thomasdafoestudio.blogspot.com/2016/05/the-simpsons-characters-png-pack.html

## Instructions

thesimpsonsbtn is an interactive data visualization that allows you to explore data from the first 26 Seasons of The Simpsons.  The data includes characters, locations, episodes (complete with IMDB rating), and (here's the kicker) every script line ever spoken.  Enjoy exploring the series as a whole and your favorite characters!

### Series Overview

![SeriesOverview](https://giphy.com/embed/3ohhwC9NtyV7JaTEwo.gif)
Format: ![Alt Text](url)

On entering the site, you will land on the Series Overview.  Here, you can check out different data views that aggregate metrics from the first 26 seasons.

### Schema

The data source comes from a kaggle post by user @wcukierski ([kaggle][kaggle])

There are 4 tables available as a csv from the kaggle post:
- characters
- locations
- episodes
- script lines

A good amount of cleaning is required to ingest these into active record. I did a few runs to remove unnecessary commas and quotations, as well as remove excess columns.

It's a postgres database - Once the seed data is good to go seeding in total can take around 30 minutes.  The script lines table is a doozy (and very awesome)

### Coming Soon

More interesting views are in the works :)

### Shout Outs

The project found inspiration from a post by Todd W. Schneider ([Simpsons by the data][todd]) - Awesome stuff and it's been fun to expand upon the idea!

Additionally, thanks to thomasdafoestudio.blogspot.com ([blog][dafoe]) for the assets.

#### Disclaimer

I don't know how to write disclaimers, but here it goes.  Just a heads up, I do not own The Simpsons or these assets nor am I affiliated with 20th Century Fox in any capacity.  This is just for fun :)  The ideas and stuff are my own.

Did I disclaim? I hope that disclaimed.
