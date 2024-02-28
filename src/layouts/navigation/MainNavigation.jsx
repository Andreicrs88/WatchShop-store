// utils
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import MainNavLink from "./MainNavLink";
import { IoMenu, IoClose } from "react-icons/io5";
import BackdropMenu from "components/ui/BackdropMenu";

// styles
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuVisible(false);
  }, [location.pathname]);

  function handleShowMenu() {
    setIsMenuVisible(true);
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  return (
    <>
      {isMenuVisible && <BackdropMenu onClick={handleCloseMenu} />}
      <div className={styles["menu-icon-container"]}>
        {isMenuVisible ? (
          <IoClose
            onClick={handleCloseMenu}
            className={styles["menu-hamburger-icon"]}
          />
        ) : (
          <IoMenu
            onClick={handleShowMenu}
            className={styles["menu-hamburger-icon"]}
          />
        )}
      </div>
      <div className={`${styles["links-wrapper"]} ${isMenuVisible && styles["active"]}`}>
        <MainNavLink
          text="Home"
          id={"home"}
          path="/"
        />
        <MainNavLink
          text="Men Watches"
          id={"men-watches"}
          path="items/men-watches"
        />
        <MainNavLink
          text="Women Watches"
          id={"women-watches"}
          path="items/women-watches"
        />
        <MainNavLink
          text="Watch Accessories"
          id={"watches-accessories"}
          path="items/watches-accessories"
        />
        <MainNavLink
          text="Contact"
          id={"contact"}
          path="/contact"
        />
      </div>
    </>
  );
}

export default MainNavigation;
