'use client';

interface VegToggleProps {
  vegMode: 'all' | 'veg' | 'nonveg';
  onToggle: (mode: 'all' | 'veg' | 'nonveg') => void;
}

export default function VegToggle({ vegMode, onToggle }: VegToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Filter:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onToggle('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            vegMode === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onToggle('veg')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            vegMode === 'veg'
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => onToggle('nonveg')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            vegMode === 'nonveg'
              ? 'bg-red-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Non-Veg
        </button>
      </div>
    </div>
  );
}

