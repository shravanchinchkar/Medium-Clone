import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/getBlogsHook";
import { BlogsSkeleton } from "../skeleton/BlogsSkeleton";
import { useLognedInUserData } from "../hooks/getLoginedUser";

export const Blogs = () => {
  console.log("Blogs Mounted");
  const { loading, blog } = useBlogs();
  const { initialLetters } = useLognedInUserData();
  console.log(
    "initilas Letters of lognedIn User are from blogs file:",
    initialLetters
  );

  if (loading) {
    return <BlogsSkeleton />;
  } else {
    return (
      <div className="">
        <AppBar initialLetter={initialLetters} />
        {blog.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name}
              createdAt={blog.createdAt}
              title={blog.title}
              content={blog.content}
            />
          );
        })}
      </div>
    );
  }
};
