import mongoose from 'mongoose';
import Dish from '../src/lib/models/Dish';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudkitchen';

const dishes = [
  // Indian Cuisine
  { name: 'Butter Chicken', cuisine: 'Indian', category: 'Mains', isVeg: false, price: 320, imageUrl: 'https://via.placeholder.com/300x200?text=Butter+Chicken', description: 'Creamy tomato-based curry with tender chicken pieces' },
  { name: 'Paneer Tikka', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 180, imageUrl: 'https://via.placeholder.com/300x200?text=Paneer+Tikka', description: 'Marinated cottage cheese grilled to perfection' },
  { name: 'Dal Makhani', cuisine: 'Indian', category: 'Mains', isVeg: true, price: 150, imageUrl: 'https://via.placeholder.com/300x200?text=Dal+Makhani', description: 'Creamy black lentils cooked with butter and cream' },
  { name: 'Biryani', cuisine: 'Indian', category: 'Mains', isVeg: false, price: 280, imageUrl: 'https://via.placeholder.com/300x200?text=Biryani', description: 'Fragrant basmati rice with spiced meat' },
  { name: 'Samosa', cuisine: 'Indian', category: 'Appetizers', isVeg: true, price: 40, imageUrl: 'https://via.placeholder.com/300x200?text=Samosa', description: 'Crispy pastry filled with spiced potatoes' },
  { name: 'Mango Lassi', cuisine: 'Indian', category: 'Beverages', isVeg: true, price: 80, imageUrl: 'https://via.placeholder.com/300x200?text=Mango+Lassi', description: 'Refreshing yogurt drink with mango' },
  { name: 'Gulab Jamun', cuisine: 'Indian', category: 'Desserts', isVeg: true, price: 90, imageUrl: 'https://via.placeholder.com/300x200?text=Gulab+Jamun', description: 'Sweet milk dumplings in sugar syrup' },

  // Chinese Cuisine
  { name: 'Kung Pao Chicken', cuisine: 'Chinese', category: 'Mains', isVeg: false, price: 280, imageUrl: 'https://via.placeholder.com/300x200?text=Kung+Pao+Chicken', description: 'Spicy stir-fried chicken with peanuts' },
  { name: 'Spring Rolls', cuisine: 'Chinese', category: 'Starters', isVeg: true, price: 120, imageUrl: 'https://via.placeholder.com/300x200?text=Spring+Rolls', description: 'Crispy vegetable rolls with dipping sauce' },
  { name: 'Sweet and Sour Pork', cuisine: 'Chinese', category: 'Mains', isVeg: false, price: 300, imageUrl: 'https://via.placeholder.com/300x200?text=Sweet+and+Sour+Pork', description: 'Tender pork in tangy sweet and sour sauce' },
  { name: 'Mapo Tofu', cuisine: 'Chinese', category: 'Mains', isVeg: true, price: 200, imageUrl: 'https://via.placeholder.com/300x200?text=Mapo+Tofu', description: 'Spicy Sichuan tofu in chili sauce' },
  { name: 'Dim Sum', cuisine: 'Chinese', category: 'Appetizers', isVeg: false, price: 180, imageUrl: 'https://via.placeholder.com/300x200?text=Dim+Sum', description: 'Steamed dumplings with various fillings' },
  { name: 'Green Tea', cuisine: 'Chinese', category: 'Beverages', isVeg: true, price: 60, imageUrl: 'https://via.placeholder.com/300x200?text=Green+Tea', description: 'Traditional Chinese green tea' },

  // Italian Cuisine
  { name: 'Margherita Pizza', cuisine: 'Italian', category: 'Mains', isVeg: true, price: 250, imageUrl: 'https://via.placeholder.com/300x200?text=Margherita+Pizza', description: 'Classic pizza with tomato, mozzarella, and basil' },
  { name: 'Chicken Alfredo Pasta', cuisine: 'Italian', category: 'Mains', isVeg: false, price: 320, imageUrl: 'https://via.placeholder.com/300x200?text=Chicken+Alfredo', description: 'Creamy pasta with grilled chicken' },
  { name: 'Bruschetta', cuisine: 'Italian', category: 'Starters', isVeg: true, price: 150, imageUrl: 'https://via.placeholder.com/300x200?text=Bruschetta', description: 'Toasted bread with fresh tomatoes and basil' },
  { name: 'Lasagna', cuisine: 'Italian', category: 'Mains', isVeg: false, price: 350, imageUrl: 'https://via.placeholder.com/300x200?text=Lasagna', description: 'Layered pasta with meat and cheese' },
  { name: 'Tiramisu', cuisine: 'Italian', category: 'Desserts', isVeg: true, price: 180, imageUrl: 'https://via.placeholder.com/300x200?text=Tiramisu', description: 'Coffee-flavored Italian dessert' },
  { name: 'Espresso', cuisine: 'Italian', category: 'Beverages', isVeg: true, price: 80, imageUrl: 'https://via.placeholder.com/300x200?text=Espresso', description: 'Strong Italian coffee' },

  // Mexican Cuisine
  { name: 'Tacos', cuisine: 'Mexican', category: 'Mains', isVeg: false, price: 220, imageUrl: 'https://via.placeholder.com/300x200?text=Tacos', description: 'Soft tortillas with seasoned meat and vegetables' },
  { name: 'Guacamole', cuisine: 'Mexican', category: 'Appetizers', isVeg: true, price: 140, imageUrl: 'https://via.placeholder.com/300x200?text=Guacamole', description: 'Fresh avocado dip with chips' },
  { name: 'Burrito', cuisine: 'Mexican', category: 'Mains', isVeg: false, price: 280, imageUrl: 'https://via.placeholder.com/300x200?text=Burrito', description: 'Large flour tortilla wrapped with fillings' },
  { name: 'Churros', cuisine: 'Mexican', category: 'Desserts', isVeg: true, price: 120, imageUrl: 'https://via.placeholder.com/300x200?text=Churros', description: 'Fried dough pastry with cinnamon sugar' },
  { name: 'Horchata', cuisine: 'Mexican', category: 'Beverages', isVeg: true, price: 90, imageUrl: 'https://via.placeholder.com/300x200?text=Horchata', description: 'Sweet rice milk drink' },

  // Arabian Cuisine
  { name: 'Shawarma', cuisine: 'Arabian', category: 'Mains', isVeg: false, price: 200, imageUrl: 'https://via.placeholder.com/300x200?text=Shawarma', description: 'Spiced meat wrapped in pita bread' },
  { name: 'Hummus', cuisine: 'Arabian', category: 'Appetizers', isVeg: true, price: 130, imageUrl: 'https://via.placeholder.com/300x200?text=Hummus', description: 'Creamy chickpea dip with tahini' },
  { name: 'Falafel', cuisine: 'Arabian', category: 'Starters', isVeg: true, price: 150, imageUrl: 'https://via.placeholder.com/300x200?text=Falafel', description: 'Deep-fried chickpea balls' },
  { name: 'Baklava', cuisine: 'Arabian', category: 'Desserts', isVeg: true, price: 160, imageUrl: 'https://via.placeholder.com/300x200?text=Baklava', description: 'Sweet pastry with nuts and honey' },

  // Continental Cuisine
  { name: 'Grilled Chicken', cuisine: 'Continental', category: 'Mains', isVeg: false, price: 350, imageUrl: 'https://via.placeholder.com/300x200?text=Grilled+Chicken', description: 'Tender grilled chicken breast with herbs' },
  { name: 'Caesar Salad', cuisine: 'Continental', category: 'Starters', isVeg: true, price: 200, imageUrl: 'https://via.placeholder.com/300x200?text=Caesar+Salad', description: 'Fresh romaine lettuce with Caesar dressing' },
  { name: 'Fish and Chips', cuisine: 'Continental', category: 'Mains', isVeg: false, price: 380, imageUrl: 'https://via.placeholder.com/300x200?text=Fish+and+Chips', description: 'Battered fish with crispy fries' },
  { name: 'Chocolate Brownie', cuisine: 'Continental', category: 'Desserts', isVeg: true, price: 150, imageUrl: 'https://via.placeholder.com/300x200?text=Brownie', description: 'Rich chocolate brownie with ice cream' },

  // Beverages
  { name: 'Fresh Orange Juice', cuisine: 'Beverages', category: 'Beverages', isVeg: true, price: 70, imageUrl: 'https://via.placeholder.com/300x200?text=Orange+Juice', description: 'Freshly squeezed orange juice' },
  { name: 'Iced Coffee', cuisine: 'Beverages', category: 'Beverages', isVeg: true, price: 100, imageUrl: 'https://via.placeholder.com/300x200?text=Iced+Coffee', description: 'Chilled coffee with ice and cream' },
  { name: 'Lemonade', cuisine: 'Beverages', category: 'Beverages', isVeg: true, price: 60, imageUrl: 'https://via.placeholder.com/300x200?text=Lemonade', description: 'Refreshing lemon drink' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing dishes
    await Dish.deleteMany({});
    console.log('Cleared existing dishes');

    // Insert new dishes
    await Dish.insertMany(dishes);
    console.log(`Seeded ${dishes.length} dishes successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

