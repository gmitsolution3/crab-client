import { ShoppingCart } from 'lucide-react';
import React from 'react'

export const BookCard = ({count=0}) => {
  return (
    <div className="border border-gray-300 rounded-md bg-[#FEE2E2] px-3 py-2 flex gap-2">
      <ShoppingCart className="text-red-600" /> <span className='text-red-600'>{count}</span>
    </div>
  );
}
