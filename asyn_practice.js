// const response = await fetch("https://jsonplaceholder.typicode.com/users");
// const users = await response.json();
// console.log(users);

// Fetch Data from API in JavaScript:
const url = "https://jsonplaceholder.typicode.com/users";
/*
using promise :

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log("User :", data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
  */

// using async/await :

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");

    }
    const data = await response.json();
    console.log("User Data:", data);

  } catch (error){
    console.error("Fetch errors:",error);
  }

  }
fetchData();
