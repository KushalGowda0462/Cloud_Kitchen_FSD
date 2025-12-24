import mongoose from 'mongoose';
import Dish from '../src/lib/models/Dish';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudkitchen1';

// Local Indian Dishes mapping to /public/assets/photos/Indian
const localIndianDishes = [
  // Veg - Main Course
  { name: 'Masala Dosa', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 120, imageUrl: '/assets/photos/Indian/Veg/Main Course/Masala Dosa.jpeg', description: 'Crispy rice crêpe filled with spiced potato mash.' },
  { name: 'Palak Paneer', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 210, imageUrl: '/assets/photos/Indian/Veg/Main Course/Palak-Paneer.jpg', description: 'Cottage cheese cubes in a thick paste made from puréed spinach.' },
  { name: 'Rava Idli', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 90, imageUrl: '/assets/photos/Indian/Veg/Main Course/Rava Idli.jpeg', description: 'Steamed semolina cakes served with chutney and sambar.' },
  { name: 'Veg Thali', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 250, imageUrl: '/assets/photos/Indian/Veg/Main Course/Veg Thali.avif', description: 'A complete meal with various curries, dal, rice, and bread.' },
  { name: 'Paneer Pasanda', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 230, imageUrl: '/assets/photos/Indian/Veg/Main Course/paneer-pasanda-recipe.jpg', description: 'Rich and creamy paneer dish with a flavorful gravy.' },
  { name: 'Veg Pulao', cuisine: 'Indian', category: 'Main Course', isVeg: true, price: 180, imageUrl: '/assets/photos/Indian/Veg/Main Course/veg pulao.jpg', description: 'Fragrant basmati rice cooked with mixed vegetables.' },

  // Veg - Starters
  { name: 'Samosa', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 40, imageUrl: '/assets/photos/Indian/Veg/Starters/Samosa.jpeg', description: 'Crispy pastry filled with spiced potatoes and peas.' },
  { name: 'Dahi Bhalla', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 100, imageUrl: '/assets/photos/Indian/Veg/Starters/cropped-Delhi_Dahi_bhalla-2687.jpg', description: 'Lentil fritters soaked in creamy yogurt and topped with chutneys.' },
  { name: 'Hara Bhara Kebab', cuisine: 'Indian', category: 'Starters', isVeg: true, price: 150, imageUrl: '/assets/photos/Indian/Veg/Starters/hara-bhara-kebab_.jpg', description: 'Healthy and delicious spinach and green pea kebabs.' },

  // Non-Veg - Main Course
  { name: 'Butter Chicken', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 320, imageUrl: '/assets/photos/Indian/Non-Veg/Main Course/Butter Chicken.jpeg', description: 'Tender chicken in a creamy, buttery tomato sauce.' },
  { name: 'Chicken Curry', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 280, imageUrl: '/assets/photos/Indian/Non-Veg/Main Course/Chicken Curry.jpeg', description: 'Classic home-style chicken curry with aromatic spices.' },
  { name: 'Chicken Biryani', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 300, imageUrl: '/assets/photos/Indian/Non-Veg/Main Course/Chicken-Biryani-Recipe-01-1-500x500.jpg', description: 'Signature spice-infused rice with succulent chicken pieces.' },
  { name: 'Shrimp Pulao', cuisine: 'Indian', category: 'Main Course', isVeg: false, price: 350, imageUrl: '/assets/photos/Indian/Non-Veg/Main Course/Shrimp Pulao.jpeg', description: 'Delicate shrimp cooked with basmati rice and mild spices.' },

  // Non-Veg - Starters
  { name: 'Mutton Tandoori', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 400, imageUrl: '/assets/photos/Indian/Non-Veg/Starters/Mutton Tandoori.webp', description: 'Mutton pieces marinated in yogurt and spices, grilled in a tandoor.' },
  { name: 'Garlic Chicken', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 220, imageUrl: '/assets/photos/Indian/Non-Veg/Starters/garlic-chicken.jpg', description: 'Zesty chicken starters loaded with roasted garlic flavor.' },
  { name: 'Tandoori Chicken', cuisine: 'Indian', category: 'Starters', isVeg: false, price: 250, imageUrl: '/assets/photos/Indian/Non-Veg/Starters/tandoori-chicken.webp', description: 'The legendary roasted chicken marinated in classic tandoori masala.' },
];

