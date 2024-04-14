import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div class="relative overflow-hidden">
      <div
        aria-hidden="true"
        class="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div class="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
        <div class="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"></div>
      </div>

      <div class="relative z-10">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div class="max-w-2xl text-center mx-auto">
            <p class="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent">
              Preline: A vision for 2023
            </p>

            <div class="mt-5 max-w-2xl">
              <h1 class="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                The Intuitive Web Solutions
              </h1>
            </div>

            <div class="mt-5 max-w-3xl">
              <p class="text-lg text-gray-600">
                “Unleashing Creativity: Explore Our Inspiring Blog”.
              </p>
            </div>

            <div class="mt-8 gap-3 flex justify-center">
              <Link
                to="/login"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Get started
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
