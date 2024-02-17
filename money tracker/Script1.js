let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountDisplay = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (!category || !amount || isNaN(amount) || !date) {
        alert('Please fill in all fields.');
        return;
    }

    expenses.push({ category, amount, date });
    totalAmount += amount;

    // Clear the input fields
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';

    // Update the UI to show the new expense and total amount
    updateUI();
});

function updateUI() {
    // Remove existing table rows
    expenseTableBody.innerHTML = '';

    // Add new table rows for each expense
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>${expense.date}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
        expenseTableBody.appendChild(row);
    });

    // Update the total amount display
    totalAmountDisplay.textContent = `Total Amount: $${totalAmount}`;

    // Add event listeners for delete buttons
    const deleteBtns = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            expenses.splice(index, 1);
            totalAmount -= expenses[index].amount;
            updateUI();
        });
    }
}