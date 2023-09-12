import { useState } from "react";
import Modal from "../Modal/Modal";


interface InviteModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


export default function InviteModal({ showModal, setShowModal }: InviteModalProps ) {

    return (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
        </Modal>
    );
}