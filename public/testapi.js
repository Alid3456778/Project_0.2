const url = 'https://booking-com.p.rapidapi.com/v1/static/cities?country=it&page=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f',
		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}