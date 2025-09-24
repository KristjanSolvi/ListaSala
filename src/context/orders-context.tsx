'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Artwork } from '@/data/artworks';
import { readStorage, writeStorage } from '@/utils/storage';

type BuyerDetails = {
  name: string;
  email: string;
  phone: string;
};

export type Order = {
  id: string;
  artwork: Artwork;
  buyer: BuyerDetails;
  shippingOption: string;
  totalISK: number;
  createdAt: string;
};

type CreateOrderInput = {
  artwork: Artwork;
  buyer: BuyerDetails;
  shippingOption: string;
  totalISK: number;
};

type OrdersContextValue = {
  orders: Record<string, Order>;
  createOrder: (input: CreateOrderInput) => Order;
  getOrder: (orderId: string) => Order | undefined;
};

const ORDERS_STORAGE_KEY = 'lv-orders';

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `order-${Math.random().toString(36).slice(2, 10)}`;
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Record<string, Order>>({});

  useEffect(() => {
    const stored = readStorage<Record<string, Order>>(ORDERS_STORAGE_KEY, {});
    setOrders(stored);
  }, []);

  const createOrder = (input: CreateOrderInput) => {
    const id = generateId();
    const order: Order = {
      id,
      artwork: input.artwork,
      buyer: input.buyer,
      shippingOption: input.shippingOption,
      totalISK: input.totalISK,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => {
      const next = { ...prev, [id]: order };
      writeStorage(ORDERS_STORAGE_KEY, next);
      return next;
    });

    return order;
  };

  const getOrder = (orderId: string) => orders[orderId];

  const value = useMemo(() => ({ orders, createOrder, getOrder }), [orders]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error('useOrders must be used within <OrdersProvider>');
  }
  return ctx;
}
