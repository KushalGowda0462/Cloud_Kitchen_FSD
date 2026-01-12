import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Dish from '../src/lib/models/Dish';
import { generateCacheKey } from '../src/lib/utils/categoryNormalizer';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudkitchen';

// Paths (relative to frontend directory)
// When running with ts-node/esm, we can use import.meta.url or calculate from process.cwd()
// Since scripts are in frontend/scripts/, going up one level gives us frontend/
const ROOT_DIR = path.resolve(process.cwd());
const SOURCE_DISHES_DIR = path.join(ROOT_DIR, 'dishes');
const TARGET_DISHES_DIR = path.join(ROOT_DIR, 'public', 'dishes');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

/**
 * Convert filename to dish name (Title Case)
 * Example: paneer_tikka.jpg -> "Paneer Tikka"
 */
function filenameToDishName(filename: string): string {
  // Remove extension
  const withoutExt = path.parse(filename).name;
  
  // Replace underscores and hyphens with spaces
  const withSpaces = withoutExt.replace(/[_-]/g, ' ');
  
  // Convert to Title Case
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Normalize cuisine name to key
 */
function normalizeCuisineKey(cuisine: string): string {
  const normalized = cuisine.toLowerCase().trim();
  const mappings: Record<string, string> = {
    'indian': 'indian',
    'chinese': 'chinese',
    'italian': 'italian',
    'mexican': 'mexican',
    'arabian': 'arabian',
    'arabic': 'arabian', // Handle both variations
    'desserts': 'desserts',
  };
  return mappings[normalized] || normalized;
}

/**
 * Normalize category name to key
 */
function normalizeCategoryKey(category: string): string {
  const normalized = category.toLowerCase().trim();
  if (normalized === 'main-course' || normalized === 'main_course' || normalized === 'main course') {
    return 'main-course';
  }
  if (normalized === 'starters' || normalized === 'starter' || normalized === 'appetizers') {
    return 'starters';
  }
  if (normalized === 'desserts' || normalized === 'dessert') {
    return 'desserts';
  }
  return normalized;
}

/**
 * Check if file is an image
 */
function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Recursively copy directory structure and files
 */
async function copyDirectory(src: string, dest: string): Promise<void> {
  // Create destination directory if it doesn't exist
  await fs.promises.mkdir(dest, { recursive: true });

  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isFile() && isImageFile(srcPath)) {
      // Only copy image files
      await fs.promises.copyFile(srcPath, destPath);
      console.log(`  ✓ Copied: ${path.relative(SOURCE_DISHES_DIR, srcPath)}`);
    }
  }
}

/**
 * Get all image files recursively from a directory
 */
async function getImageFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively get files from subdirectories
        const subFiles = await getImageFiles(fullPath, baseDir);
        files.push(...subFiles);
      } else if (entry.isFile() && isImageFile(fullPath)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist, skip silently
  }

  return files;
}

/**
 * Parse path to extract metadata (cuisine, category, isVeg)
 */
interface ParsedMetadata {
  cuisineKey: string;
  categoryKey: string;
  isVeg: boolean;
  relativePath: string;
}

function parseMetadata(filePath: string, baseDir: string): ParsedMetadata {
  const relativePath = path.relative(baseDir, filePath);
  const parts = relativePath.split(path.sep).filter(p => p.length > 0);

  // Handle Desserts exception (top-level folder)
  if (parts.length > 0 && parts[0].toLowerCase() === 'desserts') {
    return {
      cuisineKey: 'desserts',
      categoryKey: 'desserts',
      isVeg: true,
      relativePath: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
    };
  }

  // Standard structure: Cuisine/Veg|Non-Veg/Category/image.jpg
  if (parts.length < 3) {
    throw new Error(`Invalid path structure: ${relativePath}. Expected: Cuisine/Veg|Non-Veg/Category/image.jpg`);
  }

  const cuisine = normalizeCuisineKey(parts[0]);
  const vegStatus = parts[1].toLowerCase();
  const category = normalizeCategoryKey(parts[2]);

  const isVeg = vegStatus === 'veg' || vegStatus === 'vegetarian';

  return {
    cuisineKey: cuisine,
    categoryKey: category,
    isVeg,
    relativePath: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
  };
}

/**
 * Main seeding function
 */
