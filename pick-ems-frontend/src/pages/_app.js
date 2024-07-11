import '@/styles/globals.css';
import { globalFont } from '@/styles/fonts.js';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className={globalFont.className}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
