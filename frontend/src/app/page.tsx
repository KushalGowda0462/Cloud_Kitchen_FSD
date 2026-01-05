'use client';

import Link from 'next/link';
import { useEffect, Suspense, useRef, useState } from 'react';
import { ArrowRight, Clock, UtensilsCrossed, Truck, Heart, Award, Users, Search, ShoppingCart, CreditCard, Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Image from 'next/image';
import FloatingFood from '@/components/decor/FloatingFood';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const videos = [
  '/videos/11610-231571879_large.mp4',
  '/videos/133987-758543857_large.mp4',
  '/videos/247926_large.mp4',
];

function HomeContent() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(1); // 1 or 2

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Preload next video when current video changes
  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (!video1 || !video2) return;

    const currentVideo = activeVideo === 1 ? video1 : video2;
    const nextVideo = activeVideo === 1 ? video2 : video1;
    const nextIndex = (currentVideoIndex + 1) % videos.length;

    // Preload next video immediately
    nextVideo.src = videos[nextIndex];
    nextVideo.load();
    nextVideo.currentTime = 0; // Reset to start
  }, [currentVideoIndex, activeVideo]);

  // Handle seamless video switching with crossfade
  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (!video1 || !video2) return;

    const currentVideo = activeVideo === 1 ? video1 : video2;
    const nextVideo = activeVideo === 1 ? video2 : video1;

    const handleTimeUpdate = () => {
      // When current video is near the end (within 0.5 seconds), start next video
      const timeRemaining = currentVideo.duration - currentVideo.currentTime;
      if (timeRemaining <= 0.5 && nextVideo.readyState >= 2) {
        // Start playing next video before current ends
        if (nextVideo.paused) {
          nextVideo.play().catch((error) => {
            console.error('Error playing next video:', error);
          });
        }
      }
    };

    const handleVideoEnd = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      
      // Switch active video and update index
      setActiveVideo(activeVideo === 1 ? 2 : 1);
      setCurrentVideoIndex(nextIndex);
      
      // Reset current video for next cycle
      currentVideo.currentTime = 0;
      currentVideo.pause();
    };

    currentVideo.addEventListener('timeupdate', handleTimeUpdate);
    currentVideo.addEventListener('ended', handleVideoEnd);

    // Ensure current video is playing
    if (currentVideo.paused && currentVideo.readyState >= 2) {
      currentVideo.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }

    return () => {
      currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
      currentVideo.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentVideoIndex, activeVideo]);

  // Initialize first video
  useEffect(() => {
    const video1 = videoRef1.current;
    if (video1) {
      video1.src = videos[0];
      video1.load();
      video1.play().catch((error) => {
        console.error('Error playing initial video:', error);
      });
    }
  }, []);


  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative text-white py-20 min-h-screen flex items-center overflow-hidden">
        {/* Video Background - Video 1 */}
        <video
          ref={videoRef1}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            activeVideo === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Video Background - Video 2 */}
        <video
          ref={videoRef2}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            activeVideo === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Fresh Meals, Delivered Fast
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white/90">
                Experience the finest cloud kitchen cuisine, crafted with care and delivered to your doorstep
              </p>
              <div className="max-w-3xl mx-auto space-y-4 text-white/90">
                <p className="text-lg">
                  Our cloud kitchen brings together the best of multiple cuisines under one roof. 
                  From traditional Indian flavors to international favorites, we prepare every dish 
                  fresh to order using premium ingredients.
                </p>
                <p className="text-lg">
                  With our streamlined operations and dedicated delivery network, we ensure your meals 
                  arrive hot, fresh, and on time. No compromises on quality, no waiting for hours.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50]] relative overflow-visible">
        {/* DECORATION LAYER - Left side floating food */}
        <FloatingFood
          src="/images/vecteezy_ai-generated-a-plate-of-chicken-biryani-with-chicken-and_36743856.png"
          alt="Chicken biryani"
          className="left-[-100px] top-140 -translate-y-1/2 w-[460px] h-[460px]"
        />
        
        {/* CONTENT LAYER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only the freshest ingredients, sourced daily to ensure quality in every bite.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your favorite meals delivered quickly, hot and fresh, right when you need them.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Menu</h3>
              <p className="text-gray-600">
                Explore our diverse menu featuring cuisines from around the world, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Chef Animation GIF */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-xs h-32 relative">
              <Image
                src="/images/chef-animation.gif"
                alt="Chef animation"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate about bringing you the finest culinary experiences through our cloud kitchen platform.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                CloudKitchen was born from a simple idea: to make restaurant-quality food accessible to everyone,
                delivered fresh and fast. We started with a vision to revolutionize the food delivery experience
                by focusing on quality, freshness, and customer satisfaction.
              </p>
              <p className="text-gray-700">
                Today, we operate multiple cloud kitchens, each specializing in different cuisines, ensuring that
                every dish we serve meets our high standards of excellence. Our team of experienced chefs works
                tirelessly to create menus that celebrate diverse flavors from around the world.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-700 text-lg">
              To deliver exceptional culinary experiences that bring joy to our customers' tables, one meal at a time.
              We believe that great food should be accessible, affordable, and always fresh.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Quality First</h4>
                <p className="text-gray-600">
                  We never compromise on quality. Every ingredient is carefully selected, and every dish is prepared with care.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Excellence</h4>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from recipe development to customer service.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Customer Focus</h4>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. Your satisfaction is our success.
                </p>
              </div>
            </div>
          </div>

          {/* Why Us Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h3>
            <div className="space-y-4 max-w-5xl">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Diverse Menu</h4>
                <p className="text-gray-700">
                  From Indian classics to international favorites, our menu offers something for every palate.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Fresh & Fast</h4>
                <p className="text-gray-700">
                  All our dishes are prepared fresh to order and delivered quickly to maintain quality and taste.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Affordable Pricing</h4>
                <p className="text-gray-700">
                  We believe great food shouldn't break the bank. Enjoy restaurant-quality meals at competitive prices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 relative overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/handmade-bread-dough.jpg"
            alt="Handmade bread dough"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* DECORATION LAYER - Right side floating food */}
        <FloatingFood
          src="/images/vecteezy_indian-food-image_48783105.png"
          alt="Indian food"
          className="right-[30px] top-[-30%] -translate-y-1/2 w-[390px] h-[390px]"
        />
        
        {/* CONTENT LAYER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How it Works</h2>
            <p className="text-xl text-white/90">
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
              <h3 className="text-2xl font-semibold mb-4 text-white">Browse & Select</h3>
              <p className="text-white/90 leading-relaxed">
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
              <h3 className="text-2xl font-semibold mb-4 text-white">Add to Cart & Checkout</h3>
              <p className="text-white/90 leading-relaxed">
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
              <h3 className="text-2xl font-semibold mb-4 text-white">Place Order & Enjoy</h3>
              <p className="text-white/90 leading-relaxed">
                Once you confirm your order, our kitchen team immediately starts preparing your meal fresh.
                You'll receive an order confirmation with your order ID. Track your order status and get
                real-time updates. Our delivery team ensures your food arrives hot and fresh, ready to enjoy.
                Sit back, relax, and savor the flavors!
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Our Cloud Kitchen?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Quality Assured</h4>
                  <p className="text-white/90">
                    Every dish is prepared by experienced chefs using the finest ingredients, 
                    ensuring consistent quality and authentic flavors in every bite.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Wide Variety</h4>
                  <p className="text-white/90">
                    Explore cuisines from around the world - Indian, Chinese, Italian, Mexican, 
                    Arabian, Continental, and more, all available in one place.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Convenient Ordering</h4>
                  <p className="text-white/90">
                    Our easy-to-use platform lets you browse, filter, and order your favorite 
                    dishes with just a few clicks. Track your order in real-time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Flexible Payment</h4>
                  <p className="text-white/90">
                    Choose from multiple payment options including UPI, Card, or Cash on Delivery. 
                    Secure transactions guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-white relative overflow-visible">
        {/* DECORATION LAYER - Right side floating food */}
        <FloatingFood
          src="/images/vecteezy_beautiful-gulab-jamun-dessert-with-sweet-syrup_58056832.png"
          alt="Gulab jamun"
          className="right-[30px] top-[190px] w-[380px] h-[380px]"
        />
        
        {/* CONTENT LAYER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-44">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Get in touch with us!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-gray-600">info@cloudkitchen.com</p>
                    <p className="text-gray-600">support@cloudkitchen.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Phone</h4>
                    <p className="text-gray-600">+91 1234567890</p>
                    <p className="text-gray-600">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Food Street,<br />
                      Kitchen District,<br />
                      City - 560001
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Business Hours</h4>
                <p className="text-gray-700">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                <p className="text-gray-600 text-sm mt-2">
                  We're here to serve you every day of the week!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
