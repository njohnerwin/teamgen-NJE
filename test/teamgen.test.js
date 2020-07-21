/* 
Tests needed:

test getName() to make sure it returns a name
test getID() to make sure it returns the proper ID
test getEmail() to make sure it returns the correct email address
test getRole() on all four role types
test getGithub() on both engineers and non-engineers
test getSchool() on both interns and non-interns
*/
const Employee = require("../roles/employee");
const Engineer = require("../roles/engineer");
const Intern = require("../roles/intern");
const Manager = require("../roles/manager");

describe("Employee", () => {
  describe("getName() method", () => {
    it ("should return the name string 'Xemnas' when called", () => {
      const obj = new Employee("Braig");

      expect(obj.getName()).toEqual("Braig");
    });
  });
  describe("getID() method", () => {
    it ("should return the ID integer 3 when called", () => {
      const obj = new Employee("Dilan", 3);

      expect(obj.getID()).toEqual(3);
    });
  });
  describe("getEmail() method", () => {
    it ("should return the email string 'ansem@XIIImail.com' when called", () => {
      const obj = new Employee("Xehanort", 1, "ansem@XIIImail.com");

      expect(obj.getEmail()).toEqual("ansem@XIIImail.com");
    });
  });
  describe("getRole() method", () => {
    it ("should return the role string 'employee' when called", () => {
      const obj = new Employee();

      expect(obj.getRole()).toEqual("employee");
    });
  });
});

describe("Manager", () => {
  describe("Employee inheritance", () => {
    it ("should pass all the tests posed to Employee constructor", () => {
      const obj = new Manager("Xehanort", 1, "ansem@XIIImail.com");
      let check = false;
      if (obj.getName() === "Xehanort" && obj.getID() === 1 && obj.getEmail() === "ansem@XIIImail.com") {
        check = true;
      }
      expect(check).toEqual(true);
    });
  });
  describe("getRole() method", () => {
    it ("should return the role string 'manager' when called", () => {
      const obj = new Manager();

      expect(obj.getRole()).toEqual("manager");
    });
  });
  describe("Office Number", () => {
    it ("should return office number integer 13 when called", () => {
      const obj = new Manager("Ansem", 0, "diz@DTDmail.com", 13);

      expect(obj.office).toEqual(13);
    });
  });
});

describe("Engineer", () => {
  describe("Employee inheritance", () => {
    it ("should pass all the tests posed to Employee constructor", () => {
      const obj = new Engineer("Xehanort", 1, "ansem@XIIImail.com");
      let check = false;
      if (obj.getName() === "Xehanort" && obj.getID() === 1 && obj.getEmail() === "ansem@XIIImail.com") {
        check = true;
      }
      expect(check).toEqual(true);
    });
  });
  describe("getRole() method", () => {
    it ("should return the role string 'engineer' when called", () => {
      const obj = new Engineer();
  
      expect(obj.getRole()).toEqual("engineer");
    });
  });
  describe("getGithub() method", () => {
    it ("should return the github username string 'memorizd' when called", () => {
      const obj = new Engineer("Lea", 8, "axelrose@XIIImail.com", "memorizd");  
    
      expect(obj.getGithub()).toEqual("memorizd");
    });
  });
});

describe("Intern", () => {
  describe("Employee inheritance", () => {
    it ("should pass all the tests posed to Employee constructor", () => {
      const obj = new Intern("Xehanort", 1, "ansem@XIIImail.com");
      let check = false;
      if (obj.getName() === "Xehanort" && obj.getID() === 1 && obj.getEmail() === "ansem@XIIImail.com") {
        check = true;
      }
      expect(check).toEqual(true);
    });
  });
  describe("getRole() method", () => {
    it ("should return the role string 'intern' when called", () => {
      const obj = new Intern();

      expect(obj.getRole()).toEqual("intern");
    });
  });
  describe("getSchool() method", () => {
    it ("should return the school name string 'Castle Oblivion' when called", () => {
      const obj = new Intern("Ienzo", 6, "bookworm@XIIImail.com", "Castle Oblivion");  
    
      expect(obj.getSchool()).toEqual("Castle Oblivion");
    });
  });
});