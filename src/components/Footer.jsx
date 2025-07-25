import { Link } from "react-router";
import addBtn from "../assets/images/add-button.png"

function Footer() {
  return (
    <Link to="new-note">
      <div 
        style={{backgroundImage: `url(${addBtn})`}} 
        className="bg-cover h-16 w-16 rounded-full absolute right-5 bottom-2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:right-auto"
      ></div>
    </Link>
  );
}

export default Footer;