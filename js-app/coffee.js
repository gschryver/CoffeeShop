const baseUrl = 'https://localhost:5001/api/coffee';

document.getElementById('create-form').addEventListener('submit', createCoffee);
document.getElementById('update-form').addEventListener('submit', updateCoffee);
document.getElementById('delete-form').addEventListener('submit', deleteCoffee);
document.getElementById('get-all').addEventListener('click', getAllCoffees);

async function createCoffee(event) {
    event.preventDefault();

    const title = document.getElementById('create-title').value;
    const beanVarietyId = document.getElementById('create-beanVarietyId').value;
    const region = document.getElementById('create-region').value;
    const notes = document.getElementById('create-notes').value;
    const beanVarietyName = document.getElementById('create-beanVarietyName').value;
    const beanVariety = {
        Id: beanVarietyId,
        Title: title,
        Region: region,
        Notes: notes,
        Name: beanVarietyName
    };

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, beanVarietyId, beanVariety })
    });

    if (response.ok) {
        document.getElementById('create-form').reset();
        getAllCoffees();
    }
}


async function updateCoffee(event) {
    event.preventDefault();

    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const beanVarietyId = document.getElementById('update-beanVarietyId').value;
    const region = document.getElementById('update-region').value;
    const notes = document.getElementById('update-notes').value;
    const beanVarietyName = document.getElementById('update-beanVarietyName').value;

    const beanVariety = {
        Id: beanVarietyId,
        Title: title,
        Region: region,
        Notes: notes,
        Name: beanVarietyName
    };

    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, beanVarietyId, beanVariety })
    });

    if (response.ok) {
        document.getElementById('update-form').reset();
        getAllCoffees();
    }
}


async function deleteCoffee(event) {
    event.preventDefault();

    const id = document.getElementById('delete-id').value;

    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.getElementById('delete-form').reset();
        getAllCoffees();
    }
}

async function getAllCoffees() {
    const response = await fetch(baseUrl);
    const coffees = await response.json();

    const coffeeList = document.getElementById('coffee-list');
    coffeeList.innerHTML = ''; // Clear the list before adding updated items

    coffees.forEach(coffee => {
        const coffeeItem = document.createElement('div');
        coffeeItem.textContent = `Id: ${ coffee.id }, Title: ${ coffee.title }, Bean Variety Id: ${ coffee.beanVarietyId } `;
        coffeeList.appendChild(coffeeItem);
    });
}

getAllCoffees();
