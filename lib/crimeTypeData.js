/** Crime type data module
* @module lib/crimeTypeData
*/

/** Requires the node-fetch module of the `node-fetch` library.
* @requires node-fetch
*/
const fetch = require("node-fetch");

/** Function to retrieve data by crime type
* @function
* @param {string} crimeType Type of crime to search for
*/

function getCrimeByCrimeType(crimeType) {
	return new Promise(function(resolve, reject) {
		fetch(
			"https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=primary_type like" +
				" '%25" +
				crimeType +
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
	getCrimeByCrimeType
};