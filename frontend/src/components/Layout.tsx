// src/components/Layout.tsx
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="bg-gray-200 dark:bg-gray-700 py-4 text-center text-gray-600 dark:text-gray-400">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Datawow</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;