import { getDeletedProduct } from '@/lib/products';
import React from 'react'
import ProductTable from '../components/allProduct';

const DeletedProducts = async() => {

  const res = await getDeletedProduct();

  const result = res.data;



  const productDescription = {
    title: "Deleted Product",
    subTitle: "Manage your deleted product inventory",
  };

  return (
    <div>
      <ProductTable
        INITIAL_PRODUCTS={result}
        description={productDescription}
      />
    </div>
  );
}

export default DeletedProducts;