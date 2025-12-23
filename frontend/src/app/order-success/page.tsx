'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We've received it and will start preparing your meal right away.
        </p>
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Your Order ID:</p>
            <p className="text-2xl font-bold text-gray-900">{orderId}</p>
          </div>
        )}
        <div className="space-y-4">
          <p className="text-gray-700">
            You will receive a confirmation email shortly with order details and tracking information.
          </p>
          <Link
            href="/order"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

