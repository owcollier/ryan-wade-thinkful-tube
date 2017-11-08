'use strict';

const RESULTS = ['daisy',27,'gopher'];

// Get data function 

function getDataFromYoutube () {
  // retrieve data per search keyword from YouTube API
  // store this data in RESULTS
}

// Generator function

function generateResults () {
  // pull search results data object(s) from RESULTS
  // plug into HTML template
}


// Render to DOM function

function renderSearchResults () {
  // Call generator function, grab returned html string
  // render to DOM
}

// Event handler function for form submit

function handleUserSubmit () {
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    RESULTS.splice(0, RESULTS.length);
    let queryTarget = $(event.currentTarget).find('.js-query')
    let query = queryTarget.val();
    // clear the input
    console.log(query);
    queryTarget.val('');
  });
}

// DOM Ready handle function

$(handleUserSubmit);