import Profile from "@/components/Profile";

type Params = {
  searchParams: Promise<_ISearchQuery & { user_id: string; name: string }>;
};

const PersonalisedProfilePage = async ({ searchParams }: Params) => {
  const { user_id, name, ...searchParam } = await searchParams;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}&apos;s Profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to {name}&apos;s personalized profile page. Explore {name}
        &apos;s exceptional prompts and be inspired by the power of their
        imagination
      </p>
      <Profile tab="prompts" searchParam={searchParam} id={user_id} />
    </section>
  );
};

export default PersonalisedProfilePage;
