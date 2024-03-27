import React, { ReactNode } from "react";
import styles from "./List-item.module.css";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../types/posts";

interface ListItemProps {
  post: IPost;
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ post, ...otherProps }, ref) => {
    const navigate = useNavigate();
    return (
      <div
        ref={ref}
        {...otherProps}
        className={styles.wrapper}
        onClick={() => navigate(`/${post.id}`)}
      >
        {post.title}
      </div>
    );
  }
);

export default ListItem;
