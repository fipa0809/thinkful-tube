var youtube_base_url = "https://www.googleapis.com/youtube/v3/search";
var youtubeURL = "https://www.youtube.com/watch?v=";



function getDataFromApi(searchTerm, callback) {
	var query = {
		part: "snippet",
		key: "AIzaSyCdATUi-cSRUfwS2u_M7ADgrUZntQOUl90",
		q: searchTerm,
		maxResults: 15
	}
	$.getJSON(youtube_base_url, query, callback);
}


function displaySearchData(data) {
	var resultElement = '';
	if (data.items) {
		data.items.forEach(function(item) {
			var searchLink = youtubeURL + item.id.videoId;
			var imageLink = item.snippet.thumbnails.medium.url;
			var thumbnail = '<li><p>' + item.snippet.title + '</p>' +
			 '<a href="' +
			searchLink +
			'" target="_blank"><img class="img-thumbnail" src="' +
			imageLink + '" /></a></li>';
			resultElement += thumbnail;
		});
	}
	else {
		resultElement += '<p>No results</p>';
	}
	$('.js-search-results').html(resultElement);
}


function watchSubmit() {
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, displaySearchData);
	});
}


$(function(){
	watchSubmit();
});