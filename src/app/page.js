import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="container flex flex-col justify-center mx-auto items-center">
        <h2 className="text-4xl text-white font-bold mb-4 ">
          Browse our blog collection
        </h2>
        <Link
          href={"/blogs"}
          className="bg-white text-sm text-blue-800 font-semibold py-2 px-6 rounded"
        >
          Explore blogs
        </Link>
      </div>
    </div>
  );
}
