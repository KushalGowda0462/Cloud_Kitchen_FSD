export const normalizeCuisine = (cuisine: string): string => {
  if (!cuisine || cuisine === 'all') return 'All';
  return cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase();
};

export const getCuisineKey = (cuisine: string | null | undefined): string => {
  if (!cuisine || cuisine.toLowerCase() === 'all') return 'all';
  return cuisine.toLowerCase().trim();
};

export const getCategoryKey = (category: string | null | undefined): string => {
  if (!category || category.toLowerCase() === 'all') return 'all';

  const lower = category.toLowerCase().trim();

  // Normalize variations
  if (lower === 'mains' || lower === 'main course' || lower === 'main-course' || lower === 'main_course') {
    return 'main-course';
  }
  if (lower === 'starters' || lower === 'appetizers' || lower === 'starter') {
    return 'starters';
  }
  if (lower === 'desserts' || lower === 'dessert') {
    return 'desserts';
  }

  return lower;
};

export const generateCacheKey = (
  source: string,
  sourceId: string | number,
  cuisineKey: string,
  categoryKey: string
): string => {
  return `${source}:${sourceId}:${cuisineKey}:${categoryKey}`;
};
