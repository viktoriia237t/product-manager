'use client'
import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Divider} from "@heroui/divider";
import ProductModal from "./ProductModal";
import ProductDeleteModal from "./ProductDeleteModal";
import {Button} from "@heroui/button";

export default function ProductCard({product, categories, onUpdate, onDelete}) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <Card className={'min-w-[304] w-full'}>
                <CardHeader className="flex gap-3">
                    <div className="text-center text-xl font-bold">
                       {product.name}
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div className={'flex flex-col justify-between h-full'}>
                        <p className={'text-center text-sm'}>{product.description || "No description"}</p>
                        <div className={'flex justify-between '}>
                            <div className={'text-gray-600'}>Category:</div>
                            <div className={'text-md font-semibold'}>
                                {product.categoryName}
                            </div>
                        </div>
                        <div className={'flex justify-between '}>
                            <div className={'text-gray-600'}>Price:</div>
                            <div className={'text-md font-semibold'}>
                                ${product.price}
                            </div>
                        </div>
                    </div>
                </CardBody>

                <Divider/>

                <CardFooter className="flex gap-2 justify-between">
                    <Button size={'sm'} color="primary" variant="ghost" onPress={() => setEditOpen(true)}>
                        Edit
                    </Button>
                    <Button size={'sm'} color="danger" variant="ghost" onPress={() => setDeleteOpen(true)}>
                        Delete
                    </Button>
                </CardFooter>
            </Card>
            <ProductModal
                categories={categories}
                open={editOpen}
                onOpenChange={setEditOpen}
                product={product}
                onSave={onUpdate}
            />
            <ProductDeleteModal
                product={product}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onDelete={onDelete}
            />
        </>
    );
}
