// BANK SECTION
const bankBalance = document.getElementById('bank-balance');
const loanMoney = document.getElementById('loan-money');
const getLoanButton = document.getElementById('get-loan-btn');

let currentBankBalance = 0;
let currentLoan = 0;
let hasLoan = false;

// Get a Loan Button - BANK Section
getLoanButton.addEventListener('click', () => {
    const loanAmount = parseFloat(prompt("Enter loan amount:"));
    if (loanAmount > currentBankBalance * 2) {
        alert("Loan amount exceeds double of your bank balance.");
    } else if (loanAmount < 0) {
        alert("Loan amount must be positive number.");
    } else if (currentLoan > 0) {
        alert("You can't get another loan until you repay the current loan.");
    } 
    else {
        currentLoan = loanAmount;
        hasLoan = true;
        updateLoanUI();
    }
});


// WORK SECTION
const workButton = document.getElementById('work-btn');
const bankButton = document.getElementById('bank-btn');
const repayLoanButton = document.getElementById('repay-loan-btn');
const wage = document.getElementById('wage');

let currentWage = 0;

// Work Button - WORK Section
workButton.addEventListener('click', () => {
    currentWage += 100;
    updateWageUI();
});

// Bank Button - WORK Section
bankButton.addEventListener('click', () => {
    if (hasLoan = true) {
        const loanPayment = currentWage * 0.1;
        if (loanPayment > currentLoan) {
            const remainingFunds = loanPayment - currentLoan;
            currentBankBalance += remainingFunds + currentWage * 0.9;
            currentWage = 0;
            currentLoan = 0;
            hasLoan = false;
            updateLoanUI
        }
        else if (currentLoan < loanPayment) {
            currentBankBalance += currentWage - loanPayment;
            currentLoan = 0;
            hasLoan = false;

        }
        currentWage = 0;
    } else {
        currentBankBalance += currentWage;
        currentWage = 0;
    }
    updateLoanUI();
    updateBankBalanceUI();
    updateWageUI();
});
 
// Repay Loan Button - WORK Section
repayLoanButton.addEventListener('click', () => {    
    if (hasLoan = true) {
        const loanRepayment = currentWage;

         if (loanRepayment >= currentLoan) {
            const remainingFunds = loanRepayment - currentLoan;
            currentBankBalance += remainingFunds;
            currentWage = 0;
            currentLoan = 0;
            hasLoan = false;
            repayLoanButton.style.display = 'none';
        } else {
            currentLoan -= loanRepayment;
            currentWage = 0;
        }

        updateLoanUI();
        updateWageUI();
        updateBankBalanceUI();
    }
});


// LAPTOP SECTION
const laptopSelect = document.getElementById('laptop-select');
const laptopSpecs = document.getElementById('laptop-specs');
const laptopName = document.getElementById('laptop-name');
const laptopDescription = document.getElementById('laptop-description');
const laptopPrice = document.getElementById('laptop-price');
const laptopImage = document.getElementById('laptop-image');
const buyNowButton = document.getElementById('buy-now-btn');

// Fetch laptops data from the API
fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => {
    data.forEach(laptop => {
        const option = document.createElement('option');
        option.value = laptop.id;
        option.text = laptop.title;
        laptopSelect.appendChild(option);
        //buyNowButton.appendChild(option);
    });

    laptopSelect.addEventListener('change', () => {
        const selectedLaptopId = parseInt(laptopSelect.value);
        const selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);

        // Update specs section
        laptopSpecs.innerHTML = selectedLaptop.specs.map(spec => `<li>${spec}</li>`).join('');
        
        // Image Path
        const imagePath = `https://hickory-quilled-actress.glitch.me/${selectedLaptop.image}`;
        
        // Update info section
        laptopImage.setAttribute("src", imagePath);
        laptopImage.alt = selectedLaptop.title;
        laptopName.textContent = selectedLaptop.title;
        laptopDescription.textContent = selectedLaptop.description;
        laptopPrice.textContent = `Price: ${selectedLaptop.price.toFixed(2)} DKK`;
        buyNowButton.disabled = false;
        });

        // Buy Now Button - LAPTOP Section
        buyNowButton.addEventListener('click', () => {
            const selectedLaptopId = parseInt(laptopSelect.value);
            const selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);
            let selectedLaptopPrice = parseFloat(selectedLaptop.price);
            let laptopName = selectedLaptop.title;

            if (selectedLaptopPrice <= currentBankBalance) {
                currentBankBalance -= selectedLaptopPrice;
                updateBankBalanceUI();
                alert(`Congratulations! You are now the owner of ${laptopName}.`);
            } else {
                alert(`You cannot afford the laptop ${laptopName}.`);
            }
        });
    });


// UI Update Functions
function updateBankBalanceUI() {
    bankBalance.textContent = `Balance: ${currentBankBalance.toFixed(2)} DKK.`;
}
function updateLoanUI() {
    loanMoney.textContent = `Loan Money: ${currentLoan.toFixed(2)} DKK.`;
    repayLoanButton.style.display = currentLoan > 0 ? 'block' : 'none';
}
function updateWageUI() {
    wage.textContent = `Wage: ${currentWage.toFixed(2)} DKK.`;
}

// Initial UI Updates
updateLoanUI();
updateBankBalanceUI();
updateWageUI();