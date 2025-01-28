export interface IPostUser {
  displayName?: string
}

export interface IPost {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    author: IPostUser,
    createdByUser: IPostUser,
    updatedByUser: IPostUser,
}