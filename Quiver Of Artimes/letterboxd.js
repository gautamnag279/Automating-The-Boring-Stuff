// Wait for the page to fully load to ensure elements are available
window.onload = function () {
  // Create a new link element for the stylesheet
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL('styles.css'); // Get the URL for the CSS file

  // Append the link to the head of the document
  document.head.appendChild(link);

  // Create a new section for "Watch Now"
  const watchNowSection = document.createElement('div');
  watchNowSection.classList.add('watch-now-section'); // Add class for styling

  // Add title to the section
  const watchNowTitle = document.createElement('h3');
  watchNowTitle.innerText = 'Watch Now';
  watchNowSection.appendChild(watchNowTitle);

  // Get the movie title from the page
  const titleElement = document.querySelector('.headline-1');
  const releaseyear = document.querySelector('.releaseyear');

  const pageTitle = titleElement ? titleElement.innerText.trim() : null;
  const dateReleased = releaseyear.innerText.trim();

  // Create the button element
  const searchButton = document.createElement('button');
  searchButton.innerText = `${pageTitle} (${dateReleased})`;

  // Add event listener to the button to search Braflix when clicked
  searchButton.addEventListener('click', function () {
    // Send a message to the background script
    chrome.runtime.sendMessage({ action: 'openBraflix', title: pageTitle });
  });

  // Append the button to the "Watch Now" section
  watchNowSection.appendChild(searchButton);

  // Find the div element to insert the "Watch Now" section below
  const reviewDiv = document.querySelector('.review.body-text.-prose.-hero.prettify');
  reviewDiv.insertAdjacentElement('afterend', watchNowSection);
};
