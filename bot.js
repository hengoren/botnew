var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

// var adjectives = ["abandoned", "able", "absolute", "adorable", "adventerous", "academic", "acceptable", "acclaimed", "accomplished", "accurate",
// "aching", "acidic", "acrobatic", "babyish", "bad", "bare", "basic", "biodegradable", "bogus", "bubbly", "bumpy", "bruised", 
// "calculating", "calm", "carefree", "charming" "cheap", "chubby", "circular", "clean", "colorful", "composed", "confused", "crusty", "creamy", 
// "damaged", "dangerous", "defenseless", "delicious", "delirious", "dense", "devoted", "distant", "dizzy", "droopy", "dull", 
// "eager", "easy", "edible", "elastic", "elderly", "enormous", "evil", "exotic", "fabulous", "fat", "faithful", "feisty", "filty", "flamboyant", "flaky", "flowery", "flimsy", "fluffy", "foolish", "frail",
// "frosty", "fussy", "friendly", "gargantuan", "gentle", "giddy", "glum", "gifted", "gross", "grouchy", "grubby", "hairy", "harmless", "healthy",
// "hollow", "honorable", "hot", "icky", "icy", "ill", "impeccable", "impassioned", "inborn", "infamous", "infantile", "inferior", "innocent", 
// "itchy", "jaded", "jaunty", "jealous", "jolly", "jubliant", "kooky", "kosher", "lame", "lanky", "lazy", "liqued", "limp", "loud", "luminous", 
// "mad", "majestic", "marvelous", "massive", "mature", "mediocre", "meek", "messy", "mild", "milky", "misty", "misguided", "monstrous", "modest", "moist", 
// "musty", "naive", "natural", "nippy", "obedient", "odd", "obese", "oblong", "ordinary", "pale", "peaceful", "petty", "perky", "playful", "pleased", "profitable", "purple", 
// "queasy", "quick", "ragged", "rectangular", "repulsive", "silly", "squeaky", "serious", "salty", "somber", "sizzling", 
// "spherical", "sleepy", "soupy", "starry", "stiff", "slimy", "scented", "scrawny", "shy", "smooth", "sniveling", "spicy", "sympathetic",
// "ugly", "tall", "tasty", "tattoed", "tired", "triangular", "tubby", "uncomfortable", "unripe", "vibrant", "watery", "well groomed", "woozy", "wiry", "worried"]

// var animals = ["aardvark", "albatross", "alligator", "alpaca", "anteater", "armadillo",
// "babbon", "badger", "bald eagle", "bear", "beaver", "beluga whale", "bison", "bird", 
// "blowfish", "boa constrictor", "buffalo", "bullfrog", "butterfly", "camel", "caribou", 
// "chipmunk", "caterpillar", "cheetah", "chihuahua", "chimipanzee", "cockatoo", "cow", "crustacean",
// "chinchilla", "deer", "dodo", "dog", "dinosaur", "dolphin", "duck", "earthworm", "eel", "elephant", "donkey"
// "duck-billed platypus", "elk", "emu", "fox", "giraffe", "gorilla", "grasshopper", 
// "groundhog", "guinea pig", "goat", "jack rabbit", "kangaroo", "koala bear", "ladybug", "lemur", "lion",
// "lizard", "manatee", "meerkat", "monkey", "orangutan", "moose", "opossum", "narhwal", 
// "ostrich", "penguin", "tortoise", "puma", "nigga", "raccon", "rabbit", "salmon", "shark", "skunk",
// "sloth", "squirrel", "Stegasaurus", "toucan", "tarantula", "tiger", "turkey", "velociraptor",
// "wallaby", "weasel", "whippersnapper", "wombat", "zebra"]


var bakes = ["look at yo 'velis false' jeans",
"ol next friday pinky",
"you look like a japanese snappin billy GOAT",
"get off the computer and Lose some WEIGHT",
"I dont understand why everybody gotta HATE",
"I only fucks with lil b &kids bop.! -_____-",
"get off the computer and Lose some WEIGHT",
"where yall going, can i go too.? HELL NAWW.!!!"]

var randomnumber;
var toSend;
var len;
var r;
var namelong;
var name;

function respond() {
  var request = JSON.parse(this.req.chunks[0]), //length is one
      //botRegex = /^./;
      botRegex = /^\/cool guy$/;

      
  r = JSON.stringify(request, null, 4);

  var groupID = request.group_id;


  namelong = r.substring(r.indexOf('"name":') + 9, (r.indexOf('"sender_id":') - 4))
  name = namelong.substring(0,namelong.length-3)

  if(request.text && botRegex.test(request.text)) {
    toSend = request.text;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  randomnumber = Math.floor(Math.random() * (bakes.length - 0 + 1)) + 0;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    // "text" : name + ", you look like this guy \n \n" + botResponse + "\n \n wit yo " + bakes[randomnumber] + " lookin ass!!!"
    "text" : typeof this.req.chunks[0]
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;