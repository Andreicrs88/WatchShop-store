// utils
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// components
import LogInForm from "components/forms/LoginForm";
import { FaCheckCircle } from "react-icons/fa";

// styles
import styles from "./LogIn.module.css";

function LogIn() {
  return (
    <div className={styles["sign-wrapper"]}>
      <div className={styles["login-container"]}>
        <h1>Log In</h1>
        <p>Already registered with WatchShop? Enter your details below to access your account.</p>
        <LogInForm />
      </div>
      <div className={styles["register-container"]}>
        <h1>Register</h1>
        <p>Not registered with WatchShop yet? Set up your account in no time and make ordering with us even easier.</p>
        <p>
          <strong>Why register?</strong>
        </p>
        <ul>
          <li>
            <FaCheckCircle />
            <p>Access exclusive offers via email</p>
          </li>
          <li>
            <FaCheckCircle />
            <p>View your orders history</p>
          </li>
          <li>
            <FaCheckCircle />
            <p>Add items to favorites</p>
          </li>
        </ul>
        <motion.div
          whileHover={{
            scale: 0.93,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
          className={styles["link-btn"]}
        >
          <Link to="/register-user">Create account</Link>
        </motion.div>
      </div>
    </div>
  );
}

export default LogIn;
