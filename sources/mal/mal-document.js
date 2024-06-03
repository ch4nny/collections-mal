// MAL manga document (1.0)
// https://github.com/ch4nny/collections-mal

app.api.tmdb.api_key = "YOUR API KEY";

let manga = app.api.mal.getManga(app.params.id);

if(manga == undefined) {
    app.fail();
}

let builder = app.document.builder();

builder.setString(movie.title, "title");
builder.setImage(movie.main_picture(), "cover");
builder.setString(movie.synopsis, "synopsis");
builder.setDate(movie.releaseDate, "release-date");

app.result(builder);
