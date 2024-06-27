const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
            const result = JSON.parse(this.responseText); // Parse the JSON response
            console.log(result); // Log the result to see the structure
            displayData(result); // Call the function to display data
        } else {
            console.error('Error fetching data:', this.statusText);
        }
    }
});

xhr.open('GET', 'https://agoda-com.p.rapidapi.com/hotels/auto-complete?query=New%20York');
xhr.setRequestHeader('x-rapidapi-key', 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f');
xhr.setRequestHeader('x-rapidapi-host', 'agoda-com.p.rapidapi.com');

xhr.send(data);

function displayData(data) {
    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = ''; // Clear any existing content

    // Log the data to understand its structure
    console.log('Data:', data);

    // Adjust the display logic based on the actual structure of 'data'
    if (data && data.suggestions) { // Assuming 'suggestions' is the correct key
        data.suggestions.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item.displayName || 'No name available'; // Adjust based on actual data structure
            dataDiv.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'Unexpected data format';
        dataDiv.appendChild(p);
    }
}
