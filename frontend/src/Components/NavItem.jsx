import '../Styles/SNavbar.css';
import { Link } from 'react-router-dom';

export function NavItem({ locate}) {
  const name = locate.toLowerCase();
  let direction;
  if (name === "home") {
    direction = "/menu";
  } else {
    direction = `/menu/${name}`;
  }

  return (
    <li><Link to={direction}>{locate}</Link></li>
  );
}


export default NavItem;