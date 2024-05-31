let card = document.querySelector(".card");
let tbody = document.querySelector("tbody");
let btnAddSubject = document.querySelector(".btn-add-sub");
let gpaClassAlert = document.querySelector("#gpa-class-alert");
let gpaDisplay = document.getElementById("gpa-text");
let gradePointArr = [];
let creditHoursArr = [];
let sumOfTotalCredit = 0;
let earnedPoint = 0;
let CGPA = 0.0;

// subject add function
const subjectAdder = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-sub")) {
    let targetedTbody =
      e.target.parentElement.parentElement.querySelector("tbody");
    // console.log(targetedTbody);
    targetedTbody.append(createSubject(targetedTbody));
  }
};

// createSubject for table
const createSubject = function () {
  let TR = document.createElement("tr");
  TR.innerHTML = `<th><span class="table-index">${
    tbody.children.length + 1
  }</span></th>
                  <td><input type="text" class="form-control" placeholder="Subject Name"></td>
                  <td>
                  <select id="grade" class="custom-select grade-points">
                       <option>Subject Grade</option>
                       <option value="4">A+</option>
                       <option value="3.75">A</option>
                       <option value="3.50">A-</option>
                       <option value="3.25">B+</option>
                       <option value="3.00">B</option>
                       <option value="2.75">B-</option>
                       <option value="2.50">C+</option>
                       <option value="2.25">C</option>
                       <option value="2.00">D</option>
                       <option value="0.00">F</option>
                     </select>
                  </td>
                  <td><input type="text" value="" maxlength="1" class="form-control credits" placeholder="Subject Credits"></td>
                  <td><button type="button" class="btn btn-danger delete">Delete</button></td>`;
  return TR;
};

// index calculator
const indexReturn = function (tbody) {
  tbody.querySelectorAll(".table-index").forEach((firstTD, ind) => {
    firstTD.innerText = ind + 1;
  });
};

// subject adder function define
const addSubject = () => {
  let tr = createSubject();
  tbody.append(tr);
  getAllInputField();
  cgpaCalculation();
};

// card closer function defined
const loadEventlistner = () => {
  tbody.appendChild(createSubject());
  tbody.appendChild(createSubject());
  tbody.appendChild(createSubject());
  btnAddSubject.addEventListener("click", addSubject);
};

loadEventlistner();

// create  two new array
const getAllInputField = () => {
  Array.from(document.querySelectorAll(".table")).forEach((semester) => {
    gradePointArr = Array.from(semester.querySelectorAll(".grade-points"));
    creditHoursArr = Array.from(semester.querySelectorAll(".credits"));
  });
};

// calculate input data
const cgpaCalculation = () => {
  sumOfTotalCredit = 0;
  creditHoursArr.forEach((credit, ind) => {
    earnedPoint +=
      (Number(gradePointArr[ind].value) || 0) * (Number(credit.value) || 0);
    sumOfTotalCredit += Number(credit.value) || 0;
  });
  CGPA = (earnedPoint / sumOfTotalCredit || 0).toFixed(2);
};

// check class depends on cgpa
const classChecker = () => {
  if (CGPA >= 3.0) {
    gpaClassAlert.innerHTML = `You have got <mark class="bg bg-success">First Class</mark>`;
  } else if (CGPA >= 2.25 && CGPA < 3.0) {
    gpaClassAlert.innerHTML = `You have got <mark class="bg bg-warning">Second Class</mark>`;
  } else if (CGPA >= 1.0 && CGPA < 2.25) {
    gpaClassAlert.innerHTML = `You have got <mark class="bg bg-danger">Third Class</mark>`;
  } else {
    gpaClassAlert.innerHTML = `You are <mark class="bg bg-danger">Failed</mark>`;
  }
};

// bind two function
const bindedCalculator = () => {
  sumOfTotalCredit = 0;
  earnedPoint = 0;
  CGPA = 0.0;
  getAllInputField();
  cgpaCalculation();
  console.log(
    `Total-Number = ${earnedPoint} | Total-Credit = ${sumOfTotalCredit} | CGPA = ${CGPA}`
  );
  gpaDisplay.innerText = CGPA;
};

// single subject delete oparation in every semester
card.addEventListener("click", function (e) {
  e.preventDefault();

  let targetedTbodyforDel;
  if (e.target.classList.contains("delete")) {
    targetedTbodyforDel = e.target.parentElement.parentElement.parentElement;
    e.target.parentElement.parentElement.remove();
    bindedCalculator();
    classChecker();
  }
  indexReturn(tbody);
});

//get input data and call cgpaCalculation function and display cgpa

card.addEventListener("input", (e) => {
  e.preventDefault();
  let isGradePointField = e.target.classList.contains("grade-points");
  let isCreditField = e.target.classList.contains("credits");

  if (isGradePointField || isCreditField) {
    console.log(e.target.value, isNaN(e.target.value));
    if (isNaN(e.target.value)) {
      e.target.value = "";
      return;
    }
    bindedCalculator();
    classChecker();
    if (e.target.value) {
      console.log(e.target.value)
      gpaClassAlert.style.opacity = "1";
    } else {
      gpaClassAlert.style.opacity = "0";
    }
  }
});

document.getElementById("printBtn").addEventListener("click", () => {
  // let table = document.getElementById("printTable").innerHTML
  window.print();
});

// Example input values (replace with your actual input data)
// const inputValues = ["value1", "value2", "value3"];

// // Initialize a flag to track whether all inputs are empty
// let allInputsNotEmpty = true;

// // Iterate through each input value using forEach
// inputValues.forEach((inputValue) => {
//   // Check if the trimmed value is empty
//   if (inputValue.trim() === "") {
//     // If any input is empty, set the flag to false
//     allInputsNotEmpty = false;
//   }
// });

// // Display the appropriate message based on the flag
// if (allInputsNotEmpty) {
//   console.log("All input values are not empty. Show the message.");
// } else {
//   console.log("Some input values are empty. Do not show the message.");
// }
