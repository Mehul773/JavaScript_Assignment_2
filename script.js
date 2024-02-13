// Array to store employee details
let employees = [];

document
  .getElementById("employeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form inputs
    let employeeId = document.getElementById("employeeId").value;
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let designation = document.getElementById("designation").value;

    // Check if employee ID already exists
    if (employees.some((emp) => emp.employeeId === employeeId)) {
      alert("Employee ID must be unique.");
      return;
    }

    // Add employee details to the array
    employees.push({ employeeId, name, address, designation });

    // Update the table to display the new employee
    displayEmployees();

    // Reset the form fields
    document.getElementById("employeeForm").reset();
  });

// Display employees in the table
function displayEmployees() {
  let tableBody = document.querySelector("#employeeTable tbody");
  tableBody.innerHTML = "";

  // Loop through each employee and create table rows
  employees.forEach((employee) => {
    let row = tableBody.insertRow();

    // Insert cells for employee details
    row.insertCell().textContent = employee.employeeId;
    row.insertCell().textContent = employee.name;
    row.insertCell().textContent = employee.address;
    row.insertCell().textContent = employee.designation;

    // Insert cells for edit and delete buttons
    let actionsCell = row.insertCell();
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "button button-edit";
    editButton.addEventListener("click", function () {
      editEmployee(employee);
    });
    actionsCell.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "button button-delete";
    deleteButton.addEventListener("click", function () {
      deleteEmployee(employee);
    });
    actionsCell.appendChild(deleteButton);
  });
}

// Function to edit employee details
function editEmployee(employee) {
  let newName = prompt("Enter new name:", employee.name);
  if (newName === null) return;

  let newAddress = prompt("Enter new address:", employee.address);
  if (newAddress === null) return;

  let newDesignation = prompt("Enter new designation:", employee.designation);
  if (newDesignation === null) return;

  // Update employee details
  employee.name = newName;
  employee.address = newAddress;
  employee.designation = newDesignation;

  // Update the table to reflect the changes
  displayEmployees();
}

// Function to delete an employee
function deleteEmployee(employee) {
  let confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    // Remove the employee from the array
    employees = employees.filter((emp) => emp !== employee);

    // Update the table to reflect the changes
    displayEmployees();
  }
}
