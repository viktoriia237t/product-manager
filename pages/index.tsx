import DefaultLayout from "@/layouts/default";
import NextLink from "next/link";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="max-w-xl text-center mx-auto space-y-6">
              <div className="text-2xl font-semibold">
                  Welcome to your Product Management Dashboard
              </div>

              <div className="text-lg text-gray-600">
                  Organize your products, track progress, and make data-driven decisions.
              </div>

              <div className="text-md text-gray-500">
                  Stay on top of tasks, collaborate with your team, and drive product growth efficiently.
              </div>

              <div className="mt-4">
                  <NextLink className="flex justify-center items-center gap-1 text-black" href="/products">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Get Started
                      </button>
                  </NextLink>
              </div>
          </div>
      </section>
    </DefaultLayout>
  );
}
