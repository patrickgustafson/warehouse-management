import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function UpdateWarehousesForm({handleUpdatedWarehouse}) {

    const url = "http://localhost:8282/warehouses"

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const url = url + "warehouse/" + warehouseId +
        "?newName=" + encodeURIComponent(newName) +
        "&newCapacity=" + encodeURIComponent(newCapacity);

        const updatedWarehouse = {
            warehouseId: warehouseId
        }

        fetch(url + "/warehouse", {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updatedWarehouse)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleUpdatedWarehouse(returnedData);
            event.target.reset();
        }).catch(error => console.error(error))
    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Label>Warehouse Location</Label>
                <TextInput id="warehouse-location-input" name="warehouseLocation" type="text"/>

                <Label>Warehouse Capacity</Label>
                <TextInput id="warehouse-capacity-input" name="warehouseCapacity" type="number"/>

                <Button type="submit" data-close-modal='true'>Submit</Button>
            </Form>
        </>
    );
}