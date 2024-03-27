import { FC, useEffect, useState } from "react";
import { IPost } from "../../types/posts";
import { useParams } from "react-router-dom";

export const ListPage: FC = () => {
  const params = useParams<{ id: string }>();
  const [postData, setPostData] = useState<IPost>();
  useEffect(() => {
    try {
      const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
          .then((res) => res.json() as unknown as IPost)
          .then((post) => setPostData(post));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {postData ? (
        <>
          <h3>{postData?.title}</h3>
          <br />
          <h2>{postData?.body}</h2>
        </>
      ) : (
        "No data"
      )}
    </div>
  );
};
