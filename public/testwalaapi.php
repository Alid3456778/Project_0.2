<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://booking-com.p.rapidapi.com/v1/static/cities?country=it&page=0",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"x-rapidapi-host: booking-com.p.rapidapi.com",
		"x-rapidapi-key: f5f364618emshf55af185328edccp189e4fjsna10fb674d29f"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}