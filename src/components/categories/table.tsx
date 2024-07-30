import { getDataCategory } from "@/libs/actions";
import Link from "next/link";
import { DeleteCategory } from "./button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export async function CategoryList({ query }: { query: string }) {
  const categories = await getDataCategory(query);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; active: any; }, index: number) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.active ? "Active" : "Inactive"}</td>
              <td className="flex justify-center gap-1 py-3">
                <Link
                  href={`/dashboard/categories/edit/${category.id}`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <DeleteCategory />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
