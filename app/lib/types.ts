export declare interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  subCategoryId: number;
}

export declare interface PostWithSubCategory extends Post {
  subCategoryName: string;
}