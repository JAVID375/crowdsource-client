import React from "react";
import { Link } from "react-router-dom";
/**
 * Simple Tailwind navbar that matches a blue theme.
 * - Left: logo + brand name
 * - Right: two buttons (Official Login, Citizen Login)
 * Put your logo image in /public/logo.png or change the src below.
 */
export default function NavbarDashboard() {
  return (
    <nav className="bg-black text-white shadow">
      <div className="mx-auto w-11/12 max-w-6xl flex items-center justify-between py-3">
        {/* Left: Logo + Brand */}
        <div className="h-12 flex items-center">
  <img
    src="/logo.png"
    alt="Logo"
    className="h-full w-auto object-contain -mt-1"

  />
</div>



        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          {/* If you use react-router-dom, replace these <button> with <Link> elements (see note below) */}
          

          <Link to="/citizen-login">
  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
    Logout
  </button>
</Link>
        </div>
      </div>
    </nav>
  );
}
