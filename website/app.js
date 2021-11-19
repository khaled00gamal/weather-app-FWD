/* Global Variables */
const url="https://api.openweathermap.org/data/2.5/weather";
const apiKey="8a7e82e36ec4c18d6f49916ce52b0131";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generate = document.getElementById('generate');

generate.addEventListener("click",function(e){
    e.preventDefault();
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;


})


const getData = async function(url,zip,apiKey){
    const res = fetch(`${url}?q=${zip}&appid=${apiKey}`);
    try{
        const jsonData= await res.json();

    }catch(exception){
        console.log("error",exception);
    }
};








