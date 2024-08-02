import { deleteCategory, deleteProduct } from "@/libs/actions";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export function CreateCategory() {
  return (
    <Link href="/dashboard/categories/create" className="btn btn-primary">
      Create Category
    </Link>
  );
}

export function DeleteCategory({id}: {id: number}) {
  const handleDelete = deleteCategory.bind(null, id);
  return (
    <form action={handleDelete}>
      <button className="btn btn-error"><FaTrash /></button>
    </form>
  );
}

export function CreateProduct() {
  return (
    <Link href="/dashboard/products/create" className="btn btn-primary">
      Create Product
    </Link>
  );
}

export function DeleteProduct({id}: {id: number}) {
  const handleDelete = deleteProduct.bind(null, id);
  return (
    <form action={handleDelete}>
      <button className="btn btn-error"><FaTrash /></button>
    </form>
  );
}
