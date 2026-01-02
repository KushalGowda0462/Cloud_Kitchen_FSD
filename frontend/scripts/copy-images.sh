#!/bin/bash
# Copy dish images to /assets/menu/ with proper naming

cd "$(dirname "$0")/.."

# Create menu directory if it doesn't exist
mkdir -p public/assets/menu

# Copy and rename images (matching seed script names)
# Indian dishes
cp "public/images/dishes/Masala Dosa.jpeg" "public/assets/menu/masala-dosa.jpeg" 2>/dev/null
cp "public/images/dishes/Samosa.jpeg" "public/assets/menu/samosa.jpeg" 2>/dev/null
cp "public/images/dishes/Rava Idli.jpeg" "public/assets/menu/rava-idli.jpeg" 2>/dev/null
cp "public/images/dishes/Butter Chicken.jpeg" "public/assets/menu/butter-chicken.jpeg" 2>/dev/null
cp "public/images/dishes/Chicken Curry.jpeg" "public/assets/menu/chicken-curry.jpeg" 2>/dev/null
cp "public/images/dishes/Shrimp Pulao.jpeg" "public/assets/menu/shrimp-pulao.jpeg" 2>/dev/null
cp "public/images/dishes/Mutton Tandoori.webp" "public/assets/menu/mutton-tandoori.webp" 2>/dev/null
cp "public/images/dishes/tandoori-chicken.webp" "public/assets/menu/tandoori-chicken.webp" 2>/dev/null
cp "public/images/dishes/Chicken Manchuri.jpeg" "public/assets/menu/chicken-manchuri.jpeg" 2>/dev/null
cp "public/images/dishes/Chicken Sticks fry.jpeg" "public/assets/menu/chicken-sticks-fry.jpeg" 2>/dev/null
cp "public/images/dishes/Veg Noodles.jpeg" "public/assets/menu/veg-noodles.jpeg" 2>/dev/null
cp "public/images/dishes/Mushroom Manchuri.jpg" "public/assets/menu/mushroom-manchuri.jpg" 2>/dev/null

echo "Images copied to public/assets/menu/"

