

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the value entered by the user
    const searchInput = document.getElementById('searchInput').value.trim();

    // Save the search query to localStorage
    if (searchInput !== '') {
        // localStorage.clear();
        localStorage.setItem('searchQuery', searchInput);
        window.location.href = 'fake'; // Redirect to the results page
    } else {
        console.error('Please enter a valid place name.');
    }
});








// // function myFunc(){
//     let productDiv = document.querySelector(".div");
// async function places(searchQuery) {
//     try {
//         productDiv.innerHTML = ``;
//         let product = await fetch(`https://freetestapi.com/api/v1/destinations?search=${searchQuery} `);
//         let finalProduct = await product.json();
//         console.log(finalProduct);
//         //window.location.href = "http://localhost:3000/fake.html";
//         finalProduct.forEach(dest => {
//             productDiv.innerHTML += ` <div class="divItm">
// <h2>${dest.name} | ${dest.country}</h2>
// <p>${dest.description}</p>
// <img src="${dest.image}" alt="">
// <h6>Best time to visit :</h6><p>${dest.best_time_to_visit}</p>
// <h6>Tourists Places :</h6><p>${dest.top_attractions}</p>
// <h6>What you experience :</h6><p>${dest.activities}</p>
// <h6>Popular dishes :</h6><p>${dest.local_dishes}</p>
// <h6>Their language and currency :</h6>
// <p>${dest.language} | ${dest.currency}</p>
// </div>
// </div>`
//         });
//     } catch (error) {
//         console.error('Error fetching or parsing data:', error);
//     }
// }
// document.getElementById('searchForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get the value entered by the user
//     const searchInput = document.getElementById('searchInput').value.trim();

//     // Call displayAirports function with the search query
//     if (searchInput !== '') {
//         places(searchInput);
//     } else {
//         console.error('Please enter a valid airport name.');
//     }
// });
// //}