// utils
import { useLoaderData, useNavigation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import OrdersList from "features/orders/components/OrdersList";

// styles
import styles from "./AccountOrders.module.css";
import LoadingSpinner from "components/ui/LoadingSpinner";

function AccountOrders() {
  const userData = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <section>
        <h2 className={styles["orders-title"]}>My orders</h2>
        {navigation.state === "loading" && <LoadingSpinner text="Loading orders" />}
        {!userData ? (
          <p className={styles["fallback-text"]}>You currently have no orders.</p>
        ) : (
          <OrdersList orders={userData} />
        )}
      </section>
    </>
  );
}

export default AccountOrders;

export async function loader() {
  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  if (!currentUserId) {
    return null;
  }

  const colRef = collection(firestoreDB, "users", currentUserId, "userOrders");
  const docSnapshot = await getDocs(colRef);

  if (!docSnapshot) {
    throw Error("Could not load data.");
  }

  const userData = docSnapshot.docs.map((doc) => ({ ...doc.data(), orderId: doc.id }));

  if (docSnapshot.size === 0 || !userData) {
    return null;
  } else {
    return userData;
  }
}
