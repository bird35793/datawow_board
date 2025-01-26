// src/app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">Datawow Webboard</Link>
        <nav>
          <Link href="/login" className="px-4 py-2 rounded text-white bg-primary hover:bg-blue-700">Login</Link>
        </nav>
      </div>
    </header>
  );
}