const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  for  (let i = 0; i < employee.length; i++) {
    if (employee[i].id === id) { 
      employee.splice(i, 1);
      res.status(200).json({ message: 'Deleted Successfully' });
      return;
    }
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmployee = {id: req.body.id, name: req.body.name};

  // Check if the ID already exists
  const existingEmployee = employee.find(employee => employee.id === newEmployee.id);
  if (existingEmployee) {
    return res.status(400).json({ error: 'Employee ID already exists' });
  }

  // If ID doesn't exist, add the new employee
  employee.push(newEmployee);
};

