"use client";

import { useQuery } from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export default function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <p className="flex items-center justify-center mt-10"> Loading...</p>
    );

  if (isError)
    return (
      <p className="flex items-center justify-center mt-10">
        {" "}
        Error: {(error as Error).message}
      </p>
    );

  return (
    <div className="grid grid-rows-[20px_2fr_20px] items-center justify-items-center gap-6 font-sans dark:bg-black">
      {data?.map((post) => (
        <div key={post.id}>
          {" "}
          <h4> Title: {post.title}</h4>
          <p> Body: {post.body}</p>{" "}
        </div>
      ))}
    </div>
  );
}
