/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "8a7e82e36ec4c18d6f49916ce52b0131";
const myForm = document.getElementById("myForm");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const generate = document.getElementById("generate");

//chains all the promises together
generate.addEventListener("click", function (e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getData(url,zip,apiKey).then(function(data){
      postData("/sendData",{date: newDate,content:content,temp:data.main.temp});
  }).then(function(){
      //update the ui with the data recieved
  })
  myForm.reset(); 
});

//get data from api
const getData = async function (url, zip, apiKey) {
  const res = fetch(`${url}?q=${zip}&appid=${apiKey}`);
  try {
    const jsonData = await res.json();
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
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    })
  });

  try{
      const newData = await res.json();
      return newData;

  } catch(exception){
      console.log("error",exception);
  }
};
