const clientId = '7o3KofyqGB1s16YREFEnEMmlV4DksexM';
const clientSecret = 'SxZrARWfswWmAun8';

async function getAccessToken() {
    const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
}

async function searchHotels() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    const accessToken = await getAccessToken();
    const endpoint = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${location}`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch hotel offers');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching hotel offers:', error);
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach(hotel => {
            const hotelDiv = document.createElement('div');
            hotelDiv.className = 'hotel';

            const hotelName = document.createElement('h3');
            hotelName.textContent = hotel.hotel.name;
            hotelDiv.appendChild(hotelName);

            const hotelAddress = document.createElement('p');
            hotelAddress.textContent = `${hotel.hotel.address.lines.join(', ')}, ${hotel.hotel.address.cityName}`;
            hotelDiv.appendChild(hotelAddress);

            const hotelPrice = document.createElement('p');
            hotelPrice.textContent = `Price: ${hotel.offers[0].price.total} ${hotel.offers[0].price.currency}`;
            hotelDiv.appendChild(hotelPrice);

            resultsDiv.appendChild(hotelDiv);
        });
    } else {
        resultsDiv.textContent = 'No hotels found';
    }
}
