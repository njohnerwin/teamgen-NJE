const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, ID, email, github) {
    super(name, ID, email);
    this.role = "engineer"
    this.github = github;
    this.getGithub = function() {
      return this.github;
    }
  }
}

module.exports = Engineer;