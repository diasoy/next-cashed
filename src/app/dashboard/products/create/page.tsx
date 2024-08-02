"use client";
import CategoriesItem from "@/components/products/item-categories";
import { saveProduct } from "@/libs/actions";
import React from "react";
import { useFormState } from "react-dom";

const Page = ({ query }: { query: string }) => {
  const [state, formAction] = useFormState(saveProduct, null);

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        action={formAction}
        className="p-6 rounded-lg w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="mb-4 text-xl font-semibold text-center">
          Create Product
        </h2>
        <div className="form-control">
          <label htmlFor="image" className="label">
            <span className="label-text">Image</span>
          </label>

          <input
            id="image"
            name="image"
            type="file"
            className="file-input w-full max-w-xs"
          />
        </div>
        <div id="image-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.error?.image}</p>
        </div>{" "}
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Product name"
            className="input input-bordered w-full"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.error?.name}</p>
          </div>
        </div>
        <div className="form-control">
          <CategoriesItem query={query} />
        </div>
        <div className="form-control">
          <label htmlFor="price" className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            name="price"
            id="price"
            type="number"
            placeholder="Enter Product price"
            className="input input-bordered w-full"
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.error?.price}</p>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="active" className="label">
            <span className="label-text">Status</span>
          </label>
          <input
            name="active"
            id="active"
            type="checkbox"
            className="toggle toggle-success"
          />
        </div>
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
