import { auth } from "@/auth";
import Profile from "@/components/Profile";

type Params = { searchParams: Promise<_ISearchQuery> };

const ProfilePage = async ({ searchParams }: Params) => {
  const searchParam = await searchParams;
  const session = await auth();

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">My Profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to your personalized profile page
      </p>
      <Profile searchParam={searchParam} id={session?.user?.id || ""} />
    </section>
  );
};

export default ProfilePage;
