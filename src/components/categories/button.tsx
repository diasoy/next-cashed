import Link from "next/link";

export function CreateCategory() {
  return (
    <Link href="/dashboard/categories/create" className="btn btn-primary">
      Create Category
    </Link>
  );
}

export function DeleteCategory() {
  return (
    <form action="">
      <button className="btn btn-error">Delete</button>
    </form>
  );
}
