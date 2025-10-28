'use client'
import React, {useState, useEffect} from "react";
import ProductCard from "../../components/products/ProductCard";
import {Button} from "@heroui/button";
import {Skeleton} from "@heroui/skeleton";
import {Card} from "@heroui/card";
import ProductCreateModal from "@/components/products/ProductCreateModal";
import {useProducts} from "@/hooks/useProducts";

export default function ProductList() {
    const { products, categories, loading, fetchProducts, handleAdd, handleUpdate, handleDelete } = useProducts();
    const [page, setPage] = useState(1);
    const [addOpen, setAddOpen] = useState(false);

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const productsWithCategory = products.map(product => {
        const category = categories.find(c => c.id === product.categoryId);
        return { ...product, categoryName: category ? category.name : "No category" };
    });

    return (
        <div className="max-w-5xl w-full mx-auto p-6 gap-8">
            <div className={'flex items-center gap-8 justify-between pb-8'}>
                <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
                    <Button color="primary" variant="solid" onPress={() => {
                    console.log("Open modal");
                    setAddOpen(true);
                }}>
                    Add product
                </Button>
            </div>


            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="w-[304px] space-y-5 p-4" radius="lg">
                            <Skeleton className="rounded-lg h-24 bg-default" isLoaded={false} />
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 h-3 rounded-lg bg-default" isLoaded={false} />
                                <Skeleton className="w-4/5 h-3 rounded-lg bg-default-300" isLoaded={false} />
                                <Skeleton className="w-2/5 h-3 rounded-lg bg-default-200" isLoaded={false} />
                            </div>
                        </Card>
                    ))
                ) : (
                    productsWithCategory.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            categories={categories}
                        />
                    ))
                )}
            </div>


            {
                products.length ? (
                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </Button>

                        <span className="self-center">Page {page}</span>

                        {products.length >= 6 && (
                            <Button
                                color="primary"
                                variant="flat"
                                onPress={() => setPage(prev => prev + 1)}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                ) : (
                    <span className="self-center">Список продуктів порожній</span>
                )
            }
            <ProductCreateModal
                open={addOpen}
                onOpenChange={setAddOpen}
                categories={categories}
                onSave={handleAdd}
            />
        </div>
    );

}
