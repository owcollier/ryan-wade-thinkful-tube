'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const STORE = {
  results:[],
  totalResults:0,
  resultsPerPage:0
};

// Get data function 

function getDataFromYoutube (input, callback) {
  // retrieve data per search keyword from YouTube API
  // store this data in RESULTS
  const query = {
    part: 'snippet',
    key:'AIzaSyBr8npNjm8kJH-V-hQXMov4DOLtA3RK3oQ',
    q: `${input}`,
    maxResults: 5,
  };
  $.getJSON(YOUTUBE_SEARCH_URL,query,callback);
}

//transfer to STORE fuction

function transferApiDataToSTORE(data){
  STORE.results.push(data.items);
  console.log(STORE);
  renderSearchResults();
}

// Generator function

function generateResults (index) {
  // pull search results data object(s) from RESULTS
  // plug into HTML template
  let thumbnailURL = index.snippet.thumbnails.high.url;
  let resultChannel = index.snippet.channelTitle;
  let resultTitle = index.snippet.title;
  let resultDesc = index.snippet.description;
  return `
  <div>
    <h3>${resultTitle}</h3>
    <img class="thumbnail" src="${thumbnailURL}">
    <p>${resultDesc}</p>
    <h4>by: ${resultChannel}</h4>
  </div>
`;
}

// Render to DOM function

function renderSearchResults () {
  // Call generator function, grab returned html string
  // render to DOM
  console.log('sr', STORE.results);
  let results = STORE.results[0].map(function(val) {
    return generateResults(val);
  }).join('');
  // let results = [];
  // for(let i=0; i<STORE.results[0].length; i++){
  //   let resultHTML = generateResults(STORE.results[0][i]);
  //   results.push(resultHTML);
  $('.js-search-results').html(results);
}

// Event handler function for form submit

function handleUserSubmit () {
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    STORE.results.splice(0, STORE.results.length);
    let queryTarget = $(event.currentTarget).find('.js-query');
    let searchTerm = queryTarget.val();
    // clear the input
    console.log(searchTerm);
    queryTarget.val('');
    getDataFromYoutube(searchTerm, transferApiDataToSTORE);
    
  });
}

// DOM Ready handle function

function main(){
  handleUserSubmit();

}

$(main);