import { getDataCategory } from "@/libs/actions";
import Link from "next/link";
import { DeleteCategory } from "./button";

export async function CategoryList({ query }: { query: string }) {
  const categories = await getDataCategory(query);

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <span
                  className={`badge ${
                    category.active ? "badge-primary" : "badge-error"
                  }`}
                >
                  {category.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="flex justify-start gap-2 py-3">
                <Link
                  href={`/dashboard/categories/edit/${category.id}`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <DeleteCategory id={category.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
