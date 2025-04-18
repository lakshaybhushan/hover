import AdvancedHoverText from "@/components/advanced-hover-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4 bg-white items-center w-full gap-8">
      <header className="flex items-center justify-end w-full">
        <Link href="https://github.com/lakshaybhushan/hover">
          <Button>
            <FaGithub /> Github
          </Button>
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center gap-2 w-full md:mt-20 mt-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter">
          hover.
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          A buttery smooth text hover effect
        </p>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 min-h-[240px] sm:min-h-[320px] md:min-h-[400px] w-full max-w-xs sm:max-w-md md:max-w-xl flex items-center justify-center border border-gray-200">
        <AdvancedHoverText
          text="You can just ship things..."
          minWeight={200}
          maxWeight={900}
        />
      </div>
      <footer className="text-center text-gray-600 fixed bottom-4 left-0 w-full pt-4 text-xs sm:text-sm md:text-base border-t border-gray-200">
        Made with{" "}
        <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer">
          <span className="underline underline-offset-4 hover:text-gray-900">
            v0.dev
          </span>
        </Link>{" "}
        by{" "}
        <Link
          href="https://x.com/blakssh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="underline underline-offset-4 hover:text-gray-900">
            Lakshay Bhushan
          </span>
          :)
        </Link>
      </footer>
    </main>
  );
}
