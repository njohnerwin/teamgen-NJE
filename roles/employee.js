function Employee(name, ID, email) {
  this.name = name;
  this.ID = ID;
  this.email = email;
  this.role = "employee";
  
  this.getName = function() {
    return this.name;
  }

  this.getID = function() {
    return this.ID;
  }

  this.getEmail = function() {
    return this.email;
  }

  this.getRole = function() {
    return this.role;
  }
}

module.exports = Employee;