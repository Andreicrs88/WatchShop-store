// compoents
import RegisterForm from "components/forms/RegisterForm";
import { FaCheckCircle } from "react-icons/fa";

// styles
import styles from "./Register.module.css";

function Register() {
  return (
    <div className={styles["register-wrapper"]}>
      <h1>Create new account</h1>
      <p>
        To register for your WatchShop account, please fill in the below form then click 'Register'. Once you have
        registered:
      </p>
      <ul>
        <li>
          <FaCheckCircle />
          <p>We will save your details to make checking out with us even easier</p>
        </li>
        <li>
          <FaCheckCircle />
          <p>You will be able to view all of your orders in the 'My Account' area</p>
        </li>
      </ul>
      <RegisterForm />
    </div>
  );
}

export default Register;
