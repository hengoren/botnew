var HTTPS = require('https');
var cool = require('cool-ascii-faces');

/* sets botID. You will need to change your .env file so that you have this working correctly. Or you may hardcode your botID here. */
var botID = process.env.BOT_ID;

/* A dictionary of assorted adjectives. Used for generated responses */
var adjectives = ["abandoned", "able", "absolute", "adorable", "adventerous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", 
"aching", "acidic", "acrobatic", "babyish", "bad", "bare", "basic", "biodegradable", "bogus", "bubbly", "bumpy", "bruised", 
"calculating", "calm", "carefree", "charming", "cheap", "chubby", "circular", "clean", "colorful", "composed", "confused", "crusty", "creamy", 
"damaged", "dangerous", "defenseless", "delicious", "delirious", "dense", "devoted", "distant", "dizzy", "droopy", "dull", 
"eager", "easy", "edible", "elastic", "elderly", "enormous", "evil", "exotic", "fabulous", "fat", "faithful", "feisty", "filty", "flamboyant", "flaky", "flowery", "flimsy", "fluffy", "foolish", "frail", 
"frosty", "fussy", "friendly", "gargantuan", "gentle", "giddy", "glum", "gifted", "gross", "grouchy", "grubby", "hairy", "harmless", "healthy", 
"hollow", "honorable", "hot", "icky", "icy", "ill", "impeccable", "impassioned", "inborn", "infamous", "infantile", "inferior", "innocent", 
"itchy", "jaded", "jaunty", "jealous", "jolly", "jubliant", "kooky", "kosher", "lame", "lanky", "lazy", "liqued", "limp", "loud", "luminous", 
"mad", "majestic", "marvelous", "massive", "mature", "mediocre", "meek", "messy", "mild", "milky", "misty", "misguided", "monstrous", "modest", "moist", 
"musty", "naive", "natural", "nippy", "obedient", "odd", "obese", "oblong", "ordinary", "pale", "peaceful", "petty", "perky", "playful", "pleased", "profitable", "purple", 
"queasy", "quick", "ragged", "rectangular", "repulsive", "silly", "squeaky", "serious", "salty", "somber", "sizzling", 
"spherical", "sleepy", "soupy", "starry", "stiff", "slimy", "scented", "scrawny", "shy", "smooth", "sniveling", "spicy", "sympathetic", 
"ugly", "tall", "tasty", "tattoed", "tired", "triangular", "tubby", "uncomfortable", "unripe", "vibrant", "watery", "well groomed", "woozy", "wiry", "worried"]

/* A dictionary of assorted animals. Used for generated responses */
var animals = ["aardvark", "albatross", "alligator", "alpaca", "anteater", "armadillo", 
"babbon", "badger", "bald eagle", "bear", "beaver", "beluga whale", "bison", "bird", 
"blowfish", "boa constrictor", "buffalo", "bullfrog", "butterfly", "camel", "caribou", 
"chipmunk", "caterpillar", "cheetah", "chihuahua", "chimipanzee", "cockatoo", "cow", "crustacean", 
"chinchilla", "deer", "dodo", "dog", "dinosaur", "dolphin", "duck", "earthworm", "eel", "elephant", "donkey", 
"duck-billed platypus", "elk", "emu", "fox", "giraffe", "gorilla", "grasshopper", 
"groundhog", "guinea pig", "goat", "jack rabbit", "kangaroo", "koala bear", "ladybug", "lemur", "lion", 
"lizard", "manatee", "meerkat", "monkey", "orangutan", "moose", "opossum", "narhwal", 
"ostrich", "penguin", "tortoise", "puma", "nigga", "raccon", "rabbit", "salmon", "shark", "skunk", 
"sloth", "squirrel", "Stegasaurus", "toucan", "tarantula", "tiger", "turkey", "velociraptor", 
"wallaby", "weasel", "whippersnapper", "wombat", "zebra"]

