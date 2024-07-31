import { deleteCategory } from "@/libs/actions";
import Link from "next/link";

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
      <button className="btn btn-error">Delete</button>
    </form>
  );
}
