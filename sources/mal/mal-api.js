// MAL library (1.0)

app.classes.api.mal = class {
    
    constructor() {
        this.api_key = "X-MAL-CLIENT-ID";
        this.mangaClass = app.classes.api.mal.manga;
    }

    searchManga(query) {
        let queryText = "";
        if(query.isText()) {
            queryText = query.value;
        }

        let url = "https://api.myanimelist.net/v2/manga?";
        url += "api_key=" + this.api_key;
        url += "&query=" + encodeURIComponent(queryText);

        let request = app.request(url);
        let response = request.send();
        let data = response.json();
        
        let searchResults = [];

        if(data?.results != undefined) {
            for(let result of data.results) {
                let manga = new app.classes.api.mal.mangaResult(result);

                let searchResult = app.searchResult.new();
            
                searchResult.title = manga.title;
                searchResult.subtitle = manga.authors{first_name,last_name};
                searchResult.imageURL = manga.main_picture;
            
                searchResult.params = {
                    id: manga.id
                };
                
                searchResults.push(searchResult);
            }
        }

        return searchResults;
    }

    getManga(id) {
        let url = "https://api.myanimelist.net/v2/manga/" + id + "?";
        url += "api_key=" + this.api_key;

        let request = app.request(url);
        let response = request.send();

        if(response.statusCode == 200) {
            let data = response.json();
            if(data != undefined) {
                return new this.mangaClass(data);
            }
        }

        return undefined;
    }
}

app.classes.api.mal.mangaResult = class {
    constructor(data) {
        this.data = data;
    }

    get id() {
        return this.data.id;
    }

    get title() {
        return this.data.title;
    }

    get releaseDate() {
        let date = new Date(this.data.start_date);
        if(app.date.isValid(date)) {
            return date;
        }
        return undefined;
    }

    get year() {
        let releaseDate = this.releaseDate;
        if(releaseDate != undefined) {
            return releaseDate.getFullYear();
        }
        return undefined;
    }

    get thumbnail() {
        let main_picture = this.data.main_picture;
        if(main_picture != undefined) {
            return "https://myanimelist.cdn-dena.com/images/manga/1/" + id + ".jpg";
        }
        return undefined;
    }
}

app.classes.api.mal.manga = class {
    constructor(data) {
        this.data = data;
    }

    get id() {
        return this.data.id;
    }

    get title() {
        return this.data.title;
    }

    get synopsis() {
        return this.data.synopsis;
    }

    get releaseDate() {
        let date = new Date(this.data.start_date);
        if(app.date.isValid(date)) {
            return date;
        }
        return undefined;
    }

    pictureURL(size = "medium") {
        let main_picture = this.data.main_picture;
        if(main_picture != undefined) {
            return "https://myanimelist.cdn-dena.com/images/manga/1/" + id + ".jpg";
        }
        return undefined;
    }
}

app.api.mal = new app.classes.api.mal();
