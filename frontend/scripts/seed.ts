import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connectDB from '../src/lib/db';
import Dish from '../src/lib/models/Dish';
import User from '../src/lib/models/User';

// Seed dishes with correct image paths (/assets/menu/)
// Note: Images should be copied to public/assets/menu/ using the copy-images.sh script
const dishes = [
  // Indian - Veg - Main Course
  { name: 'Masala Dosa', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 120, imageUrl: '/assets/menu/masala-dosa.jpeg', description: 'Crispy rice crêpe filled with spiced potato mash.' },
  { name: 'Palak Paneer', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 210, imageUrl: '/assets/menu/palak-paneer.jpg', description: 'Cottage cheese cubes in a thick paste made from puréed spinach.' },
  { name: 'Rava Idli', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 90, imageUrl: '/assets/menu/rava-idli.jpeg', description: 'Steamed semolina cakes served with chutney and sambar.' },
  { name: 'Veg Thali', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 250, imageUrl: '/assets/menu/veg-thali.jpg', description: 'A complete meal with various curries, dal, rice, and bread.' },
  { name: 'Paneer Pasanda', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 230, imageUrl: '/assets/menu/paneer-pasanda.jpg', description: 'Rich and creamy paneer dish with a flavorful gravy.' },
  { name: 'Veg Pulao', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/menu/veg-pulao.jpg', description: 'Fragrant basmati rice cooked with mixed vegetables.' },

  // Indian - Veg - Starters
  { name: 'Samosa', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 40, imageUrl: '/assets/menu/samosa.jpeg', description: 'Crispy pastry filled with spiced potatoes and peas.' },
  { name: 'Dahi Bhalla', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 100, imageUrl: '/assets/menu/dahi-bhalla.jpg', description: 'Lentil fritters soaked in creamy yogurt and topped with chutneys.' },
  { name: 'Hara Bhara Kebab', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 150, imageUrl: '/assets/menu/hara-bhara-kebab.jpg', description: 'Healthy and delicious spinach and green pea kebabs.' },

  // Indian - Non-Veg - Main Course
  { name: 'Butter Chicken', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 320, imageUrl: '/assets/menu/butter-chicken.jpeg', description: 'Tender chicken in a creamy, buttery tomato sauce.' },
  { name: 'Chicken Curry', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 280, imageUrl: '/assets/menu/chicken-curry.jpeg', description: 'Classic home-style chicken curry with aromatic spices.' },
  { name: 'Chicken Biryani', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 300, imageUrl: '/assets/menu/chicken-biryani.jpg', description: 'Signature spice-infused rice with succulent chicken pieces.' },
  { name: 'Shrimp Pulao', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 350, imageUrl: '/assets/menu/shrimp-pulao.jpeg', description: 'Delicate shrimp cooked with basmati rice and mild spices.' },

  // Indian - Non-Veg - Starters
  { name: 'Mutton Tandoori', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 400, imageUrl: '/assets/menu/mutton-tandoori.webp', description: 'Mutton pieces marinated in yogurt and spices, grilled in a tandoor.' },
  { name: 'Garlic Chicken', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 220, imageUrl: '/assets/menu/garlic-chicken.jpg', description: 'Zesty chicken starters loaded with roasted garlic flavor.' },
  { name: 'Tandoori Chicken', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 250, imageUrl: '/assets/menu/tandoori-chicken.webp', description: 'The legendary roasted chicken marinated in classic tandoori masala.' },

  // Chinese - Veg - Main Course
  { name: 'Veg Noodles', cuisine: 'Chinese', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/menu/veg-noodles.jpeg', description: 'Stir-fried noodles with fresh vegetables and savory sauce.' },
  { name: 'Veg Fried Rice', cuisine: 'Chinese', category: 'Main Course', isVeg: true, price: 160, imageUrl: '/assets/menu/veg-fried-rice.jpg', description: 'Fragrant rice stir-fried with mixed vegetables.' },
  { name: 'Manchurian Veg', cuisine: 'Chinese', category: 'Main Course', isVeg: true, price: 200, imageUrl: '/assets/menu/manchurian-veg.jpg', description: 'Crispy vegetable balls in tangy Manchurian sauce.' },

  // Chinese - Veg - Starters
  { name: 'Mushroom Manchuri', cuisine: 'Chinese', category: 'Starters', isVeg: true, price: 150, imageUrl: '/assets/menu/mushroom-manchuri.jpg', description: 'Succulent mushrooms in spicy Manchurian sauce.' },
  { name: 'Spring Rolls', cuisine: 'Chinese', category: 'Starters', isVeg: true, price: 120, imageUrl: '/assets/menu/spring-rolls.jpg', description: 'Crispy rolls filled with vegetables and served with dipping sauce.' },

  // Chinese - Non-Veg - Main Course
  { name: 'Chicken Noodles', cuisine: 'Chinese', category: 'Main Course', isVeg: false, price: 220, imageUrl: '/assets/menu/chicken-noodles.jpg', description: 'Stir-fried noodles with tender chicken pieces.' },
  { name: 'Chicken Fried Rice', cuisine: 'Chinese', category: 'Main Course', isVeg: false, price: 200, imageUrl: '/assets/menu/chicken-fried-rice.jpg', description: 'Flavorful rice with chicken and vegetables.' },

  // Chinese - Non-Veg - Starters
  { name: 'Chicken Manchuri', cuisine: 'Chinese', category: 'Starters', isVeg: false, price: 180, imageUrl: '/assets/menu/chicken-manchuri.jpeg', description: 'Crispy chicken in tangy Manchurian sauce.' },
  { name: 'Chicken Sticks Fry', cuisine: 'Chinese', category: 'Starters', isVeg: false, price: 200, imageUrl: '/assets/menu/chicken-sticks-fry.jpeg', description: 'Crispy fried chicken sticks with spices.' },

  // Italian - Veg - Main Course
  { name: 'Margherita Pizza', cuisine: 'Italian', category: 'Main Course', isVeg: true, price: 280, imageUrl: '/assets/menu/margherita-pizza.png', description: 'Classic pizza with tomato, mozzarella, and basil.' },
  { name: 'Veg Pasta', cuisine: 'Italian', category: 'Main Course', isVeg: true, price: 220, imageUrl: '/assets/menu/veg-pasta.png', description: 'Creamy pasta with mixed vegetables.' },

  // Italian - Non-Veg - Main Course
  { name: 'Chicken Pizza', cuisine: 'Italian', category: 'Main Course', isVeg: false, price: 320, imageUrl: '/assets/menu/chicken-pizza.png', description: 'Delicious pizza topped with chicken and cheese.' },
  { name: 'Chicken Pasta', cuisine: 'Italian', category: 'Main Course', isVeg: false, price: 250, imageUrl: '/assets/menu/chicken-pasta.png', description: 'Creamy pasta with tender chicken pieces.' },

  // Mexican - Veg - Main Course
  { name: 'Veg Tacos', cuisine: 'Mexican', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/menu/veg-tacos.png', description: 'Soft tortillas filled with vegetables and salsa.' },
  { name: 'Veg Burrito', cuisine: 'Mexican', category: 'Main Course', isVeg: true, price: 200, imageUrl: '/assets/menu/veg-burrito.png', description: 'Large tortilla wrap with rice, beans, and vegetables.' },

  // Mexican - Non-Veg - Main Course
  { name: 'Chicken Tacos', cuisine: 'Mexican', category: 'Main Course', isVeg: false, price: 220, imageUrl: '/assets/menu/chicken-tacos.png', description: 'Soft tortillas filled with spiced chicken and salsa.' },
  { name: 'Chicken Burrito', cuisine: 'Mexican', category: 'Main Course', isVeg: false, price: 240, imageUrl: '/assets/menu/chicken-burrito.png', description: 'Large tortilla wrap with chicken, rice, and beans.' },

  // Arabian - Veg - Main Course
  { name: 'Hummus with Pita', cuisine: 'Arabian', category: 'Main Course', isVeg: true, price: 150, imageUrl: '/assets/menu/hummus-pita.png', description: 'Creamy chickpea dip served with warm pita bread.' },
  { name: 'Falafel Wrap', cuisine: 'Arabian', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/menu/falafel-wrap.png', description: 'Crispy falafel balls wrapped in pita with tahini sauce.' },

  // Arabian - Non-Veg - Main Course
  { name: 'Chicken Shawarma', cuisine: 'Arabian', category: 'Main Course', isVeg: false, price: 250, imageUrl: '/assets/menu/chicken-shawarma.png', description: 'Spiced chicken wrapped in pita with garlic sauce.' },
  { name: 'Lamb Kebab', cuisine: 'Arabian', category: 'Main Course', isVeg: false, price: 300, imageUrl: '/assets/menu/lamb-kebab.png', description: 'Tender lamb pieces marinated and grilled to perfection.' },

  // Desserts
  { name: 'Gulab Jamun', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 90, imageUrl: '/assets/menu/gulab-jamun.jpg', description: 'Soft, melt-in-your-mouth milk solid balls soaked in rose-flavored syrup.' },
  { name: 'Chocolate Lava Cake', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/menu/chocolate-lava-cake.jpg', description: 'Decadent chocolate cake with a gooey, molten center.' },
  { name: 'Cheesecake', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 220, imageUrl: '/assets/menu/cheesecake.jpg', description: 'Creamy New York style cheesecake with a Graham cracker crust.' },
  { name: 'Brownie with Ice Cream', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 150, imageUrl: '/assets/menu/brownie-ice-cream.jpg', description: 'Warm fudgy brownie topped with a scoop of vanilla ice cream.' },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected successfully');

    // Clear existing data
    await Dish.deleteMany({});
    console.log('✅ Cleared existing dishes');

    await User.deleteMany({});
    console.log('✅ Cleared existing users');

    // Create admin user
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      email: 'admin@thindipotha.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
    });
    await adminUser.save();
    console.log('✅ Created admin user: admin@thindipotha.com (password: admin123)');

    // Seed dishes
    const dishesWithAvailability = dishes.map(d => ({ ...d, isAvailable: true }));
    await Dish.insertMany(dishesWithAvailability);
    console.log(`✅ Successfully seeded ${dishes.length} dishes`);

    await mongoose.disconnect();
    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
