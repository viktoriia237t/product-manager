'use client'
import React from "react";
import {Button} from "@heroui/button";

export default function Category({ categories, onSelectCategory, selectedCategory }) {
    return (
        <>
            <Button onPress={() => onSelectCategory("all")}
                    color={"warning"}
                    variant={selectedCategory === 'all' ? 'bordered' : 'light' }>
                ALL
            </Button>
            {categories.map(c => (
                <Button onPress={() => onSelectCategory(c.id)} color={"warning"}
                        variant={selectedCategory === c.id ? 'bordered' : 'light' }>
                    {c.name}
                </Button>
            ))}
        </>
    );
}