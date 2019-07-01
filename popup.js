'use strict';

let changeQuote = document.getElementById('changeQuote');
let quoteBox = document.getElementById('quote');

function randomNumber(max) {
  return Math.floor(Math.random(0) * Math.floor(max));
}

function renderQuote(quoteBox, quote, author) {
  quoteBox.innerHTML = `<h1 class="quote">${quote}</h1> <p class="author">${author}</p>`;
}

function getNewRandomQuote(quoteBox, result) {
  let randomIndex = randomNumber(result.quotes.quotes.length);
  let { quote, author } = result.quotes.quotes[randomIndex];
  renderQuote(quoteBox, quote, author);
  chrome.storage.local.set({
    quoteIndex: randomIndex,
  });
}

chrome.storage.local.get(['quotes'], function(result) {
  chrome.storage.local.get(['quoteIndex'], function(quoteIndex) {
    console.log(result, quoteIndex);
    let { quote, author } = result.quotes.quotes[quoteIndex.quoteIndex];
    renderQuote(quoteBox, quote, author);
  });
});

changeQuote.onclick = function() {
  chrome.storage.local.get(['quotes'], function(result) {
    getNewRandomQuote(quoteBox, result);
  });
  window.scrollTo(0, 0);
  changeQuote.blur();
};
