// Updated bot.js file

var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var CB = require('cleverbot-node');
var request = require('request');


/* sets botID. You wil need to change your .env file so that you have this working correctly.
Or you may hardcode your botID here. */
var botID = process.env.BOT_ID;

/* A dictionary of assorted adjectives. Used for generated responses. */
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

/* A dictionary of assorted animals. Used for generated responses. */
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

/* A dictionary of fun facts. Used for generated responses */
var funFacts = ["11% of people are left handed", "August has the highest percentage of birhts", 
"unless food is mixed with saliva you can't taste it", "the average person falls asleep in 7 minutes",
"a bear has 42 teeth", "an ostrich's eye is bigger than its brain", "lemons contain more sugar than strawberries",
"8% of people have an extra rib", "Ralph Lauren's original name was Ralph Lifshitz", "rabbits like licorice",
"the Hawaiian alphabet has 13 letters", "armadillos have 4 babies at a time and are all the same sex", 
"reindeer like bananas", "the longest recorded flight of a chicken was 13 seconds", 
"birds need gravity to swallow", "dreamt is the only word that ends in mt", "a cat has 32 muscles in each ear", 
"goldfish can see both infrared and ultraviolet light", "the samllest bones in the human body are found in the penis", 
"money is the number one thing couples argue about", "macademia nuts are toxic to dogs", 
"stewardesses is the longest word typed with only the left hand", "honey is the only natural food that never spoils", 
"about 90% of the world's population kisses", "Coca-Cola originally contained small amounts of cocaine", 
"toliets account for 35% of indoor water use", "the fortune cookie was invented in San Francisco", 
"Koalas sleep around 18 hours a day", "all insects have 6 legs", "in Eastern Africa you can buy beer brewed from bananas", 
"a giraffe can clean its ears with its 21 inch tongue", "the Grand Canyon can hold around 900 trillion footballs", 
"sponges can hold more cold water than hot", "cats have over 100 vocal chords", "fire usually moves faster uphill than downhill", 
"frogs can't swallow with their eyes open", "elephants are the only mammal that can't jump"]

/* vars created to generate random integers within the bounds of each dictionary.
This will index you to a random entry in the dictionary */
var randomadj;
var randomanimal;
var randomfunfact;
var infrequent;

var toSend;
var len;

/* The string version of the JSON */
var r;

/* Help to obtain substrings from the JSON */
var userId;

/* JSON keywords from messages */
var attachments;
var avatar_url;
var created_at;
var group_id;
var id;
var name;
var sender_id;
var sender_type;
var source_guid;
var system;
var text;
var user_id;
var global_cleverbot_response;

/* Not sure if used */
var chunk;

var requestCount = 0;


/* This function takes in text and mocks it like the recent Spongebob meme */
function spongebobMock(text) {
	newtext = ''
	for (i = 0; i < text.length; i++) {
		randomint = Math.floor(Math.random() * 2)
		if (randomint == 0) {
			newtext += text.charAt(i).toUpperCase()
		}
		else {
			newtext += text.charAt(i).toLowerCase()
		}
	}
	return newtext
}

/* using request package */
function generateCleverbotResponse(input_text, postMessage) {
	var host, cb_key, thepath, url, toreturn;
	host = "https://www.cleverbot.com/getreply"
	cb_key = "CC2nuUKHueugZyumCinO_21JQuQ"
	thepath = "?key=" + cb_key + "&input=" + input_text
	url = host + thepath
	console.log("HERE, made the url")

	cbReq = request(url, function(error, response, body) {
		console.log("requesting from the url: ", url)
		console.log('error:', error); // Prints the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if response is returned
		console.log('body:', body); //print the stuff
		toreturn = JSON.parse(body).output;
		console.log("TORETURN!!!!! ", toreturn)
		requestCount = 1;

		
	});
	global_cleverbot_response = toreturn
	return toreturn 
}

