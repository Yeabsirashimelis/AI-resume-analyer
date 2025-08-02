import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-gradient text-2xl font-bold">RESUME-ANALYZER</p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  );
}
