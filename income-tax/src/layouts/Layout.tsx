import { Outlet } from "react-router-dom";
import Header from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Layout() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}