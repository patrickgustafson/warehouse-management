const URL = "http://localhost:8282/stock/";
let stock = [];

// Refreshes Stock table
async function refreshTable() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let stock = JSON.parse(xhr.responseText);

            let tableBody = document.getElementById("stock-table-body");
            tableBody.innerHTML = "";

            stock.forEach((newStock) => {
                addStock(newStock);
            });
        }
    };

    xhr.open("GET", URL);
    xhr.send();
}

// Clears various forms on Stock page
function clearForm(formId) {
    const form = document.getElementById(formId + "-form");
    form.reset();
}

// Hides various modals after submitting on Stock page
function hideModal(modalId) {
    const modalElement = document.getElementById(modalId + "Modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

// Loads table on refresh
document.addEventListener("DOMContentLoaded", () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let stock = JSON.parse(xhr.responseText);

            stock.forEach((newStock) => {
                addStock(newStock);
            });
        }
    };
    xhr.open("GET", URL);
    xhr.send();
});

// Populates Stock table on Stock page
function addStock(newStock) {
    let tr = document.createElement("tr");

    let itemId = document.createElement("td");
    let warehouseId = document.createElement("td");
    let item = document.createElement("td");
    let warehouse = document.createElement("td");
    let quantity = document.createElement("td");
    let editBtn = document.createElement("td");

    itemId.innerText = newStock.id.itemId;
    warehouseId.innerText = newStock.id.warehouseId;
    item.innerText = newStock.item.name;
    warehouse.innerText = newStock.warehouse.location;
    quantity.innerText = newStock.quantity;

    editBtn.innerHTML =
    `<button class='btn btn-primary' onclick='openEditModal(${newStock.id.itemId}, ${newStock.id.warehouseId})' id='edit-button'>Edit</button>`;

    tr.appendChild(itemId);
    tr.appendChild(warehouseId);
    tr.appendChild(item);
    tr.appendChild(warehouse);
    tr.appendChild(quantity);
    tr.appendChild(editBtn);

    tr.setAttribute("id", "TR" + newStock.id);

    document.getElementById("stock-table-body").appendChild(tr);

    stock.push(newStock);
};

// Creates Stock
async function createStock() {
    if (!validateForm("create-stock")) {
        return;
    }

    const itemId = document.getElementById("create-stock-item-id").value;
    const warehouseId = document.getElementById("create-stock-warehouse-id").value;
    const quantity = document.getElementById("create-stock-quantity").value;

    try {
        const response = await fetch(URL + '?itemId=' + encodeURIComponent(itemId) +
        '&warehouseId=' + encodeURIComponent(warehouseId) + 
        '&quantity=' + encodeURIComponent(quantity), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            await refreshTable();
            clearForm("create-stock");
            hideModal("createStock"); 
        }
    } catch (error) {
        console.error("Error creating Stock:", error);
    }
}

// Updates Stock
async function updateStock() {
    if (!validateForm("edit-stock")) {
        return;
    }

    const newItemId = document.getElementById('edit-stock-item-id').value;
    const newWarehouseId = document.getElementById('edit-stock-warehouse-id').value;
    const newQuantity = document.getElementById('edit-stock-quantity').value;

    try {
        const response = await fetch(`${URL}${newItemId}/${newWarehouseId}/${newQuantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Stock updated successfully.');

            await refreshTable();
            clearForm("edit-stock");
            hideModal("editStock");
        }
    } catch (error) {
        console.error('Error updating Item:', error);
    }
}

// Deletes Stock
async function deleteStock() {
    try {
        const itemId = document.getElementById('edit-stock-item-id').value;
        const warehouseId = document.getElementById('edit-stock-warehouse-id').value;

        const response = await fetch(`${URL}${itemId}/${warehouseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              }
        });

        if (response.ok) {
            console.log('Stock deleted successfully.');
            await refreshTable();
            clearForm("edit-stock");
            hideModal("editStock");
        }
    } catch (error) {
        console.error('Error deleting Stock:', error);
    }
}

// Opens Edit Modal on Stock page
function openEditModal(itemId, warehouseId) {
    const sto = stock.find((s) => s.id.itemId === itemId && s.id.warehouseId === warehouseId);

    document.getElementById("edit-stock-item-id").value = sto.id.itemId;
    document.getElementById("edit-stock-warehouse-id").value = sto.id.warehouseId;
    document.getElementById("edit-stock-quantity").value = sto.quantity;

    const editItemModal = new bootstrap.Modal(document.getElementById("editStockModal"));
    editItemModal.show();
}

// Valids form input for various forms on Stock page
function validateForm(formId) {
    const itemId = document.getElementById(formId + "-item-id").value.trim();
    const warehouseId = document.getElementById(formId + "-warehouse-id").value.trim();
    const quantity = document.getElementById(formId + "-quantity").value.trim();

    if (itemId === "" || warehouseId === "" || quantity === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    if (quantity < 0) {
        alert("Quantity cannot be negative");
        return false;
    }

    return true;
}