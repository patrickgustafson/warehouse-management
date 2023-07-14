const URL = "http://localhost:8282/warehouses/";
let warehouses = [];

async function refreshTable() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let warehouses = JSON.parse(xhr.responseText);

            let tableBody = document.getElementById("warehouse-table-body");
            tableBody.innerHTML = "";

            warehouses.forEach((newWarehouse) => {
                addWarehouse(newWarehouse);
            });
        }
    };

    xhr.open("GET", URL);
    xhr.send();
}

function clearForm(formId) {
    const form = document.getElementById(formId + "-form");
    form.reset();
}

function dismissModal(modalId) {
    const modalElement = document.getElementById(modalId + "Modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

document.addEventListener("DOMContentLoaded", () => {
    refreshTable();
});

function addWarehouse(newWarehouse) {
    let tr = document.createElement("tr");

    let location = document.createElement("td");
    let capacity = document.createElement("td");

    let editBtn = document.createElement("td");

    location.innerText = newWarehouse.location;
    capacity.innerText = newWarehouse.capacity;

    editBtn.innerHTML = `<button class='btn btn-primary' onclick='openEditModal(${newWarehouse.warehouseId})'>Edit</button>`;

    tr.appendChild(location);
    tr.appendChild(capacity);
    tr.appendChild(editBtn);

    tr.setAttribute("id", "TR" + newWarehouse.warehouseId);
    tr.setAttribute("class", "warehouse-row");

    document.getElementById("warehouse-table-body").appendChild(tr);

    warehouses.push(newWarehouse);
}

async function createWarehouse() {
    if (!validateForm("create-warehouse")) {
        return;
    }

    const location = document.getElementById("create-warehouse-location").value;
    const capacity = document.getElementById("create-warehouse-capacity").value;

    const requestBody = {
        location: location,
        capacity: capacity
    };

    try {
        const response = await fetch(URL + "warehouse/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            await refreshTable();
            clearForm("create-warehouse");
            dismissModal("createWarehouse");
        }
    } catch (error) {
        console.error("Error creating warehouse:", error);
    }
}

async function updateWarehouse() {
    if (!validateForm("edit-warehouse")) {
        return;
    }

    const warehouseId = document.getElementById("edit-warehouse-id").value;
    const newLocation = document.getElementById("edit-warehouse-location").value;
    const newCapacity = document.getElementById("edit-warehouse-capacity").value;

    const requestBody = {
        warehouseId: warehouseId
    };

    const url = URL + "warehouse/" + warehouseId +
        "?newLocation=" + encodeURIComponent(newLocation) +
        "&newCapacity=" + encodeURIComponent(newCapacity);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log("Warehouse updated successfully.");
            await refreshTable();
            clearForm("edit-warehouse");
            dismissModal("editWarehouse");
        }
    } catch (error) {
        console.error("Error updating warehouse:", error);
    }
}

async function deleteWarehouse() {
    try {
        const warehouseId = document.getElementById("edit-warehouse-id").value;

        const requestBody = {
            warehouseId: warehouseId
        }

        const response = await fetch(`${URL}warehouse/${warehouseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log("Warehouse deleted successfully.");
            await refreshTable();
            clearForm("edit-warehouse");
            dismissModal("editWarehouse");
        }
    } catch (error) {
        console.error("Error deleting warehouse:", error);
    }
}

function openEditModal(warehouseId) {
    const warehouse = warehouses.find((w) => w.warehouseId === warehouseId);

    document.getElementById("edit-warehouse-location").value = warehouse.location;
    document.getElementById("edit-warehouse-capacity").value = warehouse.capacity;
    document.getElementById("edit-warehouse-id").value = warehouseId;

    const editModal = new bootstrap.Modal(document.getElementById("editWarehouseModal"));
    editModal.show();
}

function validateForm(formId) {
    const location = document.getElementById(formId + "-location").value.trim();
    const capacity = document.getElementById(formId + "-capacity").value.trim();

    if (location === "" || capacity === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    if (capacity < 0) {
        alert("Capacity cannot be negative");
        return false;
    }

    return true;
}