// JavaScript logic for the Tech Shop Challenge

const bankBalance = document.getElementById('bank-balance');
const loanMoney = document.getElementById('loan-money');
const getLoanButton = document.getElementById('get-loan-btn');
const repayLoanButton = document.getElementById('repay-loan-btn');
const workButton = document.getElementById('work-btn');
const bankButton = document.getElementById('bank-btn');
const laptopSelect = document.getElementById('laptop-select');
const laptopInfo = document.getElementById('laptop-info');
const laptopName = document.getElementById('laptop-name');
const laptopDescription = document.getElementById('laptop-description');
const butNowButton = document.getElementById('but-now-btn');

let currentBankBalance = 0;
const currentPay = 100;
let currentLoan = 0;