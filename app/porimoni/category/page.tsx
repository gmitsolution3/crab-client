import { getCategories } from '@/lib/categories';
import React from 'react'
import CategoryManagement from '../components/ManageCategory';

const AllCategory = async() => {

    const getAllCategories = await getCategories()


  return (
    <div>
      <CategoryManagement allCategories={getAllCategories.data} />
    </div>
  );
}

export default AllCategory;
