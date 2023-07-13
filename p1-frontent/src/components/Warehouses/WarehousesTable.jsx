import { Table } from '@trussworks/react-uswds';

export default function WarehousesTable({tableData}) {
    console.log(tableData)
    return (
        <>
            <Table striped fullWidth className='bg-primary-lighter'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Location</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((warehouse) => {
                        return (
                            <tr key={warehouse.warehouseId}>
                                <td>{warehouse.warehouseId}</td>
                                <td>{warehouse.location}</td>
                                <td>{warehouse.capacity}</td>
                            </tr>
                        );
                    })}
                </tbody>


            </Table>
        </>
    );
}