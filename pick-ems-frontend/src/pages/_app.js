import '@/styles/globals.css'
import { globalFont } from "@/styles/fonts.js";

export default function App({ Component, pageProps }) {
  return (
      <div className={globalFont.className}>
        <Component {...pageProps} />
      </div>
  );
}
