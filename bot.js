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
  // var request = JSON.parse(this.req.chunks[0]), //length is one
  //     //botRegex = /^./;
  //     botRegex = /^\/cool guy$/;

      
  // r = JSON.stringify(request, null, 4);

  // //var groupID = request.group_id;


  // namelong = r.substring(r.indexOf('"name":') + 9, (r.indexOf('"sender_id":') - 4))
  // name = namelong.substring(0,namelong.length-3)

  // if(request.text && botRegex.test(request.text)) {
  //   toSend = request.text;
  //   this.res.writeHead(200);
  //   postMessage();
  //   this.res.end();
  // } else {
  //   console.log("don't care");
  //   this.res.writeHead(200);
  //   this.res.end();
  // }

var request = JSON.parse(this.req.chunks[0]),
       botRegex = /^\/cool guy/;  botRegexDL = /^\/DDL/i;botRegexSalt = /^\/salt/;botRegexRules = /^\/rules/
       botRegexAd=/^\/advance/;botRegexGTA = /^\/gta/; botRegexSC = /^\/SDL/i; botODB = /(.*\s+)(.*odb)(\s+.*)/i; botDuck = /^\/duck/;
       botRegexP = /^\/PDL/i;  botRegexTw = /^\/twitch/i; botRegexSb = /^\/sub/; botRegexSh = /^\/shrug/; botRegexWk = /^\/users/; botRegexCC = /^\/cc/;
       botRegexSiege = /^\/siege/
       siege1 = 'https://i.groupme.com/350x419.png.adc8c73a6c1547e0a9e04320296329f8'; siege2 = 'https://i.groupme.com/1279x752.jpeg.aa5d0401e0df495bba4b4e09dc5a6bd7'
       siege3 = 'https://i.groupme.com/960x960.png.006e180e05d841c6a2962e844bf1e6fd';
   var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                 ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                 "MIA","BUF","SF","WAS","NYJ","TB"]
   if(request.text && botRegex.test(request.text)) {
     this.res.writeHead(200);
     postMessage(cool());
     this.res.end();
   } 
   else if(request.text && botRegexDL.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://daddyleagues.com/PMC/team/"+request.text.substring(5,8)+"/depthchart");
     this.res.end();
   } 
   else if(request.text && botRegexSalt.test(request.text)) {
     this.res.writeHead(200);
     postMessage("https://i.imgur.com/B5BSVqH.png");
     this.res.end();
   } 
   else if(request.text && botRegexAd.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://www.hackcollege.com/wp-content/uploads/2013/02/kno_advance.jpg");
     this.res.end();
   }
   else if(request.text && botRegexRules.test(request.text)) {
     this.res.writeHead(200);
     postMessage("https://docs.google.com/document/d/1hSuEG7oplnx4IX6HGsMOjsWb9TCqC4-F1NLjuBz5PCM/edit");
     this.res.end();
   } 
   else if(request.text && botRegexGTA.test(request.text)) {
     this.res.writeHead(200);
     postMessage("https://i.groupme.com/220x147.jpeg.a2dd2add32b14fff9e329535186d793c.large");
     this.res.end();
   } 
   else if(request.text && botRegexSC.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://daddyleagues.com/PMC/team/"+request.text.substring(5,8)+"/schedule");
     this.res.end();
   }
   else if(request.text && botRegexP.test(request.text)) {
     this.res.writeHead(200);
     var req = request.text.substring(5,request.text.length);
     var rep = req.replace(/ /,"+");
     postMessage("http://daddyleagues.com/PMC/players?name="+rep+"&position=all&team=all");
     this.res.end();
   }  
 
   else if(request.text && botRegexTw.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
     this.res.end();
   } 
   else if(request.text && botRegexSb.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://www.reddit.com/r/maddenall32");
     this.res.end();
   } 
   else if(request.text && botRegexSh.test(request.text)) {
     this.res.writeHead(200);
     postMessage("¯\\_(ツ)_/¯");
     this.res.end();
   } 
   else if(request.text && botRegexWk.test(request.text)) {
     this.res.writeHead(200);
     postMessage("https://docs.google.com/spreadsheets/d/1kJqQWCq3RKiTrd4f71FFNKr-Y0ppJzjk0fSF0rP6Bto/edit?usp=sharing");
     this.res.end();
   } 
   else if(request.text && botODB.test(request.text)) {
     this.res.writeHead(200);
     postMessage("OBJ*");
     this.res.end();
   } 
   else if(request.text && botDuck.test(request.text)) {
     this.res.writeHead(200);
     postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
     this.res.end();
   }
   else if(request.text && botRegexCC.test(request.text)) {
     this.res.writeHead(200);
     postMessage("https://i.groupme.com/851x1184.jpeg.330228901f684b0cb46cd1cef6953923");
     this.res.end();
   }
   else if(request.text && botRegexSiege.test(request.text)) {
     this.res.writeHead(200);
     if(0.6 >= Math.random() > 0.3)
       postMessage(siege1);
     else if(Math.random() >0.6)
       postMessage(siege3)
     else
       postMessage(siege2);
     this.res.end();
   }
   
   else {
     console.log("don't care");
     this.res.writeHead(200);
     this.res.end();
   }

}

// function postMessage() {
//   var botResponse, options, body, botReq;
//   randomnumber = Math.floor(Math.random() * (bakes.length - 0 + 1)) + 0;

//   botResponse = cool();

//   options = {
//     hostname: 'api.groupme.com',
//     path: '/v3/bots/post',
//     method: 'POST'
//   };

//   body = {
//     "bot_id" : botID,
//     // "text" : name + ", you look like this guy \n \n" + botResponse + "\n \n wit yo " + bakes[randomnumber] + " lookin ass!!!"
//     "text" : typeof request
//   };

//   console.log('sending ' + botResponse + ' to ' + botID);

//   botReq = HTTPS.request(options, function(res) {
//       if(res.statusCode == 202) {
//         //neat
//       } else {
//         console.log('rejecting bad status code ' + res.statusCode);
//       }
//   });

//   botReq.on('error', function(err) {
//     console.log('error posting message '  + JSON.stringify(err));
//   });
//   botReq.on('timeout', function(err) {
//     console.log('timeout posting message '  + JSON.stringify(err));
//   });
//   botReq.end(JSON.stringify(body));
// }

function postMessage(response) {
   var botResponse,options, body, botReq;
 
   botResponse = response
 
   options = {
     hostname: 'api.groupme.com',
     path: '/v3/bots/post',
     method: 'POST'
   };
 
   body = {
     "bot_id" : botID,
     "text" : botResponse
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
  
 function postMessage() {
   var botResponse, options, body, botReq;
 
   botResponse = cool();
 
   options = {
     hostname: 'api.groupme.com',
     path: '/v3/bots/post',
     method: 'POST'
   };
 
   body = {
     "bot_id" : botID,
     "text" : botResponse
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
 function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;