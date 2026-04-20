import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

const publicPages = ["/login", "/register"];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublic = publicPages.includes(router.pathname);

    if (!token && !isPublic) {
      // Not logged in → send to login
      router.push("/login");
    } else if (token && isPublic) {
      // Already logged in → send to home
      router.push("/");
    }
    setChecked(true);
  }, [router.pathname]);

  const isPublic = publicPages.includes(router.pathname);

  if (!checked) return null; // Prevent flash

  return (
    <>
      {!isPublic && <Navbar />}
      <main>
        <Component {...pageProps} />
      </main>
      {!isPublic && <Footer />}
    </>
  );
}