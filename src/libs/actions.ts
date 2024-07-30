"use server";
import { z } from 'zod';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { prisma } from "@/libs/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CategorySchema = z.object({
  name: z.string().min(3),
});

export async function authenticate(
  prevState: any,
  formData: FormData,
) {
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

export const saveCategory = async (
  prevSate: any,
  formData: FormData) => {
  try {
    const validatedFields = CategorySchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    
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
    })
  } catch (error) {
    return { message: "Failed to create new category" };
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};

export const getDataCategory = async (query: string) => {
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
