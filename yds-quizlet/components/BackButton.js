import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-block bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition mb-6"
    >
      ⬅ Anasayfa
    </Link>
  );
}