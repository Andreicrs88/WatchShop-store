// utils
import { defer, useLoaderData, Await } from "react-router-dom";

// components
import ItemsListLayout from "features/items/components/ItemsListLayout";

function ItemsListWrapper() {
  const { itemsData } = useLoaderData(); // the promise returned form loader()

  return (
    <Await resolve={itemsData}>
      {(loadedData) => {
        return <ItemsListLayout fetchedItems={loadedData} />;
      }}
    </Await>
  );
}

export default ItemsListWrapper;

async function loadItems() {
  const response = await fetch("https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/items.json");

  const resData = await response.json();

  if (!response.ok || !resData) {
    throw new Error("Something went wrong. Could not load items.");
  }

  return resData;
}

export function loader() {
  return defer({
    itemsData: loadItems(), // loadItems must return a promise beacause resolve prop from <Await> components expects a promise
  });
}
