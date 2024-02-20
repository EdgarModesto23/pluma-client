import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1 color="white">Not found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