// Added specific high-quality desserts to ensure visibility
const manualDesserts = [
  {
    name: 'Gulab Jamun',
    cuisine: 'Desserts',
    category: 'Main Course',
    isVeg: true,
    price: 90,
    imageUrl: '/assets/photos/Indian/Indian snacks Photos - Download Free High-Quality Pictures _ Freepik.jpg',
    description: 'Soft, melt-in-your-mouth milk solid balls soaked in rose-flavored syrup.'
  },
  { name: 'Chocolate Lava Cake', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 180, imageUrl: 'https://www.themealdb.com/images/media/meals/ytme8t1764111401.jpg', description: 'Decadent chocolate cake with a gooey, molten center.' },
  { name: 'Cheesecake', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 220, imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', description: 'Creamy New York style cheesecake with a Graham cracker crust.' },
  { name: 'Brownie with Ice Cream', cuisine: 'Desserts', category: 'Main Course', isVeg: true, price: 150, imageUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80', description: 'Warm fudgy brownie topped with a scoop of vanilla ice cream.' },
];

const worldCuisineMapping = [
  { ui: 'Chinese', apiType: 'area', apiValue: 'Chinese' },
  { ui: 'Italian', apiType: 'area', apiValue: 'Italian' },
  { ui: 'Mexican', apiType: 'area', apiValue: 'Mexican' },
  { ui: 'Arabian', apiType: 'area', apiValue: 'Egyptian' },
  { ui: 'Desserts', apiType: 'category', apiValue: 'Dessert' }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully');

    await Dish.deleteMany({});
    console.log('Cleared existing dishes');

    const allDishes = [
      ...localIndianDishes.map(d => ({ ...d, isAvailable: true })),
      ...manualDesserts.map(d => ({ ...d, isAvailable: true }))
    ];

    for (const mapping of worldCuisineMapping) {
      try {
        console.log(`Fetching ${mapping.ui} dishes...`);
        const url = mapping.apiType === 'area'
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mapping.apiValue}`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mapping.apiValue}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.meals) {
          const mealsToFetch = data.meals.slice(0, 10);
          let addedCount = 0;

          for (let i = 0; i < mealsToFetch.length && addedCount < 6; i++) {
            const meal = mealsToFetch[i];

            // Skip manual duplicates
            if (manualDesserts.some(md => md.name.toLowerCase() === meal.strMeal.toLowerCase())) continue;

            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            const detailData = await detailResponse.json();
            const fullMeal = detailData.meals[0];

            // STRICT BEEF FILTER
            if (
              fullMeal.strCategory === 'Beef' ||
              fullMeal.strMeal.toLowerCase().includes('beef') ||
              (fullMeal.strInstructions && fullMeal.strInstructions.toLowerCase().includes('beef'))
            ) {
              console.log(`Skipping beef item: ${fullMeal.strMeal}`);
              continue;
            }

            let category = 'Main Course';
            if (mapping.ui !== 'Desserts' && addedCount < 2) {
              category = 'Starters';
            }

            allDishes.push({
              name: fullMeal.strMeal,
              cuisine: mapping.ui,
              // For Desserts, also use 'Main Course' so it passes the 'all' or 'Main Course' filters
              category: mapping.ui === 'Desserts' ? 'Main Course' : category,
              isVeg: ['Vegetarian', 'Dessert'].includes(fullMeal.strCategory) || (fullMeal.strInstructions && fullMeal.strInstructions.toLowerCase().includes('vegetarian')),
              price: Math.floor(Math.random() * (400 - 150 + 1) + 150),
              imageUrl: fullMeal.strMealThumb,
              description: fullMeal.strInstructions ? fullMeal.strInstructions.substring(0, 150).replace(/\r\n/g, ' ') + '...' : 'Delicious ' + fullMeal.strMeal,
              isAvailable: true
            });
            addedCount++;
          }
        }
      } catch (error) {
        console.error(`Error fetching ${mapping.ui}:`, error);
      }
    }

    await Dish.insertMany(allDishes);
    console.log(`Successfully seeded ${allDishes.length} dishes.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();