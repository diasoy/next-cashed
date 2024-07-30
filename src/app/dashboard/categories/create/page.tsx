"use client";
import { saveCategory } from "@/libs/actions";
import React from "react";
import { useFormState } from "react-dom";

const CreateCategory = () => {
  const [state, formAction] = useFormState(saveCategory, null);
  return (
    <div className="flex items-center justify-center mt-20">
      <form action={formAction} className="p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 text-xl font-semibold text-center">
          Create Category
        </h2>
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
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
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

export default CreateCategory;