async function seedFromLocalFS() {
  try {
    console.log('🌱 Starting Local File System Seed Operation...\n');

    // Step 1: Check if source directory exists
    console.log('📂 Step 1: Checking source directory...');
    if (!fs.existsSync(SOURCE_DISHES_DIR)) {
      console.error(`❌ Error: Source directory does not exist: ${SOURCE_DISHES_DIR}`);
      console.log(`\n💡 Please create the directory structure:`);
      console.log(`   frontend/dishes/`);
      console.log(`     Indian/`);
      console.log(`       Veg/`);
      console.log(`         Starters/`);
      console.log(`         Main-Course/`);
      console.log(`       Non-Veg/`);
      console.log(`         Starters/`);
      console.log(`         Main-Course/`);
      console.log(`     (Same for Chinese, Italian, Mexican, Arabian)`);
      console.log(`     Desserts/`);
      process.exit(1);
    }
    console.log(`✅ Source directory exists: ${SOURCE_DISHES_DIR}\n`);

    // Step 2: Copy files to public/dishes
    console.log('📋 Step 2: Copying files to public/dishes...');
    console.log(`   Source: ${SOURCE_DISHES_DIR}`);
    console.log(`   Target: ${TARGET_DISHES_DIR}`);
    
    // Remove existing target directory if it exists
    if (fs.existsSync(TARGET_DISHES_DIR)) {
      await fs.promises.rm(TARGET_DISHES_DIR, { recursive: true });
      console.log(`   🗑️  Removed existing ${TARGET_DISHES_DIR}`);
    }

    await copyDirectory(SOURCE_DISHES_DIR, TARGET_DISHES_DIR);
    console.log(`✅ Files copied successfully\n`);

    // Step 3: Scan public/dishes for image files
    console.log('🔍 Step 3: Scanning for image files...');
    const imageFiles = await getImageFiles(TARGET_DISHES_DIR);
    console.log(`✅ Found ${imageFiles.length} image file(s)\n`);

    if (imageFiles.length === 0) {
      console.warn('⚠️  No image files found. Nothing to seed.');
      process.exit(0);
    }

    // Step 4: Connect to MongoDB
    console.log('🔌 Step 4: Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected\n');

    // Step 5: Wipe Dish collection
    console.log('🗑️  Step 5: Clearing existing dishes...');
    const deletedCount = await Dish.deleteMany({});
    console.log(`✅ Deleted ${deletedCount.deletedCount} existing dish(es)\n`);

    // Step 6: Parse and prepare dishes
    console.log('📝 Step 6: Parsing files and generating dish data...');
    const dishes: any[] = [];
    const stats: Record<string, number> = {};

    for (let i = 0; i < imageFiles.length; i++) {
      const filePath = imageFiles[i];
      const filename = path.basename(filePath);

      try {
        // Parse metadata from path
        const metadata = parseMetadata(filePath, TARGET_DISHES_DIR);

        // Generate dish name from filename
        const name = filenameToDishName(filename);

        // Generate random price between 200 and 400
        const price = Math.floor(Math.random() * 201) + 200; // 200-400

        // Generate sourceId (use index + timestamp for uniqueness)
        const sourceId = `local-fs_${Date.now()}_${i}`;

        // Generate cacheKey
        const cacheKey = generateCacheKey('local-fs', sourceId, metadata.cuisineKey, metadata.categoryKey);

        // Web-accessible image URL (relative to public directory)
        const imageUrl = `/dishes/${metadata.relativePath}`;

        // Create dish object
        const dish = {
          source: 'local-fs',
          sourceId,
          name,
          imageUrl,
          description: `${name} (${metadata.categoryKey})`,
          price,
          cuisineKey: metadata.cuisineKey,
          categoryKey: metadata.categoryKey,
          cacheKey,
          isVeg: metadata.isVeg,
        };

        dishes.push(dish);

        // Track statistics
        const statKey = `${metadata.cuisineKey}/${metadata.categoryKey}/${metadata.isVeg ? 'veg' : 'nonveg'}`;
        stats[statKey] = (stats[statKey] || 0) + 1;

        console.log(`  ✓ ${name} (${metadata.cuisineKey} → ${metadata.categoryKey}, ${metadata.isVeg ? 'Veg' : 'Non-Veg'})`);
      } catch (error: any) {
        console.error(`  ✗ Error processing ${filename}: ${error.message}`);
      }
    }

    console.log(`\n✅ Parsed ${dishes.length} dish(es)`);

    // Print statistics
    console.log('\n📊 Statistics by category:');
    for (const [key, count] of Object.entries(stats)) {
      console.log(`   ${key}: ${count} dish(es)`);
    }

    // Step 7: Insert into database
    if (dishes.length > 0) {
      console.log('\n💾 Step 7: Inserting dishes into database...');
      await Dish.insertMany(dishes);
      console.log(`✅ Successfully seeded ${dishes.length} dish(es) into database\n`);
    } else {
      console.log('\n⚠️  No dishes to insert\n');
    }

    // Step 8: Close connection
    console.log('👋 Step 8: Closing database connection...');
    await mongoose.disconnect();
    console.log('✅ Connection closed\n');

    console.log('✨ Seed operation completed successfully!');
    console.log(`\n📁 Image files are available at: ${TARGET_DISHES_DIR}`);
    console.log(`🌐 Web-accessible URLs: /dishes/...`);

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Seed operation failed:');
    console.error(error);
    
    try {
      await mongoose.disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
    
    process.exit(1);
  }
}

// Run the seed function
seedFromLocalFS();

