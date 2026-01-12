#!/bin/bash

# Copy images from Photos & Videos to dishes folder structure
cd "$(dirname "$0")/.."

# Source is in parent directory (root of FSD)
SOURCE_DIR="../Photos & Videos"
TARGET_DIR="dishes"

# Function to copy files with all extensions
copy_files() {
    local src="$1"
    local dest="$2"
    
    if [ -d "$src" ]; then
        # Create destination directory if it doesn't exist
        mkdir -p "$dest"
        
        # Copy all image files
        find "$src" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) -exec cp {} "$dest/" \;
    fi
}

# Copy Indian dishes
echo "Copying Indian dishes..."
copy_files "$SOURCE_DIR/Indian/Veg/Starters" "$TARGET_DIR/Indian/Veg/Starters"
copy_files "$SOURCE_DIR/Indian/Veg/Main Course" "$TARGET_DIR/Indian/Veg/Main-Course"
copy_files "$SOURCE_DIR/Indian/Non-Veg/Starters" "$TARGET_DIR/Indian/Non-Veg/Starters"
copy_files "$SOURCE_DIR/Indian/Non-Veg/Main Course" "$TARGET_DIR/Indian/Non-Veg/Main-Course"

# Copy Chinese dishes
echo "Copying Chinese dishes..."
copy_files "$SOURCE_DIR/Chinese/Veg/Starters" "$TARGET_DIR/Chinese/Veg/Starters"
copy_files "$SOURCE_DIR/Chinese/Veg/Main-Course" "$TARGET_DIR/Chinese/Veg/Main-Course"
copy_files "$SOURCE_DIR/Chinese/Non-Veg/Starters" "$TARGET_DIR/Chinese/Non-Veg/Starters"
copy_files "$SOURCE_DIR/Chinese/Non-Veg/Main-Course" "$TARGET_DIR/Chinese/Non-Veg/Main-Course"

# Copy Italian dishes (if exists)
if [ -d "$SOURCE_DIR/Italian" ]; then
    echo "Copying Italian dishes..."
    copy_files "$SOURCE_DIR/Italian/Veg/Starters" "$TARGET_DIR/Italian/Veg/Starters"
    copy_files "$SOURCE_DIR/Italian/Veg/Main-Course" "$TARGET_DIR/Italian/Veg/Main-Course"
    copy_files "$SOURCE_DIR/Italian/Non-Veg/Starters" "$TARGET_DIR/Italian/Non-Veg/Starters"
    copy_files "$SOURCE_DIR/Italian/Non-Veg/Main-Course" "$TARGET_DIR/Italian/Non-Veg/Main-Course"
fi

# Copy Mexican dishes (if exists)
if [ -d "$SOURCE_DIR/Mexican" ]; then
    echo "Copying Mexican dishes..."
    copy_files "$SOURCE_DIR/Mexican/Veg/Starters" "$TARGET_DIR/Mexican/Veg/Starters"
    copy_files "$SOURCE_DIR/Mexican/Veg/Main-Course" "$TARGET_DIR/Mexican/Veg/Main-Course"
    copy_files "$SOURCE_DIR/Mexican/Non-Veg/Starters" "$TARGET_DIR/Mexican/Non-Veg/Starters"
    copy_files "$SOURCE_DIR/Mexican/Non-Veg/Main-Course" "$TARGET_DIR/Mexican/Non-Veg/Main-Course"
fi

# Copy Arabian dishes (if exists)
if [ -d "$SOURCE_DIR/Arabian" ]; then
    echo "Copying Arabian dishes..."
    copy_files "$SOURCE_DIR/Arabian/Veg/Starters" "$TARGET_DIR/Arabian/Veg/Starters"
    copy_files "$SOURCE_DIR/Arabian/Veg/Main-Course" "$TARGET_DIR/Arabian/Veg/Main-Course"
    copy_files "$SOURCE_DIR/Arabian/Non-Veg/Starters" "$TARGET_DIR/Arabian/Non-Veg/Starters"
    copy_files "$SOURCE_DIR/Arabian/Non-Veg/Main-Course" "$TARGET_DIR/Arabian/Non-Veg/Main-Course"
fi

# Copy Desserts
if [ -d "$SOURCE_DIR/Desserts" ]; then
    echo "Copying Desserts..."
    copy_files "$SOURCE_DIR/Desserts" "$TARGET_DIR/Desserts"
fi

echo "✅ Copy complete!"
echo "Files copied: $(find $TARGET_DIR -type f | wc -l | xargs)"

