import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">Arte Digital Floripa</Link>
      <ul>
        <li><Link to="/artistas">Artistas</Link></li>
        <li><Link to="/lugares">Lugares</Link></li>
        <li><Link to="/museu-virtual">Museu Virtual</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
      </ul>
    </nav>
  );
}
