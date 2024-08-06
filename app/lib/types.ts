export declare interface PostForCreate {
  title: string;
  content: string;
  subCategoryId: number;
}

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

export declare interface MainCategory {
  id: number;
  name: string;
}

export declare interface SubCategory {
  id: number;
  name: string;
  mainCategoryId: number;
}

export {};
