import { Modal,  ModalHeading,  ModalToggleButton } from '@trussworks/react-uswds';
import { useState, useRef } from 'react';
import UpdateWarehousesForm from '../Warehouses/UpdateWarehousesForm';

export function UpdateWarehouseButton() {

    const setWarehouses = useState([])

    const modalRef = useRef(null);

    function handleUpdatedWarehouse(updatedWarehouse) {
        setWarehouses((oldState) => {
            return [...oldState, updatedWarehouse];
        })
    }

    return (
        <>
            <ModalToggleButton modalRef={modalRef} opener>Update</ModalToggleButton>

            <Modal id='update-warehouse-form-modal' ref={modalRef}>
                <ModalHeading id='update-warehouse-form-modal-heading'>Enter Updates For Warehouse</ModalHeading>
                <UpdateWarehousesForm handleUpdatedWarehouse={handleUpdatedWarehouse}></UpdateWarehousesForm>
            </Modal>
        </>
    );
}