/** Crime type data module
* @module lib/streetData
*/

/** Requires the node-fetch module of the `node-fetch` library.
* @requires node-fetch
*/

const fetch = require("node-fetch");

/** Get Street to search for
* @function
* @param {string} street Street to seach for
*/

function getStreetData(street) {
	// alert(street);
	return new Promise(function(resolve, reject) {
		fetch(
			"https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=block like" +
				" '%25" +
				street +
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

/** Get all inital crime data
* @function
* @param {} ananomus function
*/
function getAllData() {
	return new Promise(function(resolve, reject) {
		fetch(
			"https://data.cityofchicago.org/resource/ijzp-q8t2.json?"
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//Work with JSON data here
				console.log(data[0].id); // Grab first Crime ID from first JSON element in Crime array
				resolve(data);
			})
			.catch((err) => {
				// Do something for an error here
				reject(err);
			});
	});
}

module.exports = {
	getStreetData,
	getAllData
};
