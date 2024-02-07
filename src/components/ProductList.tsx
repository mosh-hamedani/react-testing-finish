import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Product } from "../entities";
import { useQuery } from "react-query";

const ProductList = () => {
  const { data: products, error, isLoading } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => axios.get<Product[]>('/products').then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (products!.length === 0) return <p>No products available.</p>;

  return (
    <ul>
      {products!.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
