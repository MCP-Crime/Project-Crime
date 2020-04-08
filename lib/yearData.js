const fetch = require("node-fetch");

function getYearData(year) {
	return new Promise(function(resolve, reject) {
		fetch(
			"https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=year like" +
				" '%25" +
				year +
				"%25'"
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//Work with JSON data here
				resolve(data);
			})
			.catch((err) => {
				// Do something for an error here
				console.log("NO Records Found");
				reject(err);
			});
	});
}

module.exports = {
	getYearData
};