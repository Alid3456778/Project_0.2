// let productDiv = document.querySelector(".div");
//  async function places(searchQuery) {
//      try {
//          productDiv.innerHTML = ``;
//          let product = await fetch(`https://freetestapi.com/api/v1/destinations?search=${searchQuery} `);
//          let finalProduct = await product.json();
//          console.log(finalProduct);
//          //window.location.href = "http://localhost:3000/fake.html";
//          finalProduct.forEach(dest => {
//              productDiv.innerHTML += ` <div class="divItm">
//  <h2>${dest.name} | ${dest.country}</h2>
//  <p>${dest.description}</p>
//  <img src="${dest.image}" alt="">
//  <h6>Best time to visit :</h6><p>${dest.best_time_to_visit}</p>
//  <h6>Tourists Places :</h6><p>${dest.top_attractions}</p>
//  <h6>What you experience :</h6><p>${dest.activities}</p>
//  <h6>Popular dishes :</h6><p>${dest.local_dishes}</p>
//  <h6>Their language and currency :</h6>
//  <p>${dest.language} | ${dest.currency}</p>
//  </div>
//  </div>`
//          });
//      } catch (error) {
//          console.error('Error fetching or parsing data:', error);
//      }
//  }
//  document.getElementById('searchForm').addEventListener('submit', function (event) {
//      event.preventDefault(); // Prevent default form submission

//      // Get the value entered by the user
//      const searchInput = document.getElementById('searchInput').value.trim();

//      // Call displayAirports function with the search query
//      if (searchInput !== '') {
//          places(searchInput);
//      } else {
//          console.error('Please enter a valid airport name.');
//      }
//  });

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
        console.log('Access token:', data.access_token);
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

    console.log('Searching hotels for location:', location);

    const accessToken = await getAccessToken();
    if (!accessToken) {
        alert('Failed to get access token');
        return;
    }

    // For demonstration purposes, we're using a static city code (e.g., NYC for New York City)
    const endpoint = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=NYC`; // Replace with dynamic cityCode if needed

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
        console.log('Hotel offers:', data);
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
