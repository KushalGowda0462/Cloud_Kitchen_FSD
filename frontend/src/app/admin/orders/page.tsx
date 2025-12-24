'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Package, Clock, CheckCircle, Truck, ShoppingBag, User as UserIcon } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const statusIcons: any = {
        PLACED: <ShoppingBag className="w-5 h-5 text-blue-500" />,
        CONFIRMED: <CheckCircle className="w-5 h-5 text-green-500" />,
        PREPARING: <Clock className="w-5 h-5 text-yellow-500" />,
        OUT_FOR_DELIVERY: <Truck className="w-5 h-5 text-purple-500" />,
        DELIVERED: <Package className="w-5 h-5 text-gray-500" />,
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                    <Package className="w-8 h-8 text-blue-600" />
                    Admin Order Management
                </h1>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Total Orders: {orders.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gray-800">#{order._id.slice(-6)}</div>
                                        <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 font-medium text-gray-900">
                                            <UserIcon className="w-4 h-4 text-gray-400" />
                                            {order.userName || 'Guest'}
                                        </div>
                                        <div className="text-xs text-gray-500">{order.address.phone}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-sm text-gray-700 max-w-[200px] truncate">
                                            {order.items.map((it: any) => `${it.qty}x ${it.name}`).join(', ')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-lg font-bold text-blue-600">₹{order.totals.grandTotal.toFixed(2)}</div>
                                        <div className="text-xs text-gray-400 capitalize">{order.paymentMethod}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-inset ${order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-700 ring-gray-200' :
                                                order.status === 'PLACED' ? 'bg-blue-100 text-blue-700 ring-blue-200' :
                                                    'bg-green-100 text-green-700 ring-green-200'
                                            }`}>
                                            {statusIcons[order.status]}
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No orders found yet.
                    </div>
                )}
            </div>
        </div>
    );
}
