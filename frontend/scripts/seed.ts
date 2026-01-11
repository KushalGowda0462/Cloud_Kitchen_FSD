import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Dish from '../src/lib/models/Dish';
import User from '../src/lib/models/User';

// Note: Adjust path to User/Dish models if they are in different locations
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudkitchen';

const SAMPLE_MENU = [
  // --- INDIAN ---
  {
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato and butter sauce with aromatic spices.",
    price: 320,
    isVeg: false,
    cuisineKey: "indian",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Paneer Tikka Masala",
    description: "Grilled paneer cubes simmered in a spicy and flavorful onion-tomato gravy.",
    price: 280,
    isVeg: true,
    cuisineKey: "indian",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Samosa Platter",
    description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney.",
    price: 150,
    isVeg: true,
    cuisineKey: "indian",
    categoryKey: "starters",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken pieces and authentic spices.",
    price: 350,
    isVeg: false,
    cuisineKey: "indian",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
  },
  // --- CHINESE ---
  {
    name: "Schezwan Noodles",
    description: "Stir-fried noodles tossed in spicy Schezwan sauce with fresh vegetables.",
    price: 220,
    isVeg: true,
    cuisineKey: "chinese",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Spring Rolls",
    description: "Crispy fried rolls filled with shredded vegetables and glass noodles.",
    price: 180,
    isVeg: true,
    cuisineKey: "chinese",
    categoryKey: "starters",
    imageUrl: "https://images.unsplash.com/photo-1548507200-dd1e69317b6c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.",
    price: 290,
    isVeg: false,
    cuisineKey: "chinese",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d64d6b636?auto=format&fit=crop&w=800&q=80"
  },
  // --- ITALIAN ---
  {
    name: "Margherita Pizza",
    description: "Classic pizza topped with tomato sauce, fresh mozzarella, and basil.",
    price: 350,
    isVeg: true,
    cuisineKey: "italian",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Pasta Alfredo",
    description: "Penne pasta tossed in a rich and creamy parmesan cheese sauce.",
    price: 290,
    isVeg: true,
    cuisineKey: "italian",
    categoryKey: "main-course",
    imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Bruschetta",
    description: "Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil.",
    price: 200,
    isVeg: true,
    cuisineKey: "italian",
    categoryKey: "starters",
    imageUrl: "https://images.unsplash.com/photo-1572695157363-bc31c5ddf3eb?auto=format&fit=crop&w=800&q=80"
  },
  // --- DESSERTS ---
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten chocolate center.",
    price: 180,
    isVeg: false,
    cuisineKey: "desserts",
    categoryKey: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Gulab Jamun",
    description: "Soft milk solids dumplings soaked in rose-flavored sugar syrup.",
    price: 120,
    isVeg: true,
    cuisineKey: "desserts",
    categoryKey: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80"
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected.');

    console.log('🗑️  Wiping database (Users and Dishes)...');
    await Dish.deleteMany({});
    await User.deleteMany({}); // Optional: Clears users to fix auth state

    console.log('🚀 Seeding new static menu...');
    const dishesToInsert = SAMPLE_MENU.map((item, index) => ({
      ...item,
      source: 'manual',
      sourceId: `manual_${index}`,
      // Creating the cacheKey to satisfy the unique index
      cacheKey: `manual:${index}:${item.cuisineKey}:${item.categoryKey}`
    }));

    await Dish.insertMany(dishesToInsert);
    console.log(`✨ Successfully seeded ${dishesToInsert.length} dishes!`);
    console.log('ℹ️  Users collection cleared. Please sign up again.');
    console.log('👋 Closing connection...');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
