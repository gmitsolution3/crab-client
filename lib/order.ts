export const getAllOrder = async () => {
  const res = await fetch("http://localhost:5000/create-order/all-product", {
    next: { revalidate: 300 },
  });

  return res.json();
};


export const getOrderById = async(id:string)=>{
  const res = await fetch(`http://localhost:5000/create-order/get-Order/${id}`,{
    next: {revalidate: 300},
  });

  return res.json();
}
