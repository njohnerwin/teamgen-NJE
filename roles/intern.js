const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, ID, email, school) {
    super(name, ID, email);
    this.role = "intern";
    this.school = school;
    this.getSchool = function() {
      return this.school;
    }
  }
}

module.exports = Intern;