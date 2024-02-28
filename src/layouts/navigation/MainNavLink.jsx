// utils
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activePageActions } from "store/active-page-slice";
import { filteredItemsActions } from "store/filtered-items-slice";
import { motion } from "framer-motion";

//styles
import styles from "./MainNavLink.module.css";

function MainNavLink({ text, path }) {
  const dispatchFn = useDispatch();

  function handleClick() {
    dispatchFn(activePageActions.jumpToFirstPage());
    dispatchFn(filteredItemsActions.resetSelectedFilters());
    dispatchFn(filteredItemsActions.resetSort());
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.15, type: "spring", stiffness: 800 },
      }}
      className={styles["link-container"]}
    >
      <NavLink
        className={({ isActive }) => (isActive ? styles["active-link"] : "")}
        to={path}
        onClick={handleClick}
      >
        {text}
      </NavLink>
    </motion.div>
  );
}

export default MainNavLink;
