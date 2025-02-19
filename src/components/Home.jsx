import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="app-title">
          Welcome to the <div className="highlight-section">To-Do List</div> App
        </h1>
        <p className="app-description">
          Organize your tasks, manage your time, and be more productive.
        </p>
      </div>
      <div className="features-section">
        <h2>App Features</h2>
        <ul className="features-list">
          <li>Easy task management with a simple UI</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </div>
      <div className="action-buttons">
        <Link to="/login" className="btn btn-login">Login</Link>
        <Link to="/register" className="btn btn-register">Register</Link>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out:</p>
        <p>Email: support@todolist.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <div className="message-section">
        <h2>Message Us</h2>
        <textarea
          className="message-box"
          placeholder="Type your message here..."
          rows="5"
        />
        <button className="btn btn-send">Send</button>
      </div>
    </div>
  );
};

export default Home;