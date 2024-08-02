/* eslint-disable @next/next/no-img-element */
import { getDataProduct } from "@/libs/actions";
import Link from "next/link";
import { DeleteProduct } from "../button";
import { FaPen } from "react-icons/fa";

export async function ProductList({ query }: { query: string }) {
  const products = await getDataProduct(query) as { id: number; name: string; image: string; price: number; active: boolean; createdAt: Date; categoryId: number; }[];

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.active ? "Active" : "Inactive"}</td>
              <td>{product.price}</td>
              <td>
                <Link href={`/dashboard/products/${product.id}`}>
                  <a className="btn btn-sm btn-circle btn-primary">
                    <FaPen />
                  </a>
                </Link>
                <DeleteProduct id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
