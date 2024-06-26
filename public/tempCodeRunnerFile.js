const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://agoda-com.p.rapidapi.com/hotels/auto-complete?query=New%20York');
xhr.setRequestHeader('x-rapidapi-key', 'f5f364618emshf55af185328edccp189e4fjsna10fb674d29f');
xhr.setRequestHeader('x-rapidapi-host', 'agoda-com.p.rapidapi.com');

xhr.send(data);