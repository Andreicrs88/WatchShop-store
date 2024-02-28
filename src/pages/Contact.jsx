// utils
import { Link } from "react-router-dom";

// components
import ContactForm from "components/forms/ContactForm";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";

// styles
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <h1 className={styles["page-title"]}>Contact</h1>
      <div className={styles["contact-wrapper"]}>
        <div className={styles["top-section"]}>
          <div className={styles.top}>
            <div className={styles["contact-info-container"]}>
              <div className={styles["contact-field"]}>
                <div className={styles["field-title"]}>
                  <FaLocationDot />
                  <span>Address</span>
                </div>
                <p>Spl. Independentei, 17, Bucuresti-Sector 5</p>
              </div>
              <div className={styles["contact-field"]}>
                <div className={styles["field-title"]}>
                  <FaPhone />
                  <span>Phone number</span>
                </div>
                <p>+40 021.688.888</p>
              </div>
              <div className={styles["contact-field"]}>
                <div className={styles["field-title"]}>
                  <FaEnvelope />
                  <span>E-mail address</span>
                </div>
                <p>watchshop-store@store.com</p>
              </div>
              <div className={styles["contact-field"]}>
                <div className={styles["field-title"]}>
                  <FaClock />
                  <span>Showroom schedule</span>
                </div>
                <p>
                  <b>Mon - Fr</b> - 8:00 - 20:00
                </p>
                <p>
                  <b>Sat - Sun</b> - closed
                </p>
              </div>
            </div>
            <div className={styles["social-media-container"]}>
              <div className={styles["field-title"]}>Follow us</div>
              <div className={styles["contact-social-media"]}>
                <Link
                  to="#"
                  className={styles["social-icon-container"]}
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="#"
                  className={styles["social-icon-container"]}
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="#"
                  className={styles["social-icon-container"]}
                >
                  <FaXTwitter />
                </Link>
                <Link
                  to="#"
                  className={styles["social-icon-container"]}
                >
                  <TfiYoutube />
                </Link>
                <Link
                  to="#"
                  className={styles["social-icon-container"]}
                >
                  <FaTiktok />
                </Link>
              </div>
            </div>
          </div>
          <h2 className={styles["sub-title"]}>Send us a message</h2>
          <div className={styles["form-container"]}>
            <ContactForm />
          </div>
        </div>
        <div className={styles["bottom-section"]}>
          <h2 className={styles["sub-title"]}>Our location</h2>
          <div className={styles["map-container"]}>
            <iframe
              className={styles.map}
              title="store-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.0603885413057!2d26.090813811905193!3d44.4319234709553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff6a8139dbed%3A0xbfacf3b301aae1ff!2sSplaiul%20Independen%C8%9Bei%2017%2C%20Bucure%C8%99ti%20030167!5e0!3m2!1sen!2sro!4v1703091696912!5m2!1sen!2sro"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
