window.onload = function () {
    // Create a new link element for the stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('styles.css');

    // Append the link to the head of the document
    document.head.appendChild(link);

    // Create a new section for "Watch Now"
    const watchNowSection = document.createElement('div');
    watchNowSection.classList.add('watch-now-section');

    // Add title to the section
    const watchNowTitle = document.createElement('h3');
    watchNowTitle.innerText = 'Watch Now';
    watchNowSection.appendChild(watchNowTitle);

    // Get the movie title and release year from IMDb page
    const titleElement = document.querySelector('.hero__primary-text'); // Class for the title on IMDb
    const pageTitle = titleElement ? titleElement.innerText.trim() : null;

    // Create the button element
    const searchButton = document.createElement('button');
    searchButton.innerText = `${pageTitle}`;

    // Add event listener to the button to search Braflix when clicked
    searchButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'openBraflix', title: pageTitle });
    });

    // Append the button to the "Watch Now" section
    watchNowSection.appendChild(searchButton);

    // Insert the "Watch Now" section under the specific div with class 'sc-11817e04-1 bTLZoL'
    const targetDiv = document.querySelector('.sc-11817e04-1.bTLZoL');
    if (targetDiv) {
        targetDiv.insertAdjacentElement('afterend', watchNowSection);
    } else {
        console.error('Target div not found.');
    }
};
