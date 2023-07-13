import { Button, Grid, GridContainer,  ModalToggleButton } from '@trussworks/react-uswds';
import WarehousesTable from './WarehousesTable';
import { useEffect, useState, useRef } from 'react';

export default function Warehouses() {

    const url = "http://localhost:8282/warehouses"

    const [warehouses, setWarehouses] = useState([])

    const modalRef = useRef(null);

    useEffect(() => {
        fetch(url)
            .then(data => data.json())
                .then(returnedData => {
                    setWarehouses(returnedData);
                }).catch(error => console.error(error))
    }, [])


    return (
        <>
            <GridContainer>
                <Grid row>
                    <Grid col={10}>
                        <h1 className='text-centered'>All Warehouses</h1>
                    </Grid>
                    <Grid col={2}>
                        <ModalToggleButton modalRef={modalRef} opener>New Warehouse</ModalToggleButton>
                    </Grid>

                </Grid>
                <Grid row>
                    <Grid col>
                        <WarehousesTable tableData={warehouses}/>
                    </Grid>
                </Grid>
            </GridContainer>
        </>
    );
}