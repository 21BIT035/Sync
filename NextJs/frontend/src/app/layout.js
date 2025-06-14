import './globals.css';
import Navbar from '../../components/Navbar.jsx';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'My App',
  description: 'Your Next.js App',
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en" className='bg-white'>
      <body className='bg-white'>
        <Navbar />
         <Toaster position="top-center" />
        <main className='bg-white'>{children}</main>
      </body>
    </html>
    </>
  );
}
