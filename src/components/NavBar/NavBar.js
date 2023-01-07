import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <Link to="/exercises">Exercise History</Link>
    </nav>
  );
}