"use server";
import { z } from 'zod';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { prisma } from "@/libs/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const CategorySchema = z.object({
  name: z.string().min(3),
});

const ProductSchema = z.object({
  name: z.string().min(3),
  image: z.instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.type.startsWith("image/"), { message: "Invalid image format" })
    .refine((file) => file.size < 4000000, { message: "Image size must be less than 2MB" }),
  price: z.string().min(5),
  categoryId: z.number().int().positive(),
});

async function saveImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const imagePath = path.join(process.cwd(), 'public', 'products', file.name);
  fs.writeFileSync(imagePath, buffer);
  return `/products/${file.name}`;
}

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const saveCategory = async (prevSate: any, formData: FormData) => {
  try {
    const validatedFields = CategorySchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }

    await prisma.category.create({
      data: {
        name: formData.get('name') as string,
        active: formData.get('active') === 'on',
      }
    });
  } catch (error) {
    return { message: "Failed to create new category" };
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};

export const saveProduct = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = ProductSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageUrl = await saveImage(formData.get('image') as File);

    await prisma.product.create({
      data: {
        name: formData.get('name') as string,
        image: imageUrl,
        price: parseInt(formData.get('price') as string),
        categoryId: parseInt(formData.get('categoryId') as string),
        active: formData.get('active') === 'on',
      }
    });
  } catch (error) {
    return { message: "Failed to create new product" };
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const getDataCategory = async (query: string = "") => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: query
        },
      },
      orderBy: {
        createdAt: "desc"
      },
    });
    return categories;
  } catch (error) {
    return { message: "Failed to fetch data" };
  }
};

export const getDataProduct = async (query: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query
        },
      },
      orderBy: {
        createdAt: "desc"
      },
    });
    return products;
  } catch (error) {
    return { message: "Failed to fetch data" };
  }
};

export const deleteCategory = async (id: number) => { 
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return { message: "Failed to delete category" };
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};

export const deleteProduct = async (id: number) => {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return { message: "Failed to delete product" };
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch category" };
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch product" };
  }
};

export const updateCategory = async (id: number, formData: FormData) => {
  try {
    const validatedFields = CategorySchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name: formData.get('name') as string,
        active: formData.get('active') === 'on',
      },
    });

    revalidatePath("/dashboard/categories");
    redirect("/dashboard/categories"); 

  } catch (error) {
    console.error(error);
    return { message: "Failed to update category" };
  }
};

export const updateProduct = async (id: number, formData: FormData) => {
  try {
    const validatedFields = ProductSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageUrl = await saveImage(formData.get('image') as File);

    await prisma.product.update({
      where: { id },
      data: {
        name: formData.get('name') as string,
        image: imageUrl,
        price: parseInt(formData.get('price') as string),
        categoryId: parseInt(formData.get('categoryId') as string),
        active: formData.get('active') === 'on',
      },
    });

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");

  } catch (error) {
    console.error(error);
    return { message: "Failed to update product" };
  }
};
