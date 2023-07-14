const URL = "http://localhost:8282/items/";
let items = [];

// Refreshes Item Table
async function refreshTable() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let items = JSON.parse(xhr.responseText);

            let tableBody = document.getElementById("item-table-body");
            tableBody.innerHTML = "";

            items.forEach((newItem) => {
                addItem(newItem);
            });
        }
    };

    xhr.open("GET", URL);
    xhr.send();
}


// Clears various forms on Item page
function clearForm(formId) {
    const form = document.getElementById(formId + "-form");
    form.reset();
}

// Hides various modals after Submitting on Item page
function hideModal(modalId) {
    const modalElement = document.getElementById(modalId + "Modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

// Loads Table on Refresh
document.addEventListener("DOMContentLoaded", () => {
    refreshTable();
});


// Populates Item table
function addItem(newItem) {
    let tr = document.createElement("tr");

    let name = document.createElement("td");
    let units = document.createElement("td");

    let editBtn = document.createElement("td");

    name.innerText = newItem.name;
    units.innerText = newItem.units;

    editBtn.innerHTML = `<button class='btn btn-primary' onclick='openEditModal(${newItem.itemId})'>Edit</button>`;

    tr.appendChild(name);
    tr.appendChild(units);
    tr.appendChild(editBtn);

    tr.setAttribute("id", "TR" + newItem.itemId);
    tr.setAttribute("class", "book-row");

    document.getElementById("item-table-body").appendChild(tr);

    items.push(newItem);
};

// Creates Item
async function createItem() {
    if (!validateForm("create-item")) {
        return;
    }

    const name = document.getElementById('create-item-name').value;
    const units = document.getElementById('create-item-units').value;

    const requestBody = {
        name: name,
        units: units
    };

    try {
        const response = await fetch(URL + "item/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log('Item created successfully.');
            await refreshTable();
            clearForm("create-item")
            hideModal("createItem")
        }
    } catch (error) {
        console.error('Error creating Item:', error);
    }
}

// Updates Item
async function updateItem() {
    if (!validateForm("edit-item")) {
        return;
    }

    const newName = document.getElementById('edit-item-name').value;
    const newUnits = document.getElementById('edit-item-units').value;
    const itemId = document.getElementById('edit-item-id').value;

    const requestBody = {
        itemId: itemId
    };

    const url = URL + 'item/' + itemId +
        '?newName=' + encodeURIComponent(newName) +
        '&newUnits=' + encodeURIComponent(newUnits);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log('Item updated successfully.');

            await refreshTable();
            clearForm("edit-item");
            hideModal("editItem");
        }
    } catch (error) {
        console.error('Error updating Item:', error);
    }
}

// Deletes Item
async function deleteItem() {
    try {
        const itemId = document.getElementById('edit-item-id').value;

        const requestBody = {
            itemId: itemId
        };

        const response = await fetch(`${URL}item/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log('Item deleted successfully.');
            
            await refreshTable();
            clearForm("edit-item");
            hideModal("editItem");
        }
    } catch (error) {
        console.error('Error deleting Item:', error);
    }
}

// Opens Edit Modal on Item Page
function openEditModal(itemId) {
    const item = items.find((i) => i.itemId === itemId);

    document.getElementById("edit-item-name").value = item.name;
    document.getElementById("edit-item-units").value = item.units;
    document.getElementById("edit-item-id").value = itemId;

    const editItemModal = new bootstrap.Modal(document.getElementById("editItemModal"));
    editItemModal.show();
}

// Performs a check on various form inputs on Item page
function validateForm(formId) {
    const name = document.getElementById(formId + "-name").value.trim();
    const units = document.getElementById(formId + "-units").value.trim();

    if (name === "" || units === "") {
        alert("Please fill in all required fields.");
    }

    if (units < 0) {
        alert("Units cannot be negative");
        return false;
    }

    return true;
}