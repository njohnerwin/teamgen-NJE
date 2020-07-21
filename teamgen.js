const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./roles/employee");
const Engineer = require("./roles/engineer");
const Intern = require("./roles/intern");
const Manager = require("./roles/manager");
const { createTranspilingRequire } = require("@jest/transform");

//i is used as the global ID marker for each user, which is eventually displayed on the generated HTML page
let i = 1;

//the team array holds all members after their info is received from the user
let team = [];

console.log("Let's start setting up your team. We'll ask you to input the members one by one, starting with the manager (if there is one.)");
memberCreate(i);

//memberCreate prompts the user to select a role for their next team member, then redirects them to the proper function
function memberCreate(i) {
  console.log(`Team Member ${i}:`);
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What's their role?",
      choices: ["Manager", "Engineer", "Intern", "None of the above"]
    }
  ]).then(function(response) {
    if (response.role === "Manager") {
      createManager();
    }
    else if (response.role === "Intern") {
      createIntern();
    }
    else if (response.role === "Engineer") {
      createEngineer();
    }
    else {
      createEmployee();
    }
  })
}

//creates a new Manager and pushes them to the array
function createManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is this manager's name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their E-mail address?"
    },
    {
      type: "number",
      name: "office",
      message: "What is their office number / room number?"
    },
  ]).then(function(response){
    team.push(new Manager(response.name, i, response.email, response.office));
    continuePrompt();
  });
}

//creates a new Intern and pushes them to the array
function createIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is this intern's name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their E-mail address?"
    },
    {
      type: "input",
      name: "school",
      message: "What school are they from / did they go to?"
    },
  ]).then(function(response){
    team.push(new Intern(response.name, i, response.email, response.school));
    continuePrompt();
  });
}

//creates a new Engineer and pushes them to the array
function createEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is this engineer's name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their E-mail address?"
    },
    {
      type: "input",
      name: "github",
      message: "What is their current GitHub username?"
    },
  ]).then(function(response){
    team.push(new Engineer(response.name, i, response.email, response.github));
    continuePrompt();
  });
}

//if no role is selected, creates an Employee with the generic Employee constructor and pushes them to the array
function createEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is their name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their E-mail address?"
    }
  ]).then(function(response){
    team.push(new Employee(response.name, i, response.email, response.office));
    continuePrompt();
  });
}

//Enables the program to run continuously until the user says to stop. 
//Doing this any other way (or messing with this function) risks triggering an endless loop due to Inquirer's input mechanics.
function continuePrompt() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Add another team member?",
    }
  ]).then(function(response) {
    if (!response.continue) {
      createPage(team);
    }
    else {
      i++;
      memberCreate(i);
    }
  })
}

//Finally, loops through the array and compiles the HTML page according to the user's input
function createPage(team) {
  let newHTML = "";
  for (i in team) {
    if (team[i].role == "manager") {
      newHTML += `
      <div class="card">
        <div class="card-header">
            <h2>${team[i].name}</h2>
            <i class="fas fa-mug-hot"></i><span> Manager</span>
        </div>
        <div class="card-bodder">
            <p><b>ID:</b> ${team[i].ID}</p>
            <p><b>E-mail:</b> <a href="#">${team[i].email}</a></p>
            <p><b>Office Number:</b> ${team[i].office}</p>
        </div>
      </div>
      `
    }
    else if (team[i].role == "engineer") {
      newHTML += `
      <div class="card">
        <div class="card-header">
            <h2>${team[i].name}</h2>
            <i class="fas fa-glasses"></i><span> Engineer</span>
        </div>
        <div class="card-bodder">
            <p><b>ID:</b> ${team[i].ID}</p>
            <p><b>E-mail:</b> <a href="#">${team[i].email}</a></p>
            <p><b>Github:</b> ${team[i].github}</p>
        </div>
      </div>
      `
    }
    else if (team[i].role == "intern") {
      newHTML += `
      <div class="card">
        <div class="card-header">
            <h2>${team[i].name}</h2>
            <i class="fas fa-graduation-cap"></i><span> Intern</span>
        </div>
        <div class="card-bodder">
            <p><b>ID:</b> ${team[i].ID}</p>
            <p><b>E-mail:</b> <a href="#">${team[i].email}</a></p>
            <p><b>School:</b> ${team[i].school}</p>
        </div>
      </div>
      `
    }
    else {
      newHTML += `
      <div class="card">
        <div class="card-header">
            <h2>${team[i].name}</h2>
            <i class="fa fa-black-tie"></i><span> Employee</span>
        </div>
        <div class="card-bodder">
            <p><b>ID:</b> ${team[i].ID}</p>
            <p><b>E-mail:</b> <a href="#">${team[i].email}</a></p>
        </div>
      </div>
      `
    }
  } 

  newHTML += "</div></body></html>";

  //fs copies from a generic template that contains the "first half" of the desired page...
  fs.copyFile("./template.html", "./myteam.html", (err) => {
    if (err) {
      console.log("Error Found: " + err);
    }
    else {
      //then appends the "second half" from newHTML and publishes it.
      fs.appendFile("./myteam.html", newHTML, (err) => {
        if (err) {
          console.log("Error Found: " + err);
        }
        else {
          console.log("Team page successfully created: 'myteam.html'");
        }
      });
    }
  });
  
}