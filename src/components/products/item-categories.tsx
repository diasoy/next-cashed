import { getDataCategory } from "@/libs/actions";
import React from "react";

const CategoriesItem = async ({ query }: { query: string }) => {
  const categories = await getDataCategory(query) as { id: number; name: string; active: boolean; createdAt: Date; }[];
  return (
    <div className="form-control">
      <label htmlFor="category" className="label">
        <span className="label-text">Category</span>
      </label>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Click
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {categories.map((category) => (
            <li key={category.id}>
              <input
                type="radio"
                name="categoryId"
                value={category.id}
                id={`category-${category.id}`}
                className="radio"
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesItem;
