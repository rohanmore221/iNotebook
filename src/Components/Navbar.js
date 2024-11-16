import React,{useEffect} from "react";
import { Link ,useLocation,useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
    let location = useLocation();

  useEffect(() => {
  
  }, [location]);
 
  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname==="/home" ? "active":""} `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}` } to="/about">
                  About
                </Link>
                
               
              </li>
              
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
            <Link to="/login" className="btn btn-primary mx-2">Log in</Link>
              <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
              </form>:<button onClick={handlelogout} className="btn btn-primary">logout</button>}
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
