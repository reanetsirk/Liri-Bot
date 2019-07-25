require('dotenv').config();
var axios = require("axios");
var keys = require('./keys.js')
var Spotify = require('node-spotify-api')

// now you can call

var commandTerm = process.argv[2];

// var searchTerm = "";
var searchTerm = process.argv.slice(3).join("+");
// for (var i = 3; i < process.argv.length; i++) {
//     // term = "" + "Lion" + " ";
//     // term = "Lion " + "King" + " ";
//     searchTerm = searchTerm + process.argv[i] + " "
// };
// "Lion King ".trim() === "Lion King"


// command 'spotify-this-song' etc
// searchTerm 'Lion King' etc
RunLiri(commandTerm, searchTerm);

// command replaces whichFunction -> 'spotify-this-song' etc
// searchTerm replaces searchThis -> 'Lion King' etc
function RunLiri(commandFunc, searchFunc) {
    switch (commandTerm) {
        case "spotify-this-song":
             SpotifySong ();
          break;
        case "movie-this":
            OmdbMovie ();
          break;
        case "concert-this":
            GetConcert ();
          break;
        case "do-what-it-says":
            DoWhatItSays ();
          break;
      }
}

//     // 'spotify-this-song === 'spotify-this-song'
//     if (commandFunc === 'spotify-this-song') {
//         //spotifySong('Lion King')
//         SpotifySong(searchFunc)
//     }

//     // 'spotify-this-song' !== 'movie-this' //evaluates to false
//     else if (commandFunc === 'movie-this') {
//         // OmdbMovie('Lion King')
//         OmdbMovie(searchFunc)
//     } 
    
//     else if (commandFunc === 'concert-this'){
//         GetConcert(searchFunc)
//     }
// }

// SpotifySong('Lion King')
function SpotifySong(searchVal) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type:'track', query: searchTerm}, function(error, data){
        if(!error){
            for(var i = 0;i<data.track.items.length;i++){
                var songData= data.track.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");

                fs.appendFile('log.txt', songData.artists[0].name);
                fs.appendFile('log.txt', songData.name);
                fs.appendFile('log.txt', songData.preview_url);
                fs.appendFile('log.txt', songData.album.name);
                fs.appendFile('log.txt', "-----------------------");
              }
            }
            
            if (!songData){
                var data = " ";
                axios.get(data).then(
                    function(response){
                        // console.log("Title of the movie: " + response.data.Title);
                        // console.log("Year the movie came out: " + response.data.Year);
                        // console.log("IMBD rating of the movie: " + response.data.imbdRating);
                        // console.log("Rotten Tomatoes of the movie: " + response.data.Ratings[1].Value);
                        // console.log("Country where movie was produced: " + response.data.Country);
                        // console.log("Language of the movie: " + response.data.Language);
                        // console.log("Plot of the movie: " + response.data.Plot);
                        // console.log("Actors in the movie: " + response.data.Actors);
                    })
            }
            
            else{
              console.log('Error occurred.');
            }
          });
        }

            
        
    
    // .then(function(response){
    //     console.log(response.tracks.items[0])
    //     console.log(response.tracks.items[1])
    //     console.log(response.tracks.items[0])
    //     console.log(response.tracks.items[0])
        
    // })
//     spotify.search({type: 'track', query: searchTerm})
//        .then(function(response){
//         console.log(response);
//        }
// });
    
    // console.log("Spotify song: Lion King")
    console.log("Spotify song: " + searchVal)
    


function OmdbMovie() { 
    if (!searchTerm){
        var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response){
                console.log("Title of the movie: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMBD rating of the movie: " + response.data.imbdRating);
                console.log("Rotten Tomatoes of the movie: " + response.data.Ratings[1].Value);
                console.log("Country where movie was produced: " + response.data.Country);
                console.log("Language of the movie: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
            })
    }
    else {

    
    // console.log("Get OMDB: " + searchVal)
    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response){
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMBD rating of the movie: " + response.data.imbdRating);
            console.log("Rotten Tomatoes of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
        }
    )}
}

function GetConcert(searchVal) {
    var query = "https://rest.bandsintown.com/artists/" + searchVal.trim() + "/events?app_id=codingbootcamp"
    
    axios({
        method: "GET",
        url: query
    }).then(function(result){
        console.log(result.data[0])
    })
}

function DoWhatItSays() {
   
    fs.readFile ('random,txt', 'utf8', function(error, data){
        var txt = data.split(',');
        SpotifySong(txt[1]);
        if (error) {
           return console.log(error);
        } else 
        console.log('data','data');
    
    })
    // console.log("Do what it says!")
}

function p(val) {
    console.log(val)
};

p("Hello")
p("Dogs are cool!");