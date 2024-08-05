document.addEventListener('DOMContentLoaded', () => {
    // Initialize account balance and transactions if not set
    if (!localStorage.getItem('accountBalance')) {
        localStorage.setItem('accountBalance', 1000); // Initial balance
    }
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify([])); // Initialize empty transactions
    }

    // Function to update the balance display
    const updateBalanceDisplay = () => {
        const balanceElement = document.getElementById('account-balance');
        if (balanceElement) {
            balanceElement.textContent = `Account Balance: $${localStorage.getItem('accountBalance')}`;
        }
    };

    // Function to update the transactions display
    const updateTransactionsDisplay = () => {
        const transactionsList = document.getElementById('transactions-list');
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        if (transactionsList) {
            transactionsList.innerHTML = '';
            transactions.forEach(transaction => {
                const li = document.createElement('li');
                li.textContent = transaction;
                transactionsList.appendChild(li);
            });
        }
    };

    // Update balance and transactions on page load
    updateBalanceDisplay();
    updateTransactionsDisplay();

    // Sign In Form Submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = '2fa.html';
        });
    }

    // 2FA Form Submission
    const twoFaForm = document.getElementById('2fa-form');
    if (twoFaForm) {
        twoFaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = 'HomePage.html';
        });
    }

    // Send Money Form Submission
    const sendMoneyForm = document.getElementById('send-money-form');
if (sendMoneyForm) {
    sendMoneyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('send-amount').value);
        let balance = parseFloat(localStorage.getItem('accountBalance'));

        if (amount > 100000) {
            alert('The transaction amount is above $100,000 and is highly suspicious. Please provide a reason.');
            const reason = prompt('Enter the reason for this transaction:');
            if (reason) {
                alert('Thank You! The request will be sent back to the team for further processing.');
                window.location.href = 'HomePage.html'; // Redirect to HomePage
                return; // Exit the function to prevent further processing
            }
        }

        if (amount > balance) {
            alert('Insufficient funds.');
            return;
        }

        balance -= amount;
        localStorage.setItem('accountBalance', balance);

        // Record transaction
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.unshift(`Sent $${amount}`);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        alert('Send successful');
        updateBalanceDisplay();
        updateTransactionsDisplay();
        window.location.href = 'HomePage.html';
    });
}

    // Send Money Overseas Form Submission
    const sendOverseasForm = document.getElementById('send-overseas-form');
    if (sendOverseasForm) {
        sendOverseasForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const amount = parseFloat(document.getElementById('send-overseas-amount').value);
            let balance = parseFloat(localStorage.getItem('accountBalance'));

            if (amount > 100000) {
                alert('The transaction amount is above $100,000 and is highly suspicious. Please provide a reason.');
                const reason = prompt('Enter the reason for this transaction:');
                if (reason) {
                    alert('Transaction verified successfully.');
                }
            }

            if (amount > balance) {
                alert('Insufficient funds.');
                return;
            }

            balance -= amount;
            localStorage.setItem('accountBalance', balance);

            // Record transaction
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.unshift(`Sent $${amount} overseas`);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            alert('Send successful');
            updateBalanceDisplay();
            updateTransactionsDisplay();
            window.location.href = 'HomePage.html';
        });
    }

    // Top Up Form Submission
    const topupForm = document.getElementById('topup-form');
    if (topupForm) {
        topupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const amount = parseFloat(document.getElementById('topup-amount').value);
            let balance = parseFloat(localStorage.getItem('accountBalance'));

            balance += amount;
            localStorage.setItem('accountBalance', balance);

            // Record transaction
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.unshift(`Top up $${amount}`);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            alert('Top up successful');
            updateBalanceDisplay();
            updateTransactionsDisplay();
            window.location.href = 'HomePage.html';
        });
    }

    // Navigation Buttons on Home Page
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            window.location.href = 'sendMoney.html';
        });
    }

    const topupButton = document.getElementById('top-up-button');
    if (topupButton) {
        topupButton.addEventListener('click', () => {
            window.location.href = 'TopUp.html';
        });
    }

    const sendOverseasButton = document.getElementById('send-overseas-button');
    if (sendOverseasButton) {
        sendOverseasButton.addEventListener('click', () => {
            window.location.href = 'sendOverseas.html';
        });
    }

    // Forgot Password Link on Sign In Page
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'ForgotPassword.html';
        });
    }
});

/*chatbot*/
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    const responses = {
        "hi": "Hello! How can I assist you today?",
        "hello": "Hi there! What can I do for you?",
        "how are you": "I'm just a bot, but I'm here to help!",
        "what is your name": "I'm your friendly chatbot. How can I help you?",
        "thank you": "You're welcome! Is there anything else you need?",
        "bye": "Goodbye! Have a great day!",
        "Can i send more than $100,000?": "Yes, you can but we will have need know more about the details of the transaction first before the transaction can be successfull.",
        "default": "I'm sorry, I don't understand that. Can you please rephrase?"
    };

    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotIcon.style.display = 'none';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });

    chatbotSend.addEventListener('click', () => {
        const userMessage = chatbotInput.value.trim().toLowerCase();
        if (userMessage) {
            addMessageToChat('You', userMessage);
            chatbotInput.value = '';
            // Get chatbot response
            const botResponse = responses[userMessage] || responses["default"];
            setTimeout(() => {
                addMessageToChat('Chatbot', botResponse);
            }, 1000);
        }
    });

    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            chatbotSend.click();
        }
    });

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${sender}: ${message}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});