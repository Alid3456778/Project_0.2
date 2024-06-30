// const url = 'https://agoda-com.p.rapidapi.com/hotels/auto-complete?query=Mumbai';
// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f',
//         'x-rapidapi-host': 'agoda-com.p.rapidapi.com'
//     }
// };

const url = 'https://airbnb19.p.rapidapi.com/api/v1/searchDestination?query=Solapur';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f',
		'x-rapidapi-host': 'airbnb19.p.rapidapi.com'
	}
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        document.getElementById('output').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('output').textContent = `Error: ${error.message}`;
    }
}

fetchData();
