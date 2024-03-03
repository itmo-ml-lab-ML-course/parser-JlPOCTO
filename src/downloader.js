const regexp = /<(a|div)\sclass=\"cover\s(linkeable\s)?anime-tooltip[^"]*\"[^>]*href\s*=(")(http[s]?:\/\/[^\s"']+)(")[^>]*?>/ig;

const fs = require('fs');

async function fetchPage(start, end) {
	console.log("start");
	for (let i = start; i <= end; ++i) {
		const currURL = "https://shikimori.one/animes/page/" + i;

		try {
			const response = await fetch(currURL, {
		        method: 'GET',
		        mode: 'no-cors',
		    });;
			const html = await response.text();

			const content = html.toString();

			let result = null;
			while ((result = regexp.exec(content)) !== null) {
				//console.log(result[4]);
				fs.appendFileSync('arrayDataSync.txt', result[4] + '\n');
			}
		} catch (error) {
			console.log(error);
		}
	}
	console.log("done from " + start + " to " + end);
}

async function fetchAll() {
	for (let i = 0; i < 111; ++i) {
		if (i * 10 + 1 > 1050) {
			break;
		}
		try {
			await fetchPage(i * 10 + 1, Math.min((i + 1) * 10, 1050));
		} catch (error) {
			console.log("Error at pages group: " + i);
			console.log(error);
		};
	}
}

(async () => {
	await fetchAll();
	console.log("awaited");
})();
