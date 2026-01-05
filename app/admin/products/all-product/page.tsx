import { AllProduct } from '@/lib/products';
import React from 'react'
import ProductTable from '../components/allProduct';

const AllProductShow =async () => {

  const res = await AllProduct();
    const products = res.data;


  return (
    <div>
      <ProductTable INITIAL_PRODUCTS={products} />
    </div>
  );
}

export default AllProductShow;