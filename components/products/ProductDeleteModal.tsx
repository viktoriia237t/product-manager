'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";

export default function ProductDeleteModal({ open, onOpenChange, product, onDelete }) {
    const handleDelete = () => {
        onDelete(product.categoryId, product.id);
        onOpenChange(false);
    };

    if (!product) return null;

    return (
        <Modal isOpen={open} onOpenChange={onOpenChange} isDismissable>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Confirm Delete</ModalHeader>
                        <ModalBody>
                            <div className={'text-md text-center'}>
                                Are you sure you want to delete <br/><strong>"{product.name}"</strong>?
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center gap-2 mt-2">
                            <Button color="danger" variant="solid" onPress={handleDelete}>Delete</Button>
                            <Button color="primary" variant="bordered" onPress={onClose}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
