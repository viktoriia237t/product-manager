import { useState } from "react";
import { addToast } from "@heroui/toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const PRODUCTS_API = BASE_URL+'/products';
const CATEGORIES_API = BASE_URL+'/category';

export function useProducts(limit = 6) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (page = 1, categoryId = 'all') => {
        setLoading(true);
        try {
            const url = categoryId === "all"
                ? `${PRODUCTS_API}?page=${page}&limit=${limit}`
                : `${CATEGORIES_API}/${categoryId}/products?page=${page}&limit=${limit}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();

            const catRes = await fetch(`${CATEGORIES_API}`);
            if (!catRes.ok) throw new Error("Failed to fetch categories");
            const dataCategories = await catRes.json();

            setProducts(data);
            setCategories(dataCategories);

            addToast({
                title: "Success",
                description: "Product list successfully loaded",
                timeout: 3000,
                color: "success",
            });
        } catch (err) {
            console.error(err);
            addToast({
                title: "Error",
                description: "Failed to load products. Try again later.",
                timeout: 3000,
                color: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (newProduct) => {
        try {
            if (!newProduct.categoryId) {
                throw new Error("Category ID is required");
            }
            const res = await fetch(`${CATEGORIES_API}/${newProduct.categoryId}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) throw new Error("Failed to add product");

            const data = await res.json();
            setProducts(prev => [...prev, data]);

            addToast({
                title: "Success",
                description: "Product added successfully",
                timeout: 3000,
                color: "success",
            });
        } catch (err) {
            console.error(err);
            addToast({
                title: "Error",
                description: err.message || "Failed to add product",
                timeout: 3000,
                color: "danger",
            });
        }
    };


    const handleUpdate = async (updatedProduct) => {
        console.log(updatedProduct);
        try {
            const res = await fetch(`${CATEGORIES_API}/${updatedProduct.categoryId}/products/${updatedProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });
            if (!res.ok) throw new Error("Failed to update product");
            const data = await res.json();
            setProducts(prev => prev.map(p => p.id === data.id ? data : p));
            addToast({
                title: "Success",
                description: "Product successfully updated",
                timeout: 3000,
                color: "success"
            });
        } catch (err) {
            console.error(err);
            addToast({
                title: "Error",
                description: "Failed to update product. Please try again later.",
                timeout: 3000,
                color: "danger"
            });
        }
    };

    const handleDelete = async (categoryId, productId) => {
        try {
            const res = await fetch(`${CATEGORIES_API}/${categoryId}/products/${productId}`,
                { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete product");
            setProducts(prev => prev.filter(p => p.id !== productId));
            addToast({ title: "Success", description: "Product deleted", timeout: 3000, color: "success" });
        } catch (err) {
            addToast({
                title: "Error",
                description: "Product could not be deleted. Please try again later.",
                timeout: 3000,
                color: "danger"
            });
            console.error(err);
        }
    };

    return {
        products,
        categories,
        loading,
        fetchProducts,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
