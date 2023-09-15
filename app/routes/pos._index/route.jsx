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
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import POSHeader from "../../components/layouts/pos/header";
import CurrencyInput from "react-currency-input-field";
import { StatusLabel, Tooltip } from "smarthr-ui";
import DateTimePicker from "react-datetime-picker";

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
} from "grommet-icons";
import ItemCard from "../../components/layouts/pos/item";
import itemSeed from "../../components/seeds/itemSeed";
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
  const screenSize = React.useContext(ResponsiveContext)
  const [systemUsers, setSystemUser] = React.useState([
    "kanebi",
    "doffe",
    "imog",
    "tobi",
  ]);
  
  const [itemsList, setItemsList] = React.useState(itemSeed)
  const [favsOnly, setFavsOnly] = React.useState(false);
  
  const resetItems = () => {
    setItems(itemsList);
  };
  const handleSearchItems=()=>{
  
  
  }
  const handlePinItem =()=>{
  
  }
  
  const handleFavItem = ()=>{
  
  }
  
  const handleShowFavOnly =( )=>{
  if (favsOnly === false){
  setFavsOnly(true);
  const favList = itemsList.filter(itm => itm.userFav === true)
  
  setItems(favList) }
  
  else{
  setFavsOnly(false)
  resetItems()
  }
  
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
                  
                    <Favorite size="20px" enableBackground={"red"} />
                  </IconButton>
                </Box>
              </Box>
              <Navbar style={{ backgroundColor: "inherit", padding: "10px" }}>
                <Nav title="calculator" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "10px",

                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    icon={<Calculator size="small" />}
                  ></IconButton>
                </Nav>
                <Nav title="Customer" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "5px",
                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    icon={<UserManager size="small" />}
                  ></IconButton>
                </Nav>
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
                    product.userPined && (
                      <ItemCard
                        itemsList={items}
                        setItemsFunc={setItems}
                        product={product}
                        key={index}
                        favsO={favsOnly}
                      />
                    ),
                )}

                {/* unpined items */}
                {items.map(
                  (product, index) =>
                    !product.userPined && (
                      <ItemCard
                        setItemsFunc={setItems}
                        itemsList={items}
                        product={product}
                        key={index}
                        favsO={favsOnly}
                      />
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
                background={"brand"}
                style={{
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                }}
              >
                Order Container
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
                }}
                background={"brand"}
              >
                Checkout Container
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
