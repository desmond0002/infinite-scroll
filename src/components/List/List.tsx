import { useCallback, useRef, useState } from "react";
import { FC } from "react";
import { useInfiniteScroll } from "../../hooks";
import { ListItem } from "../List-item";
import styles from "./List.module.css";

const queryParameters = new URLSearchParams(window.location.search);

const List: FC = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { posts, loading, error, shouldLoad, setShouldLoad, hasMore } =
    useInfiniteScroll(Number(queryParameters.get("page")), pageNumber);

  const observer = useRef<any>();
  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && shouldLoad && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, shouldLoad, hasMore]
  );

  return (
    <div className={styles.wrapper}>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <ListItem
              ref={lastBookElementRef}
              key={String(post.id)}
              post={post}
            />
          );
        } else {
          return <ListItem key={String(post.id)} post={post} />;
        }
      })}
      {pageNumber > 5 && hasMore && (
        <button onClick={() => setShouldLoad(true)}>Загрузить ещё</button>
      )}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default List;
