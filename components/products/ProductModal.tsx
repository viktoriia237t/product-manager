'use client'
import React, {useState, useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@heroui/modal";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {Select, SelectItem} from "@heroui/select";

export default function ProductModal({
                                         product = null,
                                         categories = [],
                                         open,
                                         onOpenChange,
                                         onSave
                                     }) {
    const isEdit = !!product;
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [description, setDescription] = useState(product?.description || "");
    const [categoryId, setCategoryId] = useState(product?.categoryId || "");
    const [errors, setErrors] = useState({
        name: "",
        price: 0,
        categoryId: ""
    });

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
        if (!categoryId) newErrors.categoryId = "Category must be selected";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        setName(product?.name || "");
        setPrice(product?.price || "");
        setDescription(product?.description || "");
        setCategoryId(product?.categoryId || "");
    }, [product]);

    const handleSave = () => {
        if (!validate()) return;

        const payload = { ...product, name, price, description, categoryId };
        onSave(payload);
        onOpenChange(false);

        if (!isEdit) {
            setName("");
            setPrice(0);
            setDescription("");
            setCategoryId("");
        }
    };


    return (
        <Modal isOpen={open} onOpenChange={onOpenChange} isDismissable>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {isEdit ? "Edit Product" : "Create Product"}&nbsp;
                             <span className="text-blue-500">{name}</span>
                        </ModalHeader>
                        <ModalBody className="flex flex-col gap-4">
                            <div>
                                <Input
                                    isRequired
                                    label="Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                            </div>
                            <div>
                                <Input
                                    isRequired
                                    label="Price"
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                            </div>

                            <div>
                                <Textarea
                                    label="Description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                {errors.description &&
                                    <span className="text-red-500 text-sm">{errors.description}</span>}
                            </div>

                            <div>
                                <Select
                                    label="Category"
                                    placeholder="Select category"
                                    selectedKeys={categoryId ? [categoryId] : []}
                                    onSelectionChange={keys => setCategoryId(Array.from(keys)[0])}
                                    className="w-full"
                                >
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </Select>
                                {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId}</span>}
                            </div>

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
