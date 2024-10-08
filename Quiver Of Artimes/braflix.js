chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'populateSearchInput') {
        chrome.storage.local.get('pageTitle', function (data) {
            console.log('Retrieved page title:', data.pageTitle); // Log the retrieved title
            const searchInput = document.querySelector('#SearchInput');
            if (searchInput) {
                searchInput.value = data.pageTitle || ''; // Use the stored page title
                searchInput.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                console.log('Search input populated with:', data.pageTitle);
            } else {
                console.log('Search input not found.');
            }
        });
    }
});