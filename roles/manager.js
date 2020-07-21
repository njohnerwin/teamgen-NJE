const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, ID, email, office) {
    super(name, ID, email);
    this.role = "manager"
    this.office = office;
  }
}

module.exports = Manager;