// MAL movies search (1.0)
// https://github.com/ch4nny/collections-mal

app.api.mal.api_key = "YOUR API KEY";

let results = app.api.mal.searchManga(app.query);
app.result(results);
