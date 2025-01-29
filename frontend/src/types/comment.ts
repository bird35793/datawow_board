
  export interface ICommentUserDisplayName {
    displayName: string;
  }

  export interface ICommentPostTitle {
    title: string;
  }

  export interface IComment {
    id: number;
    content: string;
    isActive: boolean;
    post: ICommentPostTitle;
    user: ICommentUserDisplayName;
    createdAt: Date;
    updatedAt: Date;
    createdByUser: ICommentUserDisplayName;
    updatedByUser: ICommentUserDisplayName;
  }

  export interface ICommentCreate {
    content: string;
    postId: number;
  }