chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'openBraflix') {
        const braflixUrl = 'https://www.braflix.gd/search';

        // Open the new tab
        chrome.tabs.create({ url: braflixUrl }, (tab) => {
            // Wait for the tab to load
            chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
                if (updatedTabId === tab.id && changeInfo.status === 'complete') {
                    // Remove the listener once the tab is loaded
                    chrome.tabs.onUpdated.removeListener(listener);

                    // Inject a script to fill the input field
                    chrome.scripting.executeScript({
                        target: { tabId: updatedTabId },
                        func: (title) => {
                            const searchInput = document.querySelector('#SearchInput');
                            if (searchInput) {
                                searchInput.value = title;
                                searchInput.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                            } else {
                                console.log('Search input not found.');
                            }
                        },
                        args: [request.title], // Pass the title as an argument
                    });
                }
            });
        });
    }
});
