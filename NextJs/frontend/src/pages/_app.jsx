import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <main className="bg-white">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
