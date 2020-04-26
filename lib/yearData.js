/** Crime type data module
* @module lib/yearData
*/

/** Requires the node-fetch module of the `node-fetch` library.
* @requires node-fetch
*/

const fetch = require("node-fetch");
 
/** Get crime data based on year
* @function
* @param {string} year Search for data based on year
*/

function getYearData(year) {
	return new Promise(function(resolve, reject) {
		fetch(
			"https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=year like" +
				" '%25" +
				year +
				"%25'"
		)
			.then((response) => {
                console.log(response);
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