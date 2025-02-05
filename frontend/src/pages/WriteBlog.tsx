import { AppBar } from "../components/AppBar";
import { useLognedInUserData } from "../hooks/getLoginedUser";
import { AppBarSkeleton } from "../skeleton/AppBarSkeleton";

export const WriteBlog = () => {
  const { initialLetters, loading } = useLognedInUserData();

  if (loading) {
    return <AppBarSkeleton/>
  }
  return (
    <div>
      <AppBar initialLetter={initialLetters} />
      Hello, write the blog here!
    </div>
  );
};
