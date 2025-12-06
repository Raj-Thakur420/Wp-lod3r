chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request);
    if (request.messages && request.speed && request.haterName) {
        sendMessages(request.messages, request.speed, request.haterName);
    }
});

function sendMessages(messages, speed, haterName) {
    let index = 0;

    function sendNextMessage() {
        if (messages.length > 0) {
            // Prepend the hater's name to the message
            const messageWithHaterName = `${haterName}: ${messages[index]}`;
            console.log("Sending message:", messageWithHaterName);

            const inputBox = document.querySelector('[contenteditable="true"]');
            if (inputBox) {
                inputBox.focus();
                document.execCommand("selectAll", false, null);
                document.execCommand("delete", false, null);
                document.execCommand("insertText", false, messageWithHaterName);

                // Simulating Enter key press to send the message
                const event = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true
                });
                inputBox.dispatchEvent(event);

                console.log("Message sent successfully:", messageWithHaterName);

                index++;
                // Reset index to 0 if it reaches the length of messages
                if (index >= messages.length) {
                    index = 0; // Loop back to the first message
                }
                setTimeout(sendNextMessage, speed);
            } else {
                console.log("Messenger chat input box not found.");
            }
        }
    }

    sendNextMessage();
}
