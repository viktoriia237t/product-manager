'use client'
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import {Input, Textarea} from "@heroui/input";
import { Button } from "@heroui/button";
import {Select, SelectItem} from "@heroui/select";

export default function ProductEditModal({ product, categories = [], open, onOpenChange, onSave }) {
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [description, setDescription] = useState(product?.description || "");
    const [categoryId, setCategoryId] = useState(product?.categoryId || "");

    useEffect(() => {
        setName(product?.name || "");
        setPrice(product?.price || 0);
        setDescription(product?.description || "");
        setCategoryId(product?.categoryId || "");
    }, [product]);

    const handleSave = () => {
        onSave({ ...product, name, price, description, categoryId });
        onOpenChange(false);
    };

    if (!product) return null;

    return (
        <Modal isOpen={open} onOpenChange={onOpenChange} isDismissable>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Edit Product&nbsp;<span className="text-blue-500">{name}</span></ModalHeader>
                        <ModalBody className="flex flex-col gap-4">
                            <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
                            <Input label="Price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
                            <Textarea  label="Description" value={description} onChange={e => setDescription(e.target.value)} />

                            <Select
                                label="Category"
                                placeholder="Select category"
                                selectedKeys={categoryId ? [categoryId] : []}
                                onSelectionChange={keys => {
                                    const selected = Array.from(keys)[0];
                                    setCategoryId(selected);
                                }}
                                className="w-full"
                            >
                                {categories.map(c => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter className="flex gap-2">
                            <Button color="primary" onPress={handleSave}>Save</Button>
                            <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
