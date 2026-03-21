'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItemOption = {
    name: string;
    value: string;
    priceChange: number;
};

export type CartItem = {
    cartItemId: string; // Unique ID for each cart entry (to distinguish same product with diff options)
    productId: string;
    name: string;
    basePrice: number;
    options: CartItemOption[];
    requirements: string;
    quantity: number;
    totalPrice: number;
    image: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
    shippingAddress: string;
    setShippingAddress: (address: string) => void;
    postcode: string;
    setPostcode: (code: string) => void;
    shippingType: 'delivery' | 'pickup';
    setShippingType: (type: 'delivery' | 'pickup') => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [shippingAddress, setShippingAddress] = useState<string>('');
    const [postcode, setPostcode] = useState<string>('');
    const [shippingType, setShippingType] = useState<'delivery' | 'pickup'>('delivery');
    const [isMounted, setIsMounted] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        setIsMounted(true);
        try {
            const storedCart = localStorage.getItem('tank_cart');
            if (storedCart) {
                setItems(JSON.parse(storedCart));
            }
            const storedAddress = localStorage.getItem('tank_shipping_address');
            if (storedAddress) {
                setShippingAddress(storedAddress);
            }
            const storedPostcode = localStorage.getItem('tank_postcode');
            if (storedPostcode) {
                setPostcode(storedPostcode);
            }
            const storedType = localStorage.getItem('tank_shipping_type');
            if (storedType === 'delivery' || storedType === 'pickup') {
                setShippingType(storedType);
            }
        } catch (error) {
            console.error('Failed to load cart from local storage:', error);
        }
    }, []);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('tank_cart', JSON.stringify(items));
            localStorage.setItem('tank_shipping_address', shippingAddress);
            localStorage.setItem('tank_postcode', postcode);
            localStorage.setItem('tank_shipping_type', shippingType);
        }
    }, [items, shippingAddress, postcode, shippingType, isMounted]);

    // Clear shipping info when cart is empty
    useEffect(() => {
        if (isMounted && items.length === 0) {
            setShippingAddress('');
            setPostcode('');
        }
    }, [items.length, isMounted]);

    const addToCart = (newItem: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => {
        setItems(prevItems => {
            // Create a unique ID based on product ID, options, and requirements
            const optionsString = JSON.stringify(newItem.options);
            const cartItemId = `${newItem.productId}-${optionsString}-${newItem.requirements}`;

            const optionsPriceTotal = newItem.options.reduce((sum, opt) => sum + opt.priceChange, 0);
            const unitPrice = newItem.basePrice + optionsPriceTotal;

            const existingItemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);

            if (existingItemIndex >= 0) {
                // If exact same item exists, just increase quantity (Immutably)
                return prevItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        const newQuantity = item.quantity + newItem.quantity;
                        return {
                            ...item,
                            quantity: newQuantity,
                            totalPrice: newQuantity * unitPrice
                        };
                    }
                    return item;
                });
            } else {
                // Add new item
                return [...prevItems, {
                    ...newItem,
                    cartItemId,
                    totalPrice: unitPrice * newItem.quantity
                }];
            }
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }

        setItems(prevItems => prevItems.map(item => {
            if (item.cartItemId === cartItemId) {
                const optionsPriceTotal = item.options.reduce((sum, opt) => sum + opt.priceChange, 0);
                const unitPrice = item.basePrice + optionsPriceTotal;
                return {
                    ...item,
                    quantity,
                    totalPrice: unitPrice * quantity
                };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
    };

    const getCartTotal = () => {
        return items.reduce((total, item) => total + item.totalPrice, 0);
    };

    const getCartItemCount = () => {
        // Return the number of unique lines in the cart (more intuitive for users)
        return items.length;
    };

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartItemCount,
            shippingAddress,
            setShippingAddress,
            postcode,
            setPostcode,
            shippingType,
            setShippingType
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
