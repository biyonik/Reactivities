import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useStore } from '../../../Stores/Store';

const ModalContainerComponent = () => {
    const {modalStore} = useStore();
    const {modal: {open, body}, closeModal} = modalStore;
    
    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    )
}

export default observer(ModalContainerComponent);