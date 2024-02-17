function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const form = document.getElementById("employeeForm")
form.addEventListener("submit", createEmployee)


// TODO
// add event listener to delete button
const dataTable = document.getElementById('dataTable');
dataTable.addEventListener('click', function(event) {
  if (event.target && event.target.matches('button.btn-danger')) {
    const row = event.target.closest('tr');
    const id = row.querySelector('td:first-child').textContent;
    deleteEmployee(id); // Call the deleteEmployee function with the id of the employee to delete
  }
});

// TODO
function createEmployee (event) {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById("name").value;
  console.log(name)
  const id = document.getElementById( "id" ).value;
  console.log(id);

  const employee = {id: id, name: name};
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to create employee')
    }
    return response.json();
  })
  .then(data => {
    console.log('Employee created: ', data);
  })
  .catch(error => {
    console.error('Error creating  employee: ', error.message);
  })
  fetchEmployees()
}

// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to delete employee')
    }
    console.log('Employee deleted successfuly')
  })
  .catch(error => {
    console.error('Error deleting  employee: ', error.message)
  })

  fetchEmployees()
}

fetchEmployees()