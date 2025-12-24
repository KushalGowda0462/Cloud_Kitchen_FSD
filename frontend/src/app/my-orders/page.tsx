'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user.id) {
            fetchOrders(user.id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchOrders = async (userId: string) => {
        try {
            const response = await fetch(`/api/orders?userId=${userId}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-8">Hungry? Place your first order today!</p>
                    <Link href="/order" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        Order Now
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Order #{order._id.slice(-6)}</span>
                                        <div className="flex items-center gap-2 text-gray-700 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-inset ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 ring-green-200' : 'bg-blue-100 text-blue-700 ring-blue-200'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t border-gray-50 pt-4 mb-4">
                                    <div className="text-sm text-gray-600 space-y-2">
                                        {order.items.map((item: any, idx: number) => (
                                            <div key={idx} className="flex justify-between">
                                                <span>{item.qty}x {item.name}</span>
                                                <span className="font-medium">₹{item.price * item.qty}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-4 mt-4">
                                    <span className="font-bold text-gray-900">Grand Total</span>
                                    <span className="text-xl font-extrabold text-blue-600">₹{order.totals.grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
