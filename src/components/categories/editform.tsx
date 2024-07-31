"use client";
import { useState } from "react";
import { updateCategory } from "@/libs/actions";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

const UpdateCategory = ({ category }: { category: Category }) => {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [active, setActive] = useState(category.active);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('active', active ? 'on' : 'off');

    const response = await updateCategory(category.id, formData);

    if (response.error) {
      setError(response.error.name);
    } else {
      router.push("/dashboard/categories");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-md">
      <h2 className="mb-4 text-xl font-semibold text-center">Edit Category</h2>
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Category Name</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter category name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <div className="form-control">
        <label htmlFor="active" className="label">
          <span className="label-text">Active</span>
        </label>
        <input
          name="active"
          id="active"
          type="checkbox"
          className="toggle toggle-success"
          checked={active}
          onChange={() => setActive(!active)}
        />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-primary w-full">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateCategory;
