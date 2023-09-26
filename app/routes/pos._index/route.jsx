import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Header,
  Heading,
  Skeleton,
  FormField,
  Layer,
  DateInput,
  Select,
  TextArea,
  CheckBox,
  Button,
  Grid as GGrid,
  DataSearch,
  Tip,
  Tag as GTag,
  TextInput,
  Text,
  ResponsiveContext,
  Image,
} from "grommet";
import {
  Col,
  Container,
  Grid,
  Loader,
  Form,
  Row,
  Button as RButton,
  IconButton,
  Nav,
  Navbar,
  Tag,
  Stack,
  Divider,
  Modal,
  Input,
  FlexboxGrid,
  List,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import POSHeader from "../../components/layouts/pos/header";
import CurrencyInput from "react-currency-input-field";
import { FaBoxIcon, FaHandsIcon, StatusLabel, Tooltip } from "smarthr-ui";
import DateTimePicker from "react-datetime-picker";
import SelectCurrency from "@paylike/react-currency-select";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import productIcon from "../../../public/default_images/bascket.png";
import styled from "../../components/styled";
import {
  Calculator,
  UserManager,
  Search,
  Edit,
  Favorite,
  Hide,
  Pause,
  Resume,
  Cart,
  Grid as IGrid,
  List as IList,
} from "grommet-icons";
import ItemCard from "../../components/layouts/pos/item";
import itemSeed from "../../components/seeds/itemSeed";
import { uid } from "react-uid";
import POSCartItem from "../../components/layouts/pos/cartItem";
import { CheckOutline, Coupon, Icon, Minus } from "@rsuite/icons";
import EditCartItem from "../../components/layouts/pos/editCartItem";
import { toast } from "react-toastify";
import alert from "alert";
// import { Search } from "@rsuite/icons";
export function loader({ params }) {
  return params;
}

export default function PointOfSale(props) {
  const [loading, setloading] = React.useState(false);
  const [companyData, setCompanyData] = React.useState({
    name: "HPR",
    shops: ["Ph shop", "alcon Shop", "gentle shop"],
    logo: "",
    url: "https://accountgig.com",
  });

  const [profileData, setProfileData] = React.useState({});
  const [loggedInUser, setLoggedInUser] = React.useState({
    username: "kanemanuel",
    isAdmin: true,
    last_name: "kanebi",
    first_name: "emmanuel",
    role: "Administrator",
    defaultProfile: "Obigbo Shop",
  });
  const [profiles, setProfiles] = React.useState([
    "obigbo profile",
    "aba profile",
  ]);
  const [itemsLoading, setItemsLoading] = React.useState(false);
  const [newSession, setNewSession] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);
  const [items, setItems] = React.useState(itemSeed);
  const screenSize = React.useContext(ResponsiveContext);
  const [systemUsers, setSystemUser] = React.useState([
    "kanebi",
    "doffe",
    "imog",
    "tobi",
  ]);

  const [itemsList, setItemsList] = React.useState(itemSeed);
  const [favsOnly, setFavsOnly] = React.useState(false);
  const [screenHeight, setScreenHeight] = React.useState(undefined);
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      onHold: false,
      items: [
        {
          id: 22,
          item: {
            id: 5,
            name: "Pizza",
            price_amount: "1800",
            valuation_rate: "1800",
            image: null,
            min_order_qty: 1,
            allow_negative_stock: true,
            price_currency: "NGN",
            description: "Delicious pizza with various toppings.",
            price: "NGN18000",
            stock_uom: "Unit",
            tax: "22",
            available_stock_quantity: 15,
            barcode: "sdfjso7890jsf",
            userFav: false,
            userPined: true,
            warehouse: "obigbp",
          },
          quantity: 2,
          taxtTotal: "333",
          percDiscount: 0,
          totalPrice: "NGN3600",
        },
        {
          item: {
            id: 8,
            name: "Fish Fillet",
            price_amount: "2200",
            image: null,
            price_currency: "NGN",
            description: "Tender fish fillet.",
            price: "NGN22000",
            stock_uom: "Unit",
            min_order_qty: 1,
            valuation_rate: "2000",
            tax: "8.2",
            allow_negative_stock: false,
            available_stock_quantity: 4,
            barcode: "sdfjso4567jsf",
            userFav: true,
            userPined: false,
          },
          id: 23,
          quantity: 1,
          taxtTotal: "222",
          percDiscount: 0,

          totalPrice: "NGN2200",
        },
      ],
      totalPrice: "NGN2300",
      totalPriceAmount: "2300",
    },
    {
      id: 2,
      onHold: true,
      items: [
        {
          item: {
            id: 11,
            name: "Tacos",
            price_amount: "1700",
            image: null,
            price_currency: "NGN",
            description: "Tasty tacos.",
            price: "NGN17000",
            stock_uom: "Unit",
            available_stock_quantity: 6,
            min_order_qty: 2,
            valuation_rate: "10000",
            barcode: "sdfjso1234jsf",
            userFav: false,
            tax: "9",
            allow_negative_stock: false,
            userPined: true,
            warehouse: "olomoro",
          },
          id: 28,

          quantity: 3,
          taxtTotal: "93",
          percDiscount: 0,
          totalPrice: "NGN5100",
        },
        {
          id: 26,

          item: {
            id: 17,
            name: "Shrimp Scampi",
            price_amount: "2600",
            image: null,
            price_currency: "NGN",
            min_order_qty: 1,
            description: "Scrumptious shrimp scampi.",
            price: "NGN26000",
            allow_negative_stock: true,
            stock_uom: "Unit",
            available_stock_quantity: 3,
            valuation_rate: "2000",
            barcode: "sdfjso5678jsf",
            userFav: false,
            tax: "2.22",
            userPined: true,
            warehouse: "obidgo",
          },
          taxtTotal: "4",
          quantity: 2,
          percDiscount: 0,

          totalPrice: "NGN5200",
        },
      ],
      totalPrice: "NGN10300",
      totalPriceAmount: "10300",
    },
  ]);
  const [cartsHeld, setCartsHeld] = React.useState(false);
  const [activeCart, setActiveCart] = React.useState(cartItems[0]?.id || null);
  const [pseudoActivecart, setPseudoActiveCart] = React.useState(null)
  const [cartsTotal, setCartsTotal] = React.useState(0);
  const [sessionProfile, setSessionProfile] = React.useState({
    defaultCurrency: "NGN",
    shop: "Ellen Store",
    salesAdmin: "Kanebi",
    allowAdminDiscount: true,
    note: "Bla blan bla bla bla bla bla bla i am the son of the most High",
  });

  const [defaultCurrency, setDefaultCurrency] = React.useState(
    sessionProfile?.defaultCurrency,
  );

  const [checkoutType, setCheckoutType] = React.useState("Active");
  const [cartGridView, setCartGridView] = React.useState(false);
  const [itemEditOn, setItemEditOn] = React.useState(false);
  const [currentItemOnEdit, setCurrentItemOnEdit] = React.useState(null);
  const [orderCoupon, setOrderCoupon] = React.useState("");
  const cartOnEditRef = React.useRef(null);

  const [editTargetValue, setEditTargetValue] = React.useState("");
  const [editTargetField, setEditTargetField] = React.useState(null);

  React.useEffect(() => {
    // update the itemsList or origin list
    const newItemsList = itemsList.map(
      (itm) => items.find((prd) => prd.id === itm.id) || itm,
    );
    setItemsList(newItemsList);

    if (typeof document !== undefined) {
      setScreenHeight(document.body.clientHeight);
    }

    var cartsTotalSum = 0;
    const availableCarts = cartItems.filter((crt) => crt.onHold === false);
    for (let i = 0; i < availableCarts.length; i++) {
      const cart = availableCarts[i];
      if (cart.onHold === true && activeCart === cart.id) {
        if (cartItems.filter((itm) => itm.onHold === false).length >= 1) {
          setActiveCart(cartItems.filter((itm) => itm.onHold === false)[0]);
        } else {
          setActiveCart(null);
        }
      }
      var crtItmSum = 0;
      // convert to default currency if necessary
      for (let i = 0; i < cart.items.length; i++) {
        const crtItm = cart.items[i];
        if (+crtItm.percDiscount > 0) {
          crtItmSum +=
            +crtItm.item.price_amount * +crtItm.quantity +
            +(crtItm.quantity * +crtItm.item.tax) -
            (crtItm.percDiscount / 100) *
              (+crtItm.item.price_amount * +crtItm.quantity +
                +(crtItm.quantity * +crtItm.item.tax));
        } else {
          crtItmSum +=
            +crtItm.item.price_amount * +crtItm.quantity +
            +crtItm.quantity * +crtItm.item.tax;
        }
      }
      cartsTotalSum += crtItmSum;
    }

    setCartsTotal(cartsTotalSum.toFixed(2));
  }, [items, cartItems, activeCart]);

  const handleApplyCoupon = () => {};

  const handleMakeDiscount = () => {};

  const handleUpdateCart = (cart) => {
    const newCarts = cartItems.map((crt) => (crt.id !== cart.id ? crt : cart));
    setCartItems(() => [...newCarts]);
  };
  const resetItems = () => {
    setItems(itemsList);
  };
  const handleSearchItems = () => {};

  const handleShowFavOnly = () => {
    if (favsOnly === false) {
      setFavsOnly(true);
      const favList = itemsList.filter((itm) => itm.userFav === true);

      setItems(favList);
    } else {
      setFavsOnly(false);
      resetItems();
    }
  };
  const handleHoldCart = () => {
    const newCarts = [
      ...cartItems.map((cart) => {
        cart.onHold = !cartsHeld;
        return cart;
      }),
    ];
    setCartItems((prev) => newCarts);
    setCartsHeld(!cartsHeld);
  };

  const checkoutButtonStyle = {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "inherit",
    padding: "30px",
    fontSize: "30px",
    backgroundColor: "inherit",
    boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px",
  };

  const handleCartEditSubmit = (val) => {
    const itemOnEdit = currentItemOnEdit;
    itemOnEdit.quantity = val.quantity;
    itemOnEdit.percDiscount = val.percDiscount;
    itemOnEdit.item.price_amount = val.price_amount;
    itemOnEdit.item.warehouse = val.warehouse;
    itemOnEdit.item.stock_uom = val.stock_uom;
    itemOnEdit.item.tax = val.tax;
    // console.log(val);
    // console.log(itemOnEdit);
    const updatedCarts = cartItems.map((crt) =>
      crt.id === itemOnEdit ? itemOnEdit : crt,
    );
    setCartItems((prev) => [...updatedCarts]);
    setItemEditOn(false);
    setCurrentItemOnEdit(null);
  };
  const handleRemoveItemFromCart = ({ item, cart = null }) => {
    var targetCart = {};
    if (cart !== null ) {
    targetCart = cart;
    } else {
      
      
      targetCart =  cartItems.find(crt => crt.id === pseudoActivecart);
    }
    const newItemList = targetCart.items.filter((itm) => itm.id != item.id);
    targetCart.items = newItemList;
    const newCartList = cartItems.map((crt) =>
      crt.id === targetCart.id ? targetCart : crt,
    );
    setCartItems((prev)=>[...newCartList]);
    
    setItemEditOn(false);
    setCurrentItemOnEdit(null);
    return targetCart.items
  };
  const handleKeyInput = (val) => {
    if (
      !["quantity", "remove", "price", "discount", "tax"].includes(val) &&
      editTargetField === null
    ) {
      toast.info("Select a field to edit");
    }
    if (isNaN(val) && val !== "" && val !== ".") {
      switch (val) {
        case "delete":
          setEditTargetValue("");
          handleKeyInput("");
          break;
        case "remove":
          handleRemoveItemFromCart({item:currentItemOnEdit});
          break;
        default:
          setEditTargetField(val);
          break;
      }
    } else {
      setEditTargetValue(String(editTargetValue) + String(val));
      switch (editTargetField) {
        case "quantity":
          if (val !== "") {
            cartOnEditRef.current.setQuantityFunc(val);
          } else if (val === "") {
            cartOnEditRef.current.clearQuantity();
          }
          break;
        case "discount":
          if (val === "") {
            cartOnEditRef.current.clearDiscount();
          } else {
            cartOnEditRef.current.setPercDiscountFunc(val);
          }
          break;
        case "price":
          if (val === "") {
            cartOnEditRef.current.clearPrice();
          } else {
            cartOnEditRef.current.setpriceAmountFunc(val);
          }
          break;
        case "tax":
          if (val === "") {
            cartOnEditRef.current.clearTax();
          } else {
            cartOnEditRef.current.setTaxFunc(val);
          }
          break;

        default:
          break;
      }
    }
  };
  
  const deleteCart =({id})=>{
  const newCarts = cartItems.filter(itm=> itm.id  != id)
  
  setCartItems((prev)=>[...newCarts])
  }
  return (
    <Container
      // style={{
      //             backgroundColor: "#f8d1ff",
      //             backgroundImage:
      //               "radial-gradient(#f745e2 0.5px, transparent 0.5px), radial-gradient(#f745e2 0.5px, #f8d1ff 0.5px)",
      //             backgroundSize: "20px 20px",
      //             backgroundPosition: "0 0,10px 10px",
      //           }}
      style={{ overflowX: "hidden" }}
    >
      <POSHeader
        company={companyData}
        setNewSession={setNewSession}
      ></POSHeader>
      <Grid style={{ width: "90%", height: "100vh" }}>
        <Row style={{ height: "10vh", overflow: "hidden" }}>
          <Col xs={24} lg={34} md={34} className="Pos-Header">
            <Header
              pad={"xsmall"}
              round={{ size: "xsmall" }}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              {/* <GGrid 
              areas={[{name:"left", start:[0,0], end:[0,0]}, {name:"right", start :[1,1], end:[1,1]}]} gap={"small"} 
              rows={["medium", "medium"]} columns={["small", "xsmall"]}> */}
              <Box gridArea="left">
                <Tooltip
                  title="Search items by Name, Item Code or Barcode"
                  message="Search items by Name, Item Code or Barcode"
                >
                  <DataSearch
                    size="inherit"
                    style={{
                      height: "40px",
                      border: "inherit",
                      fontSize: "16px",
                      outline: "none",
                    }}
                    icon={<Search size="16px" />}
                    onChange={() => setSearchActive(false)}
                    onFocus={() =>
                      searchActive === false ? setSearchActive(true) : ""
                    }
                    placeholder="Search Items"
                  />
                </Tooltip>
                <Box
                  style={{
                    position: "absolute",
                    width: "50px",
                    left: "210px",
                    top: "8px",
                  }}
                >
                  <IconButton
                    onClick={handleShowFavOnly}
                    title="Show Favourites only"
                    style={{
                      width: "20px",
                      background: "inherit",
                      textAlign: "center",
                    }}
                  >
                    <Favorite
                      size="20px"
                      color={favsOnly ? "active" : "default"}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Navbar style={{ backgroundColor: "inherit", padding: "10px" }}>
                <Nav title="Put Transaction on Hold" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "10px",

                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    title={cartsHeld ? "Resume All Carts" : "Hold All Carts"}
                    icon={
                      cartsHeld ? (
                        <Resume size="small" />
                      ) : (
                        <Pause size="small" />
                      )
                    }
                    onClick={handleHoldCart}
                  ></IconButton>
                </Nav>
                <Nav title="Open Calculator" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "10px",

                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    icon={<Calculator size="small" />}
                  ></IconButton>
                </Nav>

                <Nav title="Cart Grid View" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "5px",
                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    onClick={() => setCartGridView(!cartGridView)}
                    icon={
                      cartGridView ? (
                        <IList size="small" />
                      ) : (
                        <IGrid size="small" />
                      )
                    }
                  ></IconButton>
                </Nav>
                {itemEditOn && (
                  <Nav title="Hide Item Edit View" pullRight>
                    <IconButton
                      style={{
                        marginLeft: "5px",
                        padding: "6.5px",
                        boxShadow:
                          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      onClick={() => setItemEditOn(false)}
                      icon={<Hide size="20px" />}
                    ></IconButton>
                  </Nav>
                )}
              </Navbar>
              {/* <Box gridArea="right" ></Box>
              </GGrid> */}
            </Header>
          </Col>
        </Row>
        <Row
          gutter={10}
          style={{ marginBottom: "0px", height: "60vh", overflow: "hidden" }}
        >
          <Col sm={24} lg={15} xl={15} md={15} style={{ height: "inherit" }}>
            <Container
              className="Pos-Items-container"
              style={{ height: "inherit" }}
            >
              <Box
                // pad={"small"}
                round={{ size: "xsmall" }}
                style={{
                  display: "block!important",
                  overflow: "hidden",
                  overflowY: "scroll",
                  paddingRight: "0px!important",
                  // paddingLeft: screenSize === "medium" ? "15px" : "5px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  scrollMargin: "0px !important",
                  scrollBehavior: "smooth",
                  scrollbarColor: "pink",
                  scrollbarGutter: "stable",
                  scrollbarWidth: "thin",
                  boxShadow: "rgba(159, 112, 212, 0.2) 0px 7px 29px 0px",
                }}
              >
                {/* Pinned items  */}

                {items.map(
                  (product, index) =>
                    product?.userPined && (
                      <div
                        key={uid(product)}
                        style={{
                          display: "inline-block",
                          // 2.5vw already in use
                          width: "10vw",

                          height:
                            screenHeight && screenHeight < 600
                              ? "27vh"
                              : "22vh",
                          overflow: "hidden",
                          borderRadius: "6px",

                          margin: "0.4vw",
                        }}
                      >
                        <ItemCard
                          itemsList={items}
                          setItemsFunc={setItems}
                          product={product}
                          favsO={favsOnly}
                          originItemList={itemsList}
                        />
                      </div>
                    ),
                )}

                {/* unpined items */}
                {items.map(
                  (product, index) =>
                    !product?.userPined && (
                      <div
                        key={uid(product)}
                        style={{
                          display: "inline-block",
                          // 2.5vw already in use
                          width: "10vw",

                          height:
                            screenHeight && screenHeight < 600
                              ? "27vh"
                              : "22vh",
                          overflow: "hidden",
                          borderRadius: "6px",

                          margin: "0.4vw",
                        }}
                      >
                        <ItemCard
                          itemsList={items}
                          setItemsFunc={setItems}
                          product={product}
                          favsO={favsOnly}
                          originItemList={itemsList}
                        />
                      </div>
                    ),
                )}
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} style={{ height: "inherit" }} lg={9} md={9} xl={9}>
            <Container
              style={{ height: "inherit" }}
              className="Pos-Order-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                // background={"brand"}
                style={{
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  overflow: "hidden",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                  height: "inherit",
                  scrollbarWidth: "thin",
                }}
              >
                <Header>
                  <Heading size="xxsmall" color={"default"} as={"h4"}>
                    Item Carts
                  </Heading>
                </Header>
                {cartItems.map((cart, index) => (
                  <div
                    onClick={() => {
                      cart.onHold === false ? setActiveCart(cart.id) : "";
                      setPseudoActiveCart(cart.id);
                    }}
                    style={{ cursor: "pointer" }}
                    key={index + "cart-" + index}
                  >
                    <POSCartItem
                      setEdit={setItemEditOn}
                      setCurrentEdit={setCurrentItemOnEdit}
                      cart={cart}
                      gridView={cartGridView}
                      deleteCartItem={handleRemoveItemFromCart}
                      handleUpdateCartFunc={handleUpdateCart}
                      handleDeleteCart={deleteCart}
                      defaultCurrencV={defaultCurrency}
                      editOn={itemEditOn}
                      active={cart.id === activeCart}
                    />
                  </div>
                ))}
                {currentItemOnEdit && (
                  <motion.div
                    initial={{
                      position: "absolute",
                      zIndex: 0,
                      top: 0,

                      bottom: 0,

                      // x: 300,
                      width: "100%",
                      opacity: 0,

                      overflow: "hidden",
                    }}
                    animate={{
                      left: itemEditOn ? 0 : 500,
                      right: itemEditOn ? 0 : "",
                      opacity: itemEditOn ? 1 : 0,
                    }}
                    style={{
                      display: itemEditOn ? "block" : "none",
                      height: "inherit",
                    }}
                  >
                    <Box
                      pad={"small"}
                      round={{ size: "3px" }}
                      style={{ height: "inherit" }}
                      background={"box"}
                    >
                      <Header style={{ direction: "rtl" }}>
                        <Box alignSelf="end" align="end" justify="end">
                          <Button
                            pad={"xsmall"}
                            label="Cancel"
                            primary
                            onClick={() => {
                              setItemEditOn(false);
                              setCurrentItemOnEdit(null);
                            }}
                          ></Button>
                        </Box>
                        <Box alignSelf="start" align="end" justify="start">
                          <Stack direction="row">
                            <Heading size="xxsmall" as={"h4"} alignSelf="start">
                              {currentItemOnEdit?.item?.name}
                            </Heading>
                            <Image
                              sizes="xxsmall"
                              height={40}
                              width={40}
                              margin={"xxsmall"}
                              src={currentItemOnEdit?.item.image || productIcon}
                            ></Image>
                          </Stack>
                        </Box>
                      </Header>
                      <Divider style={{ margin: "5px", padding: "2px" }}>
                        Edit Item
                      </Divider>{" "}
                      <EditCartItem
                        ref={cartOnEditRef}
                        handleSubmitCartEdit={handleCartEditSubmit}
                        currentItemOnEditV={currentItemOnEdit}
                        sessionProfileV={sessionProfile}
                        setActiveField={setEditTargetField}
                      />
                    </Box>
                  </motion.div>
                )}
                <Box round={{ size: "20px" }} width={"xlarge"} pad={"small"}>
                  <Stack
                    direction="row"
                    style={{
                      alignContent: "center",
                      width: "100%",
                      alignItems: "center",
                      alignSelf: "center",
                      borderSpacing: "5px",
                      boxShadow:
                        "rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px",
                    }}
                  >
                    {" "}
                    <Divider
                      vertical
                      style={{ margin: "0px", marginRight: "5px" }}
                    />
                    <Heading as={"h3"} size="xxsmall" color={"default"}>
                      Total :
                    </Heading>
                    <Divider
                      vertical
                      style={{
                        margin: "0px",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    <Heading
                      as={"h3"}
                      style={{ padding: "5px" }}
                      size="xxsmall"
                      color={"default"}
                    >
                      {defaultCurrency} {cartsTotal}
                    </Heading>
                    <Divider vertical />
                  </Stack>
                </Box>
                <Divider />
              </Box>
            </Container>
          </Col>
        </Row>
        <Row gutter={10} style={{ height: "30vh", overflow: "hidden" }}>
          <Col
            style={{ marginTop: "10px", height: "inherit" }}
            sm={24}
            lg={15}
            xl={15}
            md={15}
          >
            <Container
              style={{ height: "inherit" }}
              className="Pos-customer-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                style={{ height: "inherit" }}
                background={"brand"}
              >
                Customer Container
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} style={{ height: "inherit" }} lg={9} xl={9} md={9}>
            <Container
              style={{ height: "inherit" }}
              className="Pos-checkout-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                style={{
                  height: "inherit",
                  borderTopRightRadius: "0px",
                  overflowX: "auto",
                  borderTopLeftRadius: "0px",
                  boxShadow:
                    " rgba(135, 112, 133, 0.35) 0px -50px 36px -28px inset rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                }}
              >
                <Box
                  alignContent="center"
                  style={{ padding: "5px", width: "100%" }}
                  // background={{ dark: "#353036", light: "#e4c3eb" }}
                  justify="center"
                  align="center"
                >
                  <Stack direction="row">
                    <Button
                      label={"All Carts"}
                      primary
                      onClick={() => setCheckoutType("All")}
                      style={{
                        backgroundColor: checkoutType !== "All" && "inherit",
                      }}
                    ></Button>

                    <Minus color="#e9adff" />
                    <Button
                      label={"Active Cart"}
                      // background={{ dark: "#a695a3", light: "#FCD8C9" }}

                      onClick={() => {
                        setCheckoutType("Active");
                        cartItems.filter(
                          (crt) =>
                            crt.onHold === false && crt.id !== activeCart,
                        ).length >= 1
                          ? setActiveCart(
                              cartItems.filter(
                                (crt) =>
                                  crt.onHold === false && crt.id !== activeCart,
                              )[0].id,
                            )
                          : "";
                      }}
                      primary
                      style={{
                        opacity: activeCart === null ? "0.5" : 1,
                        backgroundColor: checkoutType !== "Active" && "inherit",
                      }}
                    ></Button>
                  </Stack>
                </Box>
                <Divider style={{ margin: "4px" }} /> {/* Coupon Code  */}
                <Box
                  // width={"70%"}
                  round={{ size: "xxsmall" }}
                  background="box"
                  margin={"small"}
                  style={{ display: "block" }}
                >
                  <Box
                    style={{ display: "inline-block", height: "inherit" }}
                    background={"box"}
                    width={"70%"}
                  >
                    <TextInput
                      round={{ size: "xxsmall" }}
                      style={{
                        background: "inherit",
                        padding: "10px",
                        height: "inherit",
                        outline: "none",
                        border: "none",
                      }}
                      onChange={(e) => setOrderCoupon(e.target.value)}
                      placeholder="Coupon Code"
                      value={orderCoupon}
                      name="coupon"
                    ></TextInput>
                  </Box>
                  <Box
                    width={"30%"}
                    style={{
                      display: "inline-block",
                      backgroundColor: "inherit",
                      height: "inherit",
                    }}
                  >
                    <RButton
                      onClick={handleApplyCoupon}
                      endIcon={<Coupon />}
                      style={{
                        width: "100%",
                        height: "inherit",
                        background: "inherit",

                        padding: "10.5px",
                      }}
                    >
                      Apply
                    </RButton>
                  </Box>
                </Box>
                <Box
                  background={{ dark: "#a695a3", light: "#FCD8C9" }}
                  pad={"none"}
                  style={{
                    height: "10vh",
                    bottom: 0,
                    position: "relative",
                    marginTop: "20px",
                  }}
                >
                  <RButton
                    style={checkoutButtonStyle}
                    startIcon={<Cart color="inherit" />}
                  >
                    {" "}
                    Checkout{" "}
                  </RButton>{" "}
                </Box>
              </Box>
              {itemEditOn && currentItemOnEdit && (
                <motion.div
                  initial={{
                    position: "absolute",
                    zIndex: 0,
                    // x: 300,
                    width: "100%",
                    direction: "rtl",

                    opacity: 0,
                    left: 0,
                    bottom: 0,
                    height: "100%",

                    overflow: "hidden",
                  }}
                  animate={{
                    top: itemEditOn ? 0 : 500,
                    right: itemEditOn ? 0 : "",

                    opacity: itemEditOn ? 1 : 0,
                  }}
                  style={{ display: itemEditOn ? "block" : "none" }}
                >
                  <Box
                    pad={"small"}
                    round={{ size: "3px" }}
                    height={"100%"}
                    background={"box"}
                  >
                    <List
                      style={{
                        scrollbarColor: "pink",
                        scrollbarWidth: "thin",
                        scrollBehavior: "smooth",
                        height: "100%",
                      }}
                    >
                      <List.Item
                        style={{
                          padding: "0px",
                          width: "100%",
                          margin: "0 auto",
                          textAlign: "center ",
                          backgroundColor: "inherit",
                        }}
                      >
                        <RButton
                          style={{
                            height: "6vh",
                            width: "30%",

                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          active={editTargetField === "quantity" ? true : false}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"quantity"}
                        >
                          Quantity
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={3}
                        >
                          3
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={2}
                        >
                          2
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            margin: "2.5px",
                            width: "20%",

                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={1}
                        >
                          {" "}
                          1
                        </RButton>
                      </List.Item>

                      <List.Item
                        style={{
                          padding: "0px",
                          width: "100%",
                          margin: "0 auto",
                          textAlign: "center ",
                          backgroundColor: "inherit",
                        }}
                      >
                        <RButton
                          style={{
                            height: "6vh",

                            width: "30%",
                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"discount"}
                          active={editTargetField === "discount" ? true : false}
                        >
                          Discount
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={6}
                        >
                          6
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={5}
                        >
                          5
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={4}
                        >
                          {" "}
                          4
                        </RButton>
                      </List.Item>
                      <List.Item
                        style={{
                          padding: "0px",
                          width: "100%",
                          margin: "0 auto",
                          textAlign: "center ",
                          backgroundColor: "inherit",
                        }}
                      >
                        <RButton
                          style={{
                            height: "6vh",
                            width: "30%",
                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"price"}
                          active={editTargetField === "price" ? true : false}
                        >
                          Price
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={9}
                        >
                          9
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={8}
                        >
                          8
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={7}
                        >
                          {" "}
                          7
                        </RButton>
                      </List.Item>
                      <List.Item
                        style={{
                          padding: "0px",
                          width: "100%",
                          margin: "0 auto",
                          textAlign: "center ",
                          backgroundColor: "inherit",
                        }}
                      >
                        <RButton
                          style={{
                            height: "6vh",
                            width: "30%",
                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"remove"}
                        >
                          Remove
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"delete"}
                        >
                          Clear
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={0}
                        >
                          0
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "25px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"."}
                        >
                          {" "}
                          .
                        </RButton>
                      </List.Item>
                    </List>
                  </Box>
                </motion.div>
              )}
            </Container>
          </Col>{" "}
        </Row>
      </Grid>
      {loading && <Loader backdrop center></Loader>}
      {newSession && (
        <NewSession
          user={loggedInUser}
          users={systemUsers}
          newSessionVar={newSession}
          setSessionOpen={setNewSession}
          defaultProfile={loggedInUser.defaultProfile}
          profileList={profiles}
          companyShops={companyData.shops}
        />
      )}
    </Container>
  );
}

function NewSession(props) {
  const [closeAutomatically, setCloseAutomatically] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [closeTime, setCloseTime] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const sessionFormRef = React.useRef(null);
  const [profileList, setProfileList] = React.useState(props.profileList);
  const [newProfile, setNewProfile] = React.useState(false);
  const handleStartPOS = () => {
    setLoading(true);
    props.setSessionOpen(false);

    console.log(sessionFormRef.current.root);

    const formData = new FormData(sessionFormRef.current.root);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  const handleCreateProfile = () => {
    setNewProfile(false);
  };
  const StyledDateTimePicker = styled(DateTimePicker)`
    & .react-datetime-picker__wrapper {
      padding: 10px;
      border-color: whitesmoke;
      background: inherit;
      border-radius: 10px;

      width: 100%;
    }
  `;
  const CurrencyField = styled.div`
    background-color: inherit;
    .userCurrencyField {
      width: 100%;
      height: inherit;
      font-size: 15px;
      background-color: inherit;
      color: inherit;
      border: none;
      font-family: inherit;
      padding: 22px;
      font-weight: bold;
    }
  `;
  return (
    <>
      <Layer
        title="Start New POS Session"
        onClose={() => props.setSessionOpen(false)}
        round
        modal={true}
        background="box"
        margin={"medium"}
      >
        {loading && <Loader title="Getting Ready..." backdrop center></Loader>}

        <Box
          height={"xlarge"}
          pad={{ vertical: "small" }}
          style={{ overflow: newProfile ? "hidden" : "auto" }}
        >
          {newProfile && (
            <motion.div animate={{ y: 30 }}>
              <Form>
                <Grid style={{ width: "80%", marginTop: "20px" }}>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={20} lg={20} sm={20}>
                      <Heading color={"default"} size="xxsmall" as={"h3"}>
                        New Profile
                      </Heading>
                    </Col>
                    <Col md={4} lg={4} sm={4}>
                      <Button
                        primary
                        label="Create"
                        onClick={handleCreateProfile}
                      ></Button>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={24} lg={24} sm={24}>
                      <FormField name="shop" label="Shop">
                        <Select
                          placeholder="Select Shop"
                          options={props.companyShops}
                          searchPlaceholder={"find shop"}
                          defaultValue={props.user?.defaultShop}
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={16} lg={16} sm={16}>
                      {" "}
                      <Tooltip message="Only assigned Sales Admin can approve and submit sessions sales">
                        <FormField
                          name="salesAdmin"
                          label="Sales Administrator"
                        >
                          <Select
                            options={props.users}
                            placeholder="Select Sales Admin"
                            searchPlaceholder={"find manager  "}
                          />
                        </FormField>
                      </Tooltip>
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                      <FormField
                        name="allowAdminDiscount"
                        label="Allow Sales Admin Discounts"
                      >
                        <CheckBox />
                      </FormField>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={24} lg={24} sm={24}>
                      {" "}
                      <CurrencyField>
                        <SelectCurrency
                          className="userCurrencyField"
                          selected="USD"
                          placeholder="Select Currency"
                          // name="currency"

                          // required
                          // defaultValue={"USD"}

                          // width={"50%"}
                          // label="Currency"
                        />
                        {/* <Select options={allCurrencies}></Select> */}
                        {/* </> */}
                      </CurrencyField>
                    </Col>
                  </Row>

                  <Row gutter={2} style={{ marginBottom: "20px" }}>
                    <Col md={24} lg={24} sm={24}>
                      <FormField name="note" label="Note">
                        <TextArea name="note" placeholder="Note" rows={2} />
                      </FormField>
                    </Col>
                  </Row>
                </Grid>
              </Form>
            </motion.div>
          )}
          <motion.div
            transition={"2s"}
            whileInView={
              newProfile
                ? { opacity: 0.5, y: 100 }
                : { opacity: 1, animation: "linear", y: 0 }
            }
          >
            <Form ref={sessionFormRef} disabled={newProfile}>
              <Grid style={{ width: "80%", marginTop: "20px" }}>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={20} lg={20} sm={20}>
                    <Heading color={"default"} size="xxsmall" as={"h3"}>
                      Start New POS Session
                    </Heading>
                  </Col>
                  <Col md={4} lg={4} sm={4}>
                    <Button
                      primary
                      label="Start"
                      onClick={handleStartPOS}
                    ></Button>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={24} lg={24} sm={24}>
                    <Select
                      name="profile"
                      placeholder="Select Profile"
                      options={profileList}
                      searchPlaceholder={"find profile"}
                      defaultValue={props.defaultProfile}
                    />

                    <RButton
                      onClick={() => setNewProfile(true)}
                      style={{
                        position: "absolute",
                        border: "0.5px solid inherit",
                        right: "0",
                        width: "150px",
                        height: "70px",
                      }}
                    >
                      New Profile
                    </RButton>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={24} lg={24} sm={24}>
                    <FormField name="openingTime" label="Opening Time">
                      <StyledDateTimePicker
                        name="openingTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e)}
                      />
                    </FormField>
                  </Col>
                  <Row>
                    <Col md={24} lg={24} sm={24}>
                      <FormField
                        name="closeTime"
                        style={{ border: "none" }}
                        label="Closing Time"
                      >
                        <StyledDateTimePicker
                          name="closingTime"
                          value={closeTime}
                          disabled={closeAutomatically}
                          onChange={(e) => setCloseTime(e)}
                        />{" "}
                      </FormField>
                      <CheckBox
                        name="autoClose"
                        onChange={(e) =>
                          setCloseAutomatically(e.target.checked)
                        }
                        label="Auto Close"
                      />
                    </Col>{" "}
                  </Row>
                </Row>
                <Row style={{ marginBottom: "10px" }}>
                  <Col md={12} lg={12} sm={24}>
                    <FormField label="Inventory Source">
                      <Select
                        name="inventorySource"
                        defaultValue="All"
                        // style={{ width: 220 }}
                        options={["All", "Platform", "ERPNext"]}
                        placeholder="Inventory Source"
                      ></Select>
                    </FormField>
                  </Col>
                  {props.user.isAdmin && (
                    <Col md={12} lg={12} sm={24}>
                      <FormField label="Sales Attendant">
                        <Select
                          placeholder="POS Sales Attendant"
                          name="agent"
                          style={{ width: 220 }}
                          options={props.users}
                        />
                      </FormField>
                    </Col>
                  )}{" "}
                </Row>

                <Row md={24} lg={24} sm={24} style={{ marginTop: "20px" }}>
                  <FormField label="Starting Balance">
                    <CurrencyInput
                      id="input-example"
                      placeholder="Starting Balance"
                      name="startingBalance"
                      defaultValue={0.0}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: "whitesmoke",
                        borderRadius: "10px",
                        borderStyle: "inherit",
                        backgroundColor: "inherit",
                      }}
                      decimalsLimit={2}
                      // onValueChange={(value, name) => console.log(value, name)}
                    />
                  </FormField>
                </Row>
                <Row md={24} lg={24} sm={24} style={{ marginTop: "20px" }}>
                  <TextArea name="note" placeholder="Note" rows={2} />
                </Row>
              </Grid>
            </Form>
          </motion.div>
        </Box>
      </Layer>
    </>
  );
}
