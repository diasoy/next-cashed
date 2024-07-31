import UpdateCategory from "@/components/categories/editform";
import { getCategoryById } from "@/libs/actions";
import { notFound } from "next/navigation";
import React from "react";

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <UpdateCategory category={category} />
    </div>
  );
};

export default EditCategory;
