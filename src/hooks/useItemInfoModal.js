// utils
import { useState } from "react";

function useItemInfoModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  function displayModal() {
    setShowModal(true);

    // hide the modal after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  }

  // when an item is added to cart
  function addToCart() {
    setModalType("cart");
    displayModal();
  }

  // when an item is added/removed from favorites
  function toggleFavorites() {
    setModalType("favorites");
    displayModal();
  }
  
  // when the user click favorites button, but is logged out
  function warningFavorites() {
    setModalType("info");
    displayModal();
  }

  return {
    showModal,
    modalType,
    addToCart,
    toggleFavorites,
    warningFavorites,
  };
}

export default useItemInfoModal;
