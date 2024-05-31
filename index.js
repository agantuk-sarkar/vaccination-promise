const form = document.querySelector(".myForm");
const name = document.getElementById("name");

const registrationQueue = ["Mohan", "Raju", "Rohan", "Komal"];

let vaccineCount = 4;
// console.log(vaccineCount);

form.addEventListener("submit", registerUser);

function registerUser(event) {
  event.preventDefault();

  let tempName = null;

  // check if name input field is valid or not
  if (name.value) {
    const message = `Hi ${name.value}, your registration is successful`;
    alert(message);
    registrationQueue.push(name.value);
    tempName = name.value;
    name.value = "";
  } else {
    alert("Please enter your name");
  }
  // console.log(registrationQueue);

  // using promise to check the queue
  let vaccinePromise = new Promise(function (resolve, reject) {
    let id = setInterval(function () {
      if (registrationQueue[0] === tempName) {
        resolve(`Hi ${tempName}, its your turn now`);
        vaccineCount--;
        console.log("vaccineCount:", vaccineCount);

        clearInterval(id);
      }

      if (vaccineCount <= 0) {
        reject("Vaccine out of stock, visit tomorrow");
      }
    }, 2000);
  });

  // consuming promise object
  vaccinePromise
    .then(function (response) {
      console.log(response);
    })
    .catch(function (rejectionMessage) {
      alert(rejectionMessage);
    });
//   console.log("VaccinePromise", vaccinePromise);
}

// using callback function in setInterval
let intervalId = setInterval(startVaccination, 2000);

let peopleCount = document.querySelector(".peopleCount");

// function to remove elements from array whose vaccination is completed
function startVaccination() {
  if (registrationQueue.length === 0) {
    clearInterval(intervalId);
  } else {
    registrationQueue.shift();
    peopleCount.textContent = registrationQueue.length;
  }
//   console.log("Users:", registrationQueue);
}
