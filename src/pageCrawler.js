const IMGRegex = /<div\sclass="b-db_entry-poster.*?data-href="([^"]+)"/;
const headerRegex = /<meta\scontent="([^"]+)"\sproperty="og:title"/;
const ratingValue = /<meta\scontent="([^"]+)"\sitemprop="ratingValue"/;
const ratingCount = /<meta\scontent="([^"]+)"\sitemprop="ratingCount"/;

const episodes = /Эпизоды:\s*<\/div>[^>]*>(.*?)</;
const type = /<meta\s*content="([^"]+)"\s*property="og:type"/;
const episodeLength = /<meta\s*content="([^"]+)"\s*property="video:duration"/;
const years = /<meta\s*content="([^"]+)"\s*property="video:release_date"/;
const genre = /<meta\s*content="([^"]+)"\s*property="video:tag"/g;
const ratingLimit = /Рейтинг:<[^<]+<[^<]+<[^>]+>([^<]+)</;

const description = /itemprop="description">[^>]+>(.*?)<\/div></;

const fs = require('fs');
const Axios = require('axios');
const readline = require('readline');
const request = require('request');

let index = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function parsePage(url) {
	try {
		const content = fs.readFileSync("./TEST/test" + index + ".txt").toString();
		let result = null;
		result = headerRegex.exec(content);
		//fs.writeFileSync("./TEST/test" + index + ".txt", content);
		//const imgName = './IMG/' + index + '.jpeg';
		const fileName = './lab1/' + index + '.txt';
		index++;
		//console.log(result[1]);
		fs.writeFileSync(fileName, 'Name: ' + result[1] + '\n');

		result = type.exec(content);
		//console.log(result[1]);
		fs.appendFileSync(fileName, 'Type: ' + result[1] + '\n');

		result = episodes.exec(content);
		let numberEpisodes = 1;
		if (result !== null) {
			//console.log(result[1]);
			numberEpisodes = result[1];	
		}
		fs.appendFileSync(fileName, 'Episodes: ' + numberEpisodes + '\n');

		result = episodeLength.exec(content);
		//console.log(result[1]);
		if (result !== null) {
			fs.appendFileSync(fileName, 'Episode length: ' + result[1] + '\n');
		}

		result = years.exec(content);
		if (result !== null) {
			//console.log(result[1]);
			fs.appendFileSync(fileName, 'Last episode date release: ' + result[1] + '\n');
		}

		result = genre.exec(content);
		fs.appendFileSync(fileName, 'Genres: ');
		while (result !== null) {
			//console.log(result[1]);
			fs.appendFileSync(fileName, result[1] + ', ');
			result = genre.exec(content);
		}
		fs.appendFileSync(fileName, '\n');

		result = ratingLimit.exec(content);
		if (result !== null) {
			fs.appendFileSync(fileName, 'Rating limit: ' + result[1] + '\n');
		}
		
		result = ratingValue.exec(content);
		if (result !== null) {
			fs.appendFileSync(fileName, 'Rating: ' + result[1] + '\n');
		}

		result = ratingCount.exec(content);
		if (result !== null) {
			fs.appendFileSync(fileName, 'Rating numbers: ' + result[1] + '\n');
		}

		result = description.exec(content);
		const regexDelete = /<[^>]*>/gi;
		const stringWithoutLinks = result[1].replace(regexDelete, '');
		//console.log(stringWithoutLinks);
		fs.appendFileSync(fileName, 'Description: ' + stringWithoutLinks + '\n');

		/*result = IMGRegex.exec(content);
		console.log(result[1]);
		const urlIMG = result[1];
		var download = function(uri, filename, callback){
		  	request.head(uri, function(err, res, body){

		    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		  });
		};

		download(urlIMG, imgName, function(){
		  console.log('IMG downloaded');
		});*/
	} catch (error) {
		console.log(error);
	}
	console.log("done " + url);
}

const fileStream = fs.createReadStream('arrayDataSync.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

(async () => {
	var number = 0;
	for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    await parsePage(line);
    //await sleep(100);
    number++;
    //break;
  }
})();