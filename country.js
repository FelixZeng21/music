function giveMusik() {
    var container = document.getElementById("item-container");
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://accounts.spotify.com/api/token");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
xhr.send("grant_type=client_credentials&client_id=8c7c704432234eaa9483ac47ac1d55a3&client_secret=b972af223a5e436b930fcdaaa7e51ff3");
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status < 300) {
        var accessToken = JSON.parse(xhr.responseText);
        console.log(accessToken.access_token);
        //getArtist(accessToken.access_token);
        getRec(accessToken.access_token, container);
        //getGenres(accessToken.access_token);
    }
};
}

function getArtist(accessToken) {
// artist ID: 5069JTmv5ZDyPeZaCCXiCg
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.spotify.com/v1/artists/3LZZPxNDGDFVSIPqf4JuEf?si=s1ws1v6JTG61T72aliwlRw")
xhr.setRequestHeader("Authorization", "Bearer " + accessToken)
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status < 300) {
        var artist = JSON.parse(xhr.responseText);
        console.log(artist)
    }
}
}

function getRec(accessToken, container) {
    var xhr = new XMLHttpRequest();
    var genres = ["country"];
    var limit = 30;
    var genreString = "https://api.spotify.com/v1/recommendations?seed_genres=";
    for (var i=0; i < genres.length; i++) {
        genreString += genres[i] + "%2C";
    }
    genreString += "&limit=" + limit;
    xhr.open("GET", genreString);
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status < 300) {
            var rec = JSON.parse(xhr.responseText);
            console.log(rec);
            console.log(rec.tracks[0].album.name);
            var name = rec.tracks[0].album.name;

            var newHTML = "";
            for (var i=0; i<30; i++){
            var name = rec.tracks[i].album.name;
            newHTML += `<h1>${name}</h1>`;
            }
            container.innerHTML += newHTML;
        }    
};
xhr.send();
}

function getGenres(accessToken) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.spotify.com/v1/recommendations/available-genre-seeds")
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status < 300) {
            var rec = JSON.parse(xhr.responseText);
            console.log(genres);
        }    
};
xhr.send();
}