const fetch = require('node-fetch');

const url = 'https://agoda-com.p.rapidapi.com/hotels/auto-complete?query=New%20York';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f',
    'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
  }
};

try {
	const response =  fetch(url, options);
	// const result = await response.text();
	console.log(response);
} catch (error) {
	console.error(error);
}