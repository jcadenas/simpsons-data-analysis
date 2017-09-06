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

![Alt Text](https://media.giphy.com/media/l378jVfwhXhDjZIWs/giphy.gif)

On entering the site, you will land on the Series Overview.  Here, you can check out different data views that aggregate metrics from the first 26 seasons.

### Character Overview

![Alt Text](https://media.giphy.com/media/3ov9jTiY0t5RCdXxTO/giphy.gif)

Across the top, you'll find the character navigation carousel. Scroll through or use the navigation arrows on the sides to find your favorite character. Selecting a character will display the Character Overview.

Each Character Overview is complete with a character image, a random script line from the character, as well as a series of data views that rerender for each character.

Under each character image, you will find a character script line. This is a random script line of the character from every script line from the first 26 seasons. Select the refresh icon to generate a new random script line.

## How to run

### Steps to Setup

This is a Ruby on Rails app with React / Redux, using D3 for the DOM manipulation for the visualizations

1. Install Dependencies
    1. Install gem dependencies by running `bundle install`
    2. Install npm dependencies by running `npm install` -- npm will webpack post installing.
2. Setup database
    1.  Uses a postgres database
    2.  Setup the database by running `bundle exec rake db:setup`
        The seed data is available in csv files. Seeding the database can take upwards of 35 minutes due to the large script lines csv (turns out, a lot has been said over 26 seasons and 6,722 characters)
3. Start server
    1. Start server by running `bundle exec rails server`

## Implementation
### Tech Stack
* Postgres database
* Ruby on Rails
* D3
* React
* Redux
* HTML / CSS


### Schema & Database Seeding

The data source comes from a kaggle post by user @wcukierski ([kaggle][kaggle])

There are 4 tables available as a csv from the kaggle post:
- characters
- locations
- episodes
- script lines

A good amount of cleaning is required to ingest these into active record. I did a few runs to remove unnecessary commas and quotations, as well as remove excess columns.

It's a postgres database - Once the seed data is good to go seeding in total can take around 35 minutes.  The script lines table is a doozy (and very awesome)

### Data Visualization Components

Currently, each type of chart is it's own React component.  The charts are broken out by Overview charts & Character charts.

The character charts adhere to D3's enter, update, exit cycle when navigating between characters in order to have DRY reusable components.

### Routes

Currently, each chart has a custom route where SQL is executed on the backend.  In the future, I would like to make more generic routes and potentially handle the building of the charts within each component. We shall see...

## Coming Soon

* Additional interesting views are in the works focusing around character correlations with IMDB rating

## Shout Outs

The project found inspiration from a post by Todd W. Schneider ([Simpsons by the data][todd]) - Awesome stuff and it's been fun to expand upon the idea!

Additionally, thanks to thomasdafoestudio.blogspot.com ([blog][dafoe]) for the assets.

## Disclaimer

I don't know how to write disclaimers, but here it goes.  Just a heads up, I do not own The Simpsons or these assets nor am I affiliated with 20th Century Fox in any capacity.  This is just for fun :)  The ideas and stuff are my own.

Did I disclaim? I hope that disclaimed.
