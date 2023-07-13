import { Table } from '@trussworks/react-uswds';
import { DeleteWarehouseButton } from '../Button/DeleteWarehouseButton'
import { UpdateWarehouseButton } from '../Button/UpdateWarehouseButton'

export default function WarehousesTable({tableData}) {
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
                                <td><DeleteWarehouseButton/></td>
                                <td><UpdateWarehouseButton/></td>
                            </tr>
                        );
                    })}
                </tbody>


            </Table>
        </>
    );
}