/* A dictionary of assorted bakes. Used for generated responses */
var bakes = ["look at yo 'velis false' jeans",
"ol next friday pinky",
"you look like a japanese snappin billy GOAT",
"get off the computer and Lose some WEIGHT",
"I dont understand why everybody gotta HATE",
"I only fucks with lil b &kids bop.! -_____-",
"get off the computer and Lose some WEIGHT",
"where yall going, can i go too.? HELL NAWW.!!!",
"big Worm without the perm neckahh",
"only time i ever came close to fuckin is when I typed in http://pornhub.com  lookin ass ..  coco butter over deez hoes faceahh ",
"smushed toostie roll dat done been stepped on by 6 big ass niggas",
"Chris Brown before he thought about hitting Rihanna lookin .. The only time i get high is if another nigga roll the blunt",
"ol' stank breath chewing on gum blowing ass bubbles",
"ol' fubu walmart no style havin'",
"ol' southpark both feet moving at the same damn time ",
"lap dance givin hippo neck ass foot workin goose 'jing a lang jing a lang.. U GONE EAT YO CORNBREAD'",
"melted sour patch kidz and spoiled tuna fish eating azz.",
"egg Nog 50% off after. Christmas buying azz.",
"ole swole chest skinny leg havin azz",
"ole sketchers shape-upz wearin ass",
"'uh un don't throw dem cans away, I'm goin to turn dem in tomorrow' ole shoopin cart pushin ass", 
"with your boot nose ass, loose tobacco smellin ass...wrestlin mat smellin ass", 
"Butter back bacon neck ass, look like yo ass fuck car mufflers and midgets boa ", 
"look like yo ass sell dvds and socks on madison and pulaski ol super dome head ass", 
"look mommy, im a big kid now!", 
"Lookin ass gheri curl wit a hi top fade lookin ass", 
"Ole camouflage snuggie wearin ass", 
"Ole la gear light up shoes havin ass", 
"Ole bushwackin ass nikkah ", 
"Ole boosie fade wit a rat tail in da back havin azz boi ", 
"Ole yo gabba gabba yellow shirt orange pants wearin ass nikkah", 
"Ole clip my toenails in the sink ass", 
"Lego. Ole Lego my eggo waffle eatin ass", 
"Ole chat line callin ass nikkah. Meet bitches on Craigslist ass boi.", 
"Ole yellow hard hat blue jean cutoff wit sum buckwheat Tim's wearin ass nikkah!!!", 
"ole lunchable eatin ass boi. Ole I think I can I think I can little engine that could ass boi."
]

var dolanLibrary = ["fuk u", "pls"]

/* vars created to generate random integers within the bounds of each dictionary. This will index you to a random item in the dictionary */
var randombake;
var randomadj;
var randomanimal;
var randomdolan;
var infrequent;

var toSend;
var len;

/* The string version of the JSON */
var r;

/* Things Riley did to obtain substrings from the JSON */
// var rileyNamelong;
// var rileyName;
var userId;

/* JSON keywords that come along with messages */
// var attatchments;
// var avatar_url;
// var created_at;
// var group_id;
// var id;
var name;
// var sender_id;
// var sender_type;
// var source_guid;
// var system;
// var text;
// var user_id;

/* I am still unsure if this is used */
var chunk;


/* This function determines if the bot will respond to a certain message by triggering the bot based on a certain regex expression */
function respond() {
  // chunk = this.req.chunks[0]
  var request = JSON.parse(this.req.chunks[0]), //length is one
      botRegex = /u/;
      //botRegex = /^\/cool guy$/;


  // toSend = request.text.substring(5,request.text.length)

  r = JSON.stringify(request, null, 4);
  // rileyNamelong = r.substring(r.indexOf('"name":') + 9, (r.indexOf('"sender_id":') - 4))
  // rileyName = rileyNamelong.substring(0, rileyNamelong.length - 3)
  userId = r.substring(r.indexOf('user_id":') + 11, r.indexOf('user_id":') + 18)
  
  /* set variables to JSON correspondent */
  // attatchments = request.attatchments;
  name = request.name;
  // avatar_url = request.avatar_url;
  // created_at = request.created_at;
  // group_id = request.group_id;
  // id = request.id;
  // sender_id = request.sender_id;
  // sender_type = request.sender_type;
  // source_guid = request.source_guid;
  // system = request.system;
  // text = request.text;
  // user_id = request.user_id;



  // if(request.text && botRegex.test(request.text) && userId != '345971"') {  //&& userId != '345971"' 2100646 //&& userId =='345971"'
  if (userId != '345971"') {
  //if (sender_type != bot) {
    if(request.text && botRegex.test(request.text)) {
    toSend = request.text;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
    } 
  } 
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


/* This function generates a message to be posted to by the bot */
function postMessage() {
  var botResponse, options, body, botReq;
  randombake = Math.floor(Math.random() * (bakes.length - 0 + 1)) + 0;
  randomadj = Math.floor(Math.random() * (adjectives.length - 0 + 1)) + 0;
  randomanimal = Math.floor(Math.random() * (animals.length - 0 + 1)) + 0;
  randomdolan = Math.floor(Math.random() * (dolanLibrary.length - 0 + 1)) + 0;
  randomresponse = Math.floor(Math.random() * 2);
  infrequent = Math.floor(Math.random() * 20);
  var randostring;
  var infrequentresponse;

  if (infrequent == 0) {
    infrequentresponse = "Hey " + name + ", touch me! I love being played with" + botResponse;
  }

  if (randomresponse == 0) {
    randostring = "fuk u " + name
  }
  else {
    randostring = name + " pls"
  }


  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
   "bot_id" : botID,
   "text" : infrequentresponse
   //"text" : randostring
   //"text" : "cmon " + name + ", boi yo look like a muhfuckin " + adjectives[randomadj] + " " + animals[randomanimal] +  ". Lookin at me like \n \n" + botResponse + "\n \n wit yo ugly " + bakes[randombake] + " face ass like shit boi"
   //"text" : r //+ "\n attatchments: " + attatchments + "\n avatar_url: " + avatar_url + "\n created_at: " + created_at + "\n group_id: " + group_id + "\n id: " + id + 
             //"\n sender_id: " + sender_id + "\n source_guid: " + source_guid + "\n system: " + system + "\n text: " + text + "\n user_id: " + user_id;
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