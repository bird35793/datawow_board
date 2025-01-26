import { ResponseSelectCommentDto } from "@/types";
import React from "react";

const Comment = ({ comment }: { comment: ResponseSelectCommentDto }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            <div className="mt-2 flex justify-between items-center">
                {/* ใช้ createdByUser.displayName */}
                <p className="text-sm text-gray-500 dark:text-gray-400">By: {comment.createdByUser.displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{comment.createdAt.toString()}</p>
            </div>
        </div>
    );
};

export default Comment;