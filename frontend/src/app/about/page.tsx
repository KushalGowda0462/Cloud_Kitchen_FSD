import { Heart, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are passionate about bringing you the finest culinary experiences through our cloud kitchen platform.
        </p>
      </div>

      {/* Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-4">
            Thindi Potha was born from a simple idea: to make restaurant-quality food accessible to everyone,
            delivered fresh and fast. We started with a vision to revolutionize the food delivery experience
            by focusing on quality, freshness, and customer satisfaction.
          </p>
          <p className="text-gray-700">
            Today, we operate multiple cloud kitchens, each specializing in different cuisines, ensuring that
            every dish we serve meets our high standards of excellence. Our team of experienced chefs works
            tirelessly to create menus that celebrate diverse flavors from around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          To deliver exceptional culinary experiences that bring joy to our customers' tables, one meal at a time.
          We believe that great food should be accessible, affordable, and always fresh.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every ingredient is carefully selected, and every dish is prepared with care.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from recipe development to customer service.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. Your satisfaction is our success.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Diverse Menu</h3>
            <p className="text-gray-700">
              From Indian classics to international favorites, our menu offers something for every palate.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Fresh & Fast</h3>
            <p className="text-gray-700">
              All our dishes are prepared fresh to order and delivered quickly to maintain quality and taste.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Affordable Pricing</h3>
            <p className="text-gray-700">
              We believe great food shouldn't break the bank. Enjoy restaurant-quality meals at competitive prices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

