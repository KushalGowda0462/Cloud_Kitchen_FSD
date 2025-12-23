import Link from 'next/link';
import { Search, ShoppingCart, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How it Works</h1>
        <p className="text-xl text-gray-600">
          Ordering delicious meals is just a few clicks away
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Step 1 */}
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            1
          </div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Browse & Select</h2>
          <p className="text-gray-700 leading-relaxed">
            Explore our extensive menu featuring cuisines from around the world. Use our category filters
            to find exactly what you're craving - whether it's Indian, Chinese, Italian, Mexican, or more.
            Filter by dietary preferences (Veg/Non-Veg) and browse through our carefully curated dishes.
            Each dish comes with detailed descriptions and images to help you make the perfect choice.
          </p>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            2
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Add to Cart & Checkout</h2>
          <p className="text-gray-700 leading-relaxed">
            Add your favorite dishes to the cart and adjust quantities as needed. Review your selections,
            then proceed to checkout. Enter your delivery address details, choose your preferred payment
            method (UPI, Card, or Cash on Delivery), and review your order summary. Our secure checkout
            process ensures your information is safe.
          </p>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            3
          </div>
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Place Order & Enjoy</h2>
          <p className="text-gray-700 leading-relaxed">
            Once you confirm your order, our kitchen team immediately starts preparing your meal fresh.
            You'll receive an order confirmation with your order ID. Track your order status and get
            real-time updates. Our delivery team ensures your food arrives hot and fresh, ready to enjoy.
            Sit back, relax, and savor the flavors!
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/order"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Start Ordering Now
        </Link>
      </div>
    </div>
  );
}

