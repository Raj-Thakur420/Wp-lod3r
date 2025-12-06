document.getElementById('sendBtn').addEventListener('click', function() {
    const messages = document.getElementById('messageText').value.trim().split("\n").filter(msg => msg.trim() !== "");
    const speed = parseInt(document.getElementById('speed').value, 10) * 1000;
    const haterName = document.getElementById('HatersName').value.trim();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content_script.js"]
        }, () => {
            chrome.tabs.sendMessage(tabs[0].id, { messages: messages, speed: speed, haterName: haterName });
        });
    });
});

// Event listener for the stop button
document.getElementById('stopBtn').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { stop: true }); // Send a stop message to the content script
    });
});
