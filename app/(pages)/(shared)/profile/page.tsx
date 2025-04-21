import { auth } from "@/auth";
import Profile from "@/components/Profile";
import ProfileTabLists from "@/components/profileTabLists";
import { ProfileLoadingSkeleton } from "@/components/skeletons/profileSkeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your prompt contributions.",
};

type Params = { searchParams: Promise<_ISearchQuery & { tab?: ProfileTab }> };

const ProfilePage = async ({ searchParams }: Params) => {
  const searchParam = await searchParams;
  const session = await auth();

  return (
    <section className="w-full sm:max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-left">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            My Profile
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          Welcome to your personalized dashboard. Here you can manage your
          prompts, track engagement, and update your profile settings.
        </p>
      </div>
      <Tabs defaultValue={searchParam.tab || "prompts"} className="w-full">
        <ProfileTabLists />
        <Suspense fallback={<ProfileLoadingSkeleton />}>
          <TabsContent
            value={searchParam.tab || "prompts"}
            className="sm:min-h-[40vh]"
          >
            <Profile
              tab={searchParam.tab || "prompts"}
              searchParam={searchParam}
              id={session?.user?.id || ""}
            />
          </TabsContent>
        </Suspense>
      </Tabs>
    </section>
  );
};

export default ProfilePage;
