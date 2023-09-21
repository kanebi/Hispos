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
  Grid as IGrid,List as IList
} from "grommet-icons";
import ItemCard from "../../components/layouts/pos/item";
import itemSeed from "../../components/seeds/itemSeed";
import { uid } from "react-uid";
import POSCartItem from "../../components/layouts/pos/cartItem";
import { CheckOutline, Icon, Minus } from "@rsuite/icons";
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
          item: {
            productId: 5,
            name: "Pizza",
            price_amount: "1800",
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
          },
          quantity: 2,
          taxtTotal: "333",
          totalPrice: "NGN3600",
        },
        {
          item: {
            productId: 8,
            name: "Fish Fillet",
            price_amount: "2200",
            image: null,
            price_currency: "NGN",
            description: "Tender fish fillet.",
            price: "NGN22000",
            stock_uom: "Unit",
            min_order_qty: 1,
            tax: "8.2",
            allow_negative_stock: false,
            available_stock_quantity: 4,
            barcode: "sdfjso4567jsf",
            userFav: true,
            userPined: false,
          },
          quantity: 1,
          taxtTotal: "222",
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
            productId: 11,
            name: "Tacos",
            price_amount: "1700",
            image: null,
            price_currency: "NGN",
            description: "Tasty tacos.",
            price: "NGN17000",
            stock_uom: "Unit",
            available_stock_quantity: 6,
            min_order_qty: 2,
            barcode: "sdfjso1234jsf",
            userFav: false,
            tax: "9",
            allow_negative_stock: false,
            userPined: true,
          },
          quantity: 3,
          taxtTotal: "93",
          totalPrice: "NGN5100",
        },
        {
          item: {
            productId: 17,
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
            barcode: "sdfjso5678jsf",
            userFav: false,
            tax: "2.22",
            userPined: true,
          },
          taxtTotal: "4",
          quantity: 2,
          totalPrice: "NGN5200",
        },
      ],
      totalPrice: "NGN10300",
      totalPriceAmount: "10300",
    },
  ]);
  const [cartsHeld, setCartsHeld] = React.useState(false);
  const [activeCart, setActiveCart] = React.useState(cartItems[0].id || null);
  const [cartsTotal, setCartsTotal] = React.useState(0);
  const [sessionProfile, setSessionProfile] = React.useState({
    defaultCurrency: "NGN",
    shop: "Ellen Store",
    salesAdmin: "Kanebi",
    note: "Bla blan bla bla bla bla bla bla i am the son of the most High",
  });

  const [defaultCurrency, setDefaultCurrency] = React.useState(
    sessionProfile.defaultCurrency,
  );

  const [checkoutType, setCheckoutType] = React.useState("Active");
  const [cartGridView, setCartGridView] = React.useState(false)
  const [itemEditOn, setItemEditOn] = React.useState(false)
  const [currentItemOnEdit, setCurrentItemOnEdit] =React.useState(null)
  
  
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
        crtItmSum +=
          +crtItm.item.price_amount * +crtItm.quantity +
          +crtItm.quantity * +crtItm.item.tax;
      }
      cartsTotalSum += crtItmSum;
    }

    setCartsTotal(cartsTotalSum);
  }, [items, cartItems]);

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
    top: "-20px",
    margin: "20px",
    height: "inherit",
    alignSelf: "center",
    justify: "center",
    padding: "30px",
    fontSize: "30px",
    backgroundColor: "inherit",
    boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px",
  };
  return (
    <Container
    // style={{
    //             backgroundColor: "#f8d1ff",
    //             backgroundImage:
    //               "radial-gradient(#f745e2 0.5px, transparent 0.5px), radial-gradient(#f745e2 0.5px, #f8d1ff 0.5px)",
    //             backgroundSize: "20px 20px",
    //             backgroundPosition: "0 0,10px 10px",
    //           }}
    >
      <POSHeader
        company={companyData}
        setNewSession={setNewSession}
      ></POSHeader>
      <Grid style={{ width: "80%" }}>
        <Row>
          <Col xs={24} lg={34} md={34} className="Pos-Header">
            <Header
              pad={"xsmall"}
              height={"xxsmall"}
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
                    title={cartsHeld ? "Resume Carts" : "Hold Cart"}
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
        <Row gutter={10} style={{ margin: "10px", marginBottom: "0px" }}>
          <Col sm={24} lg={15} xl={15} md={15}>
            <Container className="Pos-Items-container">
              <Box
                // pad={"small"}
                height={"medium"}
                round={{ size: "xsmall" }}
                style={{
                  display: "block!important",
                  overflow: "hidden",
                  overflowY: "scroll",
                  paddingRight: "0px!important",
                  paddingLeft: screenSize === "medium" ? "15px" : "5px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  scrollMargin: "0px !important",
                  scrollBehavior: "smooth",
                  scrollbarColor: "inherit",
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
                          width: "10.9vw",

                          height:
                            screenHeight && screenHeight < 600
                              ? "27vh"
                              : "22vh",
                          overflow: "hidden",
                          borderRadius: "6px",

                          margin: "0.2em",
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
                          width: "10.9vw",

                          height:
                            screenHeight && screenHeight < 600
                              ? "27vh"
                              : "22vh",
                          overflow: "hidden",
                          borderRadius: "6px",

                          margin: "0.2em",
                        }}
                      >
                        <ItemCard
                          setItemsFunc={setItems}
                          itemsList={items}
                          product={product}
                          originItemList={itemsList}
                          favsO={favsOnly}
                        />
                      </div>
                    ),
                )}
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} lg={9} md={9} xl={9}>
            <Container className="Pos-Order-container">
              <Box
                pad={"small"}
                height={"medium"}
                round={{ size: "xsmall" }}
                // background={"brand"}
                style={{
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  overflow: "hidden",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                  scrollbarWidth: "thin",
                }}
              >
                {cartItems.map((cart, index) => (
                  <div
                    onClick={() =>
                      cart.onHold === false ? setActiveCart(cart.id) : ""
                    }
                    style={{ cursor: "pointer" }}
                    key={index + "cart-" + index}
                  >
                    <POSCartItem
                      setEdit={setItemEditOn}
                      setCurrentEdit={setCurrentItemOnEdit}
                      cart={cart}
                      gridView={cartGridView}
                      handleUpdateCartFunc={handleUpdateCart}
                      defaultCurrencyV={defaultCurrency}
                      active={cart.id === activeCart}
                    />
                  </div>
                ))}

                <motion.div
                  initial={{
                    position: "absolute",
                    zIndex: 100,
                    top: 0,
                    // x: 300,
                    width: "100%",
                    direction: "rtl",
                    opacity: 0,
                  }}
                  animate={{
                    left: itemEditOn ? 0 : 500,
                    right: itemEditOn ? 0 : "",
                    opacity: itemEditOn ? 1 : 0,
                  }}
                >
                  <Box
                    pad={"small"}
                    round={{ size: "3px" }}
                    height={"medium"}
                    background={"box"}
                  >
                    <Header> 
                    <Box alignSelf="end" align="end" justify="end">
                      <Button
                        
                        pad={"xsmall"}
                        label="Cancel"
                        primary
                        onClick={() => setItemEditOn(false)}
                      ></Button></Box>
                    <Box alignSelf="start" align="end" justify="start">
                      <Heading size="xxsmall" as={"h4"} alignSelf="start">
                        {currentItemOnEdit?.item.name}
                      </Heading></Box>
                      
                      
                     
                    </Header>
                    <Divider></Divider>
                    <Form >
                    
                    <Input placeholder="Name">
                    
                    </Input>
                    <Input placeholder="Tax">
                    
                    </Input>
                    <Input placeholder="Edit Rate">
                    
                    </Input>
                    <Container>
                    <Input placeholder="Coupon Code ">
                    
                    </Input>
                    <RButton>Apply Coupon</RButton>
                    </Container>
                    </Form>
                  </Box>
                </motion.div>

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
                      Total
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
        <Row gutter={10}>
          <Col style={{ marginTop: "10px" }} sm={24} lg={15} xl={15} md={15}>
            <Container className="Pos-customer-container">
              <Box
                pad={"small"}
                height={"small"}
                round={{ size: "xsmall" }}
                background={"brand"}
              >
                Customer Container
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} lg={9} xl={9} md={9}>
            <Container className="Pos-checkout-container">
              <Box
                pad={"small"}
                height={"203px"}
                round={{ size: "xsmall" }}
                style={{
                  borderTopRightRadius: "0px",
                  borderTopLeftRadius: "0px",
                  boxShadow:
                    " rgba(135, 112, 133, 0.35) 0px -50px 36px -28px inset rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                }}
              >
                <Box
                  alignContent="center"
                  style={{ padding: "5px", width: "100%" }}
                  background={{ dark: "#353036", light: "#e4c3eb" }}
                  justify="center"
                  align="center"
                >
                  <Stack direction="row">
                    <GTag
                      value={"All Carts"}
                      onClick={() => setCheckoutType("All")}
                      style={{
                        backgroundColor:
                          checkoutType === "All" ? "#be91e6" : "inherit",
                        cursor: "pointer",
                      }}
                    ></GTag>

                    <Minus color="#e9adff" />
                    <GTag
                      value={"Active Cart"}
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
                      style={{
                        opacity: activeCart === null ? "0.5" : 1,
                        backgroundColor:
                          checkoutType === "Active" ? "#be91e6" : "inherit",
                        cursor: "pointer",
                      }}
                    ></GTag>
                  </Stack>
                </Box>
                <Divider />{" "}
                <Box
                  background={{ dark: "#a695a3", light: "#FCD8C9" }}
                  pad={"none"}
                  style={{ height: "30px" }}
                >
                  {" "}
                  <RButton style={checkoutButtonStyle} startIcon={<Cart />}>
                    {" "}
                    Checkout{" "}
                  </RButton>{" "}
                </Box>
              </Box>
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
                    <Col md={24} lg={24} sm={24}>
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
