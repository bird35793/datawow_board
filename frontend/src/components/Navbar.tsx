// src/components/Navbar.tsx
import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    // const { user, logout } = useAuth();
    const router = useRouter();

    // const handleLogout = () => {
    //     logout();
    //     router.push('/login');
    // }
  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md">
      <Link href="/" className="text-xl font-bold dark:text-white">Datawow Webboard</Link>
      <div className="flex items-center">
        <Link href="/" className="mr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</Link>
            {user ? (
                <>
                    <Link href="/post/new" className="mr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">New Post</Link>
                    <button onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Logout</button>
                </>
            ):(
                <>
                    <Link href="/login" className="mr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Link>
                    <Link href="/register" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Register</Link>
                </>
            )}

      </div>
    </nav>
  );
};

export default Navbar;