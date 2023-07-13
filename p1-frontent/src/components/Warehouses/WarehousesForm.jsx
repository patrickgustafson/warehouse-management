import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function WarehousesForm({handleNewWarehouse}) {

    const url = "http://localhost:8282/warehouses"

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const newWarehouse = {
            location : data.get('warehouseLocation'),
            capacity : data.get('warehouseCapacity')
        }

        fetch(url + "/warehouse", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newWarehouse)
        })
        .then(data => data.json())
        .then(returnedData => {
            handleNewWarehouse(returnedData);
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