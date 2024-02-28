// utils
import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

// components
import { IoCloseSharp } from "react-icons/io5";

//styles
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-backdrop">
      <motion.div
        className={styles["error-container"]}
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 600 }}
      >
        <div className={styles["error-content"]}>
          <div className={styles["icon-container"]}>
            <IoCloseSharp />
          </div>
          <h1>Error</h1>
          <p>{error.message}</p>
        </div>
        <motion.div
          whileHover={{
            scale: 0.9,
            transition: { duration: 0.15, type: "spring", stiffness: 600 },
          }}
          className={styles["link-btn"]}
        >
          <Link to="/">Go back to Home Page</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ErrorPage;
