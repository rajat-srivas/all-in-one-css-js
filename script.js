const quote = document.getElementById('quote');
const author = document.getElementById('author');
const text = document.getElementById('text');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



function loading() {
    loader.hidden = false;
    quote.hidden = true;
}

function complete() {

    if (!loader.hidden) {
        loader.hidden = true;
        quote.hidden = false;
    }

}



//Get quote from API

async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            author.innerText = 'Unknown';
        } else {
            author.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            text.classList.toggle('quote__long')
        }
        text.innerText = data.quoteText;
        complete();
    } catch (error) {
        complete();
        console.log('Snap!! No Quote,', error);
    }
}

function tweetQuote() {
    const quoteText = encodeURIComponent(text.innerText);
    const authorText = encodeURIComponent(author.innerText);
    console.log(quoteText);
    console.log(authorText);


    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//on load

getQuote();