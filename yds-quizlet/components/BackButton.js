import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="flex-1 text-center bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white py-2 rounded-lg font-semibold shadow-md transition flex items-center justify-center"
    >
      ⬅ Anasayfa
    </Link>
  );
}