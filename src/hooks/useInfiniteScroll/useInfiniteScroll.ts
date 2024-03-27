import { useState, useEffect } from "react";
import { IPost } from "../../types/posts";

const useInfiniteScroll = (query: number | null, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setError(false);
    try {
      setLoading(true);
      const fetchByPageNumber = async () => {
        // т.к. нет метода для запросов с пагинацией используем общий метод, чтобы не делать много запросов
        await fetch(`https://jsonplaceholder.typicode.com/posts/`)
          .then((res) => res.json() as unknown as IPost[])
          .then((posts) => {
            let startIndex = 0;
            let finishIndex = 0;
            // есть поисковый параметр
            if (query && !isNaN(query)) {
              startIndex = query * 10;
              finishIndex = startIndex + 10 * pageNumber;
            }
            // нет поискового параметра
            else {
              finishIndex = 10 * pageNumber;
            }
            setPosts(
              posts.filter(
                (post, index) => index >= startIndex && index < finishIndex
              )
            );
            if(finishIndex >= 100) setHasMore(false);
            setLoading(false);
          });
      };
      if(shouldLoad) fetchByPageNumber();
      if(pageNumber > 5) setShouldLoad(false);
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }, [query, pageNumber]);

  return { loading, error, posts, shouldLoad, setShouldLoad, hasMore };
};

export default useInfiniteScroll;
