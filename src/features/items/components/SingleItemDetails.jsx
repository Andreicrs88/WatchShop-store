// utils
// import { useState } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useItemInfoModal from "hooks/useItemInfoModal";
import priceFormatter from "utils/formatCurrency";
import { cartActions } from "store/cart-slice";
import { AnimatePresence, motion } from "framer-motion";

// components
import MainButton from "components/ui/MainButton";
import ToggleDropdownItem from "components/ui/ToggleDropdownItem";
import FavoritesButton from "features/favorites/FavoritesButton";
import InfoModal from "components/ui/InfoModal";
import { FaRegCreditCard, FaAward, FaTruck, FaCircleInfo, FaCheck, FaTarp, FaRegStar } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

// styles
import styles from "./SingleItemDetails.module.css";
import SingleItemDetailsDescription from "./SingleItemDetailsDescription";

function SingleItemDetails() {
  const { itemData } = useLoaderData();
  const dispatchFn = useDispatch();
  const { showModal, modalType, addToCart } = useItemInfoModal();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  function handleAddToCart() {
    dispatchFn(cartActions.addItemToCart(itemData));
    addToCart();
  }

  return (
    <Await resolve={itemData}>
      {(loadedData) => {
        return (
          <>
            <AnimatePresence>
              {showModal && (
                <InfoModal
                  text="Item added to cart"
                  modalType={modalType}
                />
              )}
            </AnimatePresence>
            <section className={styles["product-container"]}>
              <div className={styles["product-top"]}>
                <div className={styles["product-images"]}>
                  <img
                    src={require(`assets/images/${loadedData.category}/${loadedData.imageSrc}`)}
                    alt={loadedData.title}
                  />
                </div>
                <div className={styles["product-about"]}>
                  <h1>{loadedData.title}</h1>
                  <p className={styles["item-code"]}>{loadedData.modelCode}</p>
                  <div className={styles["brand-logo"]}>
                    <img
                      src={require(`assets/images/brands/${loadedData.brand}.jpg`)}
                      alt={`${loadedData.brand} logo`}
                    />
                  </div>
                  <p className={styles.price}>
                    <b> {priceFormatter.format(loadedData.price)}</b>
                    <span>(including taxes)</span>
                  </p>
                  <div className={styles.stock}>
                    <FaCheck />
                    <p>In stock</p>
                  </div>
                  <div className={styles["shipping-info"]}>
                    <ul>
                      <li>
                        <FaCircleInfo />
                        <span>
                          <b>Standard delivery</b>: 2 - 4 working days from the moment of confirmation by email. The
                          availability of the product in our store stock is confirmed by email, sent by the Customer
                          Support department.
                        </span>
                      </li>
                      <li>
                        <FaCircleInfo />
                        <span>
                          <b>Parcel locker delivery</b>: 2 - 3 working days from the moment of confirmation by email.
                          The availability of the product in our store stock is confirmed by email, sent by the Customer
                          Support department.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.actions}>
                    <MainButton
                      onClick={handleAddToCart}
                      className={styles["cart-btn"]}
                    >
                      Add to cart
                    </MainButton>
                    {currentUserId ? (
                      <FavoritesButton
                        itemData={loadedData}
                        className={styles["fav-btn-enabled"]}
                        addText={"Add to favorites"}
                        removeText={"Remove from favorites"}
                      />
                    ) : (
                      <div className={styles["disabled-fav-container"]}>
                        <button
                          className={styles["fav-btn-disabled"]}
                          onMouseEnter={() => {
                            setIsTooltipVisible(true);
                          }}
                          onMouseLeave={() => setIsTooltipVisible(false)}
                        >
                          <IoIosHeartEmpty />
                          <p>Add to favorites</p>
                        </button>
                        <AnimatePresence>
                          {isTooltipVisible && (
                            <motion.p
                              key="warning-text-desktop"
                              className={styles["warning-text-desktop"]}
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.25, type: "spring", stiffness: 500 },
                              }}
                              exit={{
                                scale: 0.6,
                                opacity: 0,
                                transition: { duration: 0.15 },
                              }}
                            >
                              Log In to save item to favorites
                            </motion.p>
                          )}
                          <div className={styles["warning-text-mobile"]}>
                            <RiErrorWarningFill />
                            <p>Log In to save item to favorites</p>
                          </div>
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                  <div className={styles["info"]}>
                    <div className={styles["info-item"]}>
                      <FaTruck />
                      Free shipping
                    </div>
                    <div className={styles["info-item"]}>
                      <FaAward />
                      Original product
                    </div>
                    <div className={styles["info-item"]}>
                      <FaTarp />
                      Official distributor
                    </div>
                    <div className={styles["info-item"]}>
                      <FaRegCreditCard />
                      Safe online pay
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["product-bottom"]}>
                <div className={styles.row}>
                  <ToggleDropdownItem
                    isItemExpanded={true}
                    title="Product specifications"
                    titleClass={styles["field-title"]}
                  >
                    <SingleItemDetailsDescription itemData={loadedData} />
                  </ToggleDropdownItem>
                </div>
                <div className={styles.row}>
                  <ToggleDropdownItem
                    isItemExpanded={false}
                    title="Ratings and Reviews"
                    titleClass={styles["field-title"]}
                  >
                    <div className={styles.expandable}>
                      <div className={styles["stars-icons"]}>
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                      <p>There are currently no reviews of this product.</p>
                    </div>
                  </ToggleDropdownItem>
                </div>
                <div className={styles.row}>
                  <ToggleDropdownItem
                    isItemExpanded={false}
                    title="Delivery and Returns"
                    titleClass={styles["field-title"]}
                  >
                    <div className={styles.expandable}>
                      <div className={styles["delivery-info"]}>
                        <div className={styles["delivery-title"]}>Delivery</div>
                        <ul>
                          <li>
                            <div className={styles.underline}>Next day delivery (courier) - 9.99&euro;</div>
                            <p>
                              Place your order before 4pm Monday - Friday for delivery on the next working day. Orders
                              over 500&euro; will require a signature. Delivery to remote locations may take 2 working
                              days.
                            </p>
                          </li>
                          <li>
                            <div className={styles.underline}>Standard delivery (mail) - 4.99&euro;</div>
                            <p>
                              Place your order before 4pm Monday - Friday for delivery within the next two working days
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className={styles["returns-info"]}>
                        <div className={styles["returns-title"]}>Returns</div>
                        <p>
                          To return your item(s) as unwanted, you have 14 days to inform us. From this date, you will
                          have 14 days to return your item(s) to be eligible for a refund. Once your return has been
                          processed, you will be refunded with the original payment method you used to place your order.
                          In order to return any item(s) as unwanted and receive a full refund, the following conditions
                          apply:
                        </p>
                        <ul>
                          <li>The item(s) must be unworn and in the same condition in which they were received</li>
                          <li>
                            Items must be returned in their original packaging, with any instructions, guarantee and
                            extras that were included within it
                          </li>
                          <li>
                            If a visual defect is found with the item(s) upon arrival, you must notify us within 48
                            hours
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ToggleDropdownItem>
                </div>
                <div className={styles.row}>
                  <ToggleDropdownItem
                    isItemExpanded={false}
                    title="Warranty"
                    titleClass={styles["field-title"]}
                  >
                    <div className={styles.expandable}>
                      <p>
                        The products sold by WatchSHOP benefit from warranty according to the details communicated on
                        the page of each product and in the Product Warrant section.
                      </p>
                      <p>
                        The document "INSTRUCTIONS - QUALITY CERTIFICATE - GUARANTEE CERTIFICATE", displayed on the
                        website, represents the guarantee offered by the seller and is applicable to products purchased
                        through the website:
                      </p>
                      <ul>
                        <li>Legal guarantee: 24 months</li>
                        <li>
                          Commercial guarantee: In addition to the guarantee established by law, the seller grants a
                          general commercial guarantee of 30 days from the date of purchase of the product. In the case
                          of watches, the seller grants a special commercial guarantee of 90 days from the date of
                          purchase of the product for the first change of the battery.
                        </li>
                      </ul>
                    </div>
                  </ToggleDropdownItem>
                </div>
              </div>
            </section>
          </>
        );
      }}
    </Await>
  );
}

export default SingleItemDetails;

export async function loadItem(params) {
  const response = await fetch(
    `https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/items/${params.itemId}.json`,
    // itemId is the dinamic path segment defined in the ruter path for the <SingleItemDetails> component
  );

  if (!response.ok) {
    throw Error("Something went wrong. Failed to load item.");
  }

  const resData = await response.json();

  if (!resData) {
    throw Error("Error. Could not find item.");
  }

  return resData;
}

export function loader({ params }) {
  return defer({
    itemData: loadItem(params), // loadItems must return a promise
  });
}
