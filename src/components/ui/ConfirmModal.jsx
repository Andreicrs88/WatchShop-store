// utils
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

// components
import { IoIosCheckmarkCircle } from "react-icons/io";

// styles
import styles from "./ConfirmModal.module.css";

const ConfirmModal = forwardRef(function ConfirmModal({ title, text, onButtonClick }, ref) {
  const [isModalActive, setIsModalActive] = useState(false);
  const dialogRef = useRef();

  function closeModal() {
    dialogRef.current.close();
    setIsModalActive(false);
  }

  useImperativeHandle(ref, () => {
    return {
      showModal() {
        setIsModalActive(true);
        dialogRef.current.showModal(); // showModal() is a method available on the <dialog> element that displays the dialog as a modal
      },
      closeModal() {
        setIsModalActive(false);
        dialogRef.current.close(); // close() is a method available on the <dialog> element that closes the dialog
      },
    };
  });

  const dialogClass = isModalActive ? `${styles["confirm-modal"]} active-modal` : `${styles["confirm-modal"]}`;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={dialogClass}
    >
      <IoIosCheckmarkCircle />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{text}</p>
      <button
        className={styles["close-btn"]}
        onClick={onButtonClick ? onButtonClick : closeModal}
      >
        OK
      </button>
    </dialog>,
    document.getElementById("confirm-modal"),
  );
});

export default ConfirmModal;
