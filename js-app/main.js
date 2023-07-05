const url = "https://localhost:5001/api/beanvariety/";

// html elements - button 
const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            displayBeanVarieties(beanVarieties);
        })
});

// html elements - form 
const form = document.querySelector("#bean-form"); // select the form element
form.addEventListener("submit", event => { // add event listener to the form element
    event.preventDefault(); // prevent the default behavior of the form element

    // create a new object with the user input
    const newVariety = {
        name: document.querySelector("#name").value,
        region: document.querySelector("#region").value,
        notes: document.querySelector("#notes").value
    };

    addBeanVariety(newVariety) // add the new object to the database
        .then(() => getAllBeanVarieties()) // get all the bean varieties from the database
        .then(beanVarieties => displayBeanVarieties(beanVarieties)); // display the bean varieties on the DOM
});

function addBeanVariety(beanVariety) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
},
        body: JSON.stringify(beanVariety)
    }).then(resp => resp.json());
}

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

// display the bean varieties on the DOM
function displayBeanVarieties(beanVarieties) {
    const varietiesContainer = document.querySelector("#bean-varieties");
    varietiesContainer.innerHTML = ''; 
    beanVarieties.forEach(variety => {
        const varietyElement = document.createElement("p");
        varietyElement.textContent = `Name: ${variety.name}, Region: ${variety.region}, Notes: ${variety.notes}`;
        varietiesContainer.appendChild(varietyElement);
    });
}

