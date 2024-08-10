import { prisma } from "./client";
import {
  MainCategory,
  Post,
  PostWithCategory,
  PostWithSubCategory,
  SubCategory,
} from "./types";

export interface FetchCategoriesReturnType extends MainCategory {
  children: SubCategory[];
}

export async function fetchCategories(): Promise<FetchCategoriesReturnType[]> {
  try {
    const allCategories = await prisma.mainCategory.findMany({
      include: {
        children: true,
      },
    });
    return allCategories;
  } catch (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function fetchMainCategoryPostCount(
  query: string,
): Promise<number> {
  const mainRes = await prisma.mainCategory.findUnique({
    where: { name: query },
    select: { children: { select: { _count: { select: { posts: true } } } } },
  });
  if (!mainRes) throw new Error("No Main Category");

  let counter = 0;
  mainRes.children.forEach(({ _count }) => {
    counter += _count.posts;
  });

  return counter;
}

export async function fetchMainCategoryPosts(
  query: string,
  currentPage: number,
  itemsPerPage: number = 10,
): Promise<PostWithSubCategory[]> {
  try {
    // subCategoryIds
    const mainRes = await prisma.mainCategory.findUnique({
      where: { name: query },
      select: {
        children: true,
      },
    });
    if (!mainRes) throw new Error(`No mainCategory named: ${query}`);
    const subCategoryIds = mainRes.children.map((v) => v.id);
    const subCategoryObject: { [index: number]: string } = {};
    mainRes.children.forEach((v) => {
      subCategoryObject[v.id] = v.name;
    });

    const res = await prisma.post.findMany({
      where: { subCategoryId: { in: subCategoryIds } },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
      orderBy: { createdAt: "desc" },
    });

    const posts: PostWithSubCategory[] = [];
    res?.forEach((v) => {
      posts.push({
        ...v,
        subCategoryName: subCategoryObject[v.subCategoryId],
      });
    });

    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch main category posts");
  }
}

export async function fetchSubCategoryPostCount(query: {
  main: string;
  sub: string;
}): Promise<number> {
  const mainRes = await prisma.mainCategory.findUnique({
    where: { name: query.main },
    select: {
      children: {
        where: { name: query.sub },
        take: 1,
        select: { _count: { select: { posts: true } } },
      },
    },
  });
  if (!mainRes) throw new Error("No Main Category");
  if (mainRes.children.length === 0) throw new Error("No Sub Category");

  return mainRes.children[0]._count.posts;
}

export async function fetchSubCategoryPosts(
  query: { main: string; sub: string },
  currentPage: number,
  itemsPerPage: number = 10,
): Promise<Post[]> {
  const parentId = (
    await prisma.mainCategory.findUnique({
      where: { name: query.main },
      select: { id: true },
    })
  )?.id;

  if (!parentId) {
    throw new Error(`No main category named: ${query.main}`);
  }

  const res = await prisma.subCategory.findFirst({
    where: { mainCategoryId: parentId, name: query.sub },
    select: {
      posts: {
        skip: itemsPerPage * (currentPage - 1),
        take: itemsPerPage,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return res?.posts ?? [];
}

export async function fetchSubCategoryById(
  subCategoryId: number,
): Promise<{ mainCategory: string; subCategory: string }> {
  try {
    const queryRes = await prisma.subCategory.findUnique({
      where: { id: subCategoryId },
      select: {
        name: true,
        parent: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!queryRes) throw new Error("No such subCategory");

    return {
      mainCategory: queryRes.parent.name,
      subCategory: queryRes.name,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCategoryPostCount(query: {
  main: string;
  sub?: string;
}): Promise<number> {
  if (!query.sub) return fetchMainCategoryPostCount(query.main);
  else return fetchSubCategoryPostCount(query as { main: string; sub: string });
}

export async function fetchCategoryPostList(
  query: { main: string; sub?: string },
  currentPage: number,
  itemsPerPage: number = 10,
): Promise<Post[] | PostWithSubCategory[]> {
  if (!query.sub) {
    return fetchMainCategoryPosts(query.main, currentPage, itemsPerPage);
  } else {
    return fetchSubCategoryPosts(
      query as { main: string; sub: string },
      currentPage,
      itemsPerPage,
    );
  }
}

export async function fetchPostById(id: number): Promise<PostWithCategory> {
  try {
    const res = await prisma.post.findUnique({
      where: { id: id },
      include: {
        category: {
          select: { name: true, parent: { select: { name: true } } },
        },
      },
    });

    if (res === null) throw new Error(`No post having id: ${id}`);

    const mainCategory = res.category.parent.name;
    const subCategory = res.category.name;
    const post = res as Post;
    delete (post as any).category;

    return { post, mainCategory, subCategory };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch post by id: ${id}`);
  }
}

export async function createPost(
  title: string,
  content: string,
  subCategoryId: number,
): Promise<Post> {
  try {
    const res = await prisma.post.create({
      data: {
        title: title,
        content: content,
        subCategoryId: subCategoryId,
      },
    });
    console.log(res);

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
}

export async function updatePost(
  postId: number,
  title: string,
  content: string,
  subCategoryId: number,
): Promise<Post> {
  try {
    const res = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        content: content,
        subCategoryId: subCategoryId,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to udpate post: PID: ${postId}`);
  }
}

export async function deletePost(postId: number) {
  try {
    const res = await prisma.post.delete({
      where: { id: postId },
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