/* This function determines if the bot will respond to a certain message
by triggering the bot on a regular expression */
function respond() {
	console.log("FIRST, you are the respond function")
	// chunk = this.req.chunks[0]
	var request = JSON.parse(this.req.chunks[0]), // length is one
					botRegex = /./;
					// botRegex = /^\/cool guy$/;

	r = JSON.stringify(request, null, 4);
	userId = r.substring(r.indexOf('user_id":') + 11, r.indexOf('user_id":') + 18)

	/* set variables for JSON */
	attachments = request.attachments
	name = request.name
	avatar_url = request.avatar_url
	created_at = request.created_at
	group_id = request.group_id
	id = request.id
	sender_id = request.sender_id
	sender_type = request.sender_type
	source_guid = request.source_guid
	system = request.system
	text = request.text
	user_id = request.user_id

	if (userId != '345971"') {
		if (request.text && botRegex.test(request.text)) {
			toSend = request.text;
			this.res.writeHead(200);
			console.log("right before the postMessage call")
			generateCleverbotResponse(text, postMessage)
		}
	}
	else {
		console.log("don't care, not gonna")
		this.res.writeHead(200);
		this.res.end();
	}
}


/* This function generates the message to be posted from the bot and posts it */
function postMessage() {;
	// console.log("THIRD, we shouldhave just called generateCleverbotResponse and gotten a response, ", a_clever_response);
	var funnyFace, msgToPost, options, body, botReq;
	randomadj = Math.floor(Math.random() * (adjectives.length + 1));
	randomanimal = Math.floor(Math.random() * (animals.length + 1));
	randomfunfact = Math.floor(Math.random() + (funFacts.length + 1));
	infrequent = Math.floor(Math.random() * 100);

	mock = spongebobMock(text);
	funnyFace = cool();
	
	// if (infrequent % 10 == 0) {
	// 	msgToPost = "Hey " + name + ", did you know " + funFacts[randomfunfact]
	// }
	// else if (infrequent % 10 == 1) {
	// 	msgToPost = "cmon " + name + ", boi you look like a " + adjectives[randomadj] + " " + animals[randomanimal]
	// }
	// else if (infrequent % 10 == 2) {
	// 	msgToPost = funnyFace
	// }
	// else if (infrequent % 10 == 3) {
	// 	msgToPost = mock
	// }

	msgToPost = global_cleverbot_response
	console.log("Generated cb response: ", msgToPost)
	options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	body = {
		"bot_id" : botID,
		"text" : msgToPost
		//"text" : r //+ "\n attatchments: " + attatchments + "\n avatar_url: " + avatar_url + "\n created_at: " + created_at + "\n group_id: " + group_id + "\n id: " + id + 
             		//"\n sender_id: " + sender_id + "\n source_guid: " + source_guid + "\n system: " + system + "\n text: " + text + "\n user_id: " + user_id; 
	};

	console.log('sending ' + msgToPost + ' to ' + botID)

	botReq = HTTPS.request(options, function(res) {
		if (res.statusCode = 202) {
			// neat
		}
		else {
			console.log('rejecting bad status code ' + res.statusCode);
		}
	});

	botReq.on('error', function(err) {
		console.log('error posting message ' + JSON.stringify(err));
	});

	botReq.on('timeout', function(err) {
		console.log('timeout posting message ' + JSON.stringify(err));
	});

	botReq.end(JSON.stringify(body));
}

/* uses https package */
// function generateCleverbotResponse(input_text) {
// 	var cb_key, thepath;
// 	cb_key = "CC2nuUKHueugZyumCinO_21JQuQ"
// 	thepath = "?key" + cb_key + "&input=" + input_text

// 	options = {
// 		hostname: "https://www.cleverbot.com/getreply",
// 		path: thepath,
// 		method: 'GET',
// 		headers: { 'Content-Type': 'text/javascript' }
// 	};

// 	cbReq = HTTPS.request(options, function(res) {
// 		res.setEncoding('utf-8');

// 		var responseString = '';

// 		res.on('data', function(data) {
// 			responseString += data;
// 		});

// 		res.on('end', function() {
// 			console.log(responseString);
// 			var responseObject = JSON.parse(responseString);
// 			success(responseObject);
// 		});
// 	});

// 	cbreq.end()
// 	return responseString
// }


exports.respond = respond;



