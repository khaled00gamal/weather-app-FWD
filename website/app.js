/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/forecast";
const apiKey = "3bd9f680f6258199604fcb6f2c009227";
const myForm = document.getElementById("myForm");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + "/" + d.getDate() + "/" + d.getFullYear();

const generate = document.getElementById("generate");

//chains all the promises together
generate.addEventListener("click", function (e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getData(url, zip, apiKey)
    .then(function (data) {
      postData("/sendData", {
        date: newDate, 
        content: content,
        temp: data.list[0].main.temp,
      });
    })
    .then(function () {
      //update the ui with the data recieved
      updateUI();
    });
  myForm.reset();
});

//get data from api
const getData = async function (url, zip, apiKey) {
  const res = await fetch(`${url}?zip=${zip}&appid=${apiKey}&units=metric`);
  try {
    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData;
  } catch (exception) {
    console.log("error", exception);
  }
};

//post new data
const postData = async function (url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (exception) {
    console.log("error", exception);
  }
}

const isValid = function (data) {
  if (data !== undefined) {
    return true;
  }
};


  const updateUI = async function () {
    const req = await fetch("/getData");
    try {
      const jsonData = await req.json();
      if (
        isValid(jsonData.date) &&
        isValid(jsonData.content) &&
        isValid(jsonData.temp)
      ) {
        document.getElementById("date").innerHTML = `date is ${jsonData.date}`;
        document.getElementById("content").innerHTML = `feeling ${jsonData.content}`;
        document.getElementById("temp").innerHTML = `temperature is ${jsonData.temp} Celsius` ;
      }
      
    } catch (exception) {
      console.log("error", exception);
    }
  };

