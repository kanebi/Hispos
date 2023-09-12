import React from "react";

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
  Nav,
} from "grommet";
import { Col, Container, Grid, Loader, Form, Row, IconButton } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import POSHeader from "../../components/layouts/pos/header";
import CurrencyInput from "react-currency-input-field";
import { StatusLabel, Tooltip } from "smarthr-ui";
import DateTimePicker from "react-datetime-picker";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import styled from "../../components/styled";
import { Calculator } from "grommet-icons";
export function loader({ params }) {
  return params;
}

export default function PointOfSale(props) {
  const [loading, setloading] = React.useState(false);
  const [companyData, setCompanyData] = React.useState({
    name: "HPR",
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
  });
  const [itemsLoading, setItemsLoading] = React.useState(false);
  const [newSession, setNewSession] = React.useState(true);
  const [searchActive, setSearchActive] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      id: 1,
      name: "Chicken Lap",
      price_amount: "2000",
      price_currency: "NGN",
      price: "NGN20000",
      stock_uom: "Kg",
      available_stock_quantity: 2,
    },
    {
      id: 1,
      name: "Burger",
      price_amount: "3000",
      price_currency: "NGN",
      price: "NGN30000",
      stock_uom: "Kg",
      available_stock_quantity: -1,
    },
  ]);
  const [systemUsers, setSystemUser] = React.useState([
    "kanebi",
    "doffe",
    "imog",
    "tobi",
  ]);
  const ProductBox = styled.div`
    border-radius: 6px;
    margin: 0.3em;
    width: 10.5vw;
    height: 25.3vw;
    background: #fff;
    transition: all 300ms;
    color: #555;
    overflow: hidden;
    &:hover {
      box-shadow: rgba(150, 10, 105, 0.45) 0px 25px 20px -20px;
    };
    
   
  `;
  return (
    <Container>
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

                      outline: "none",
                    }}
                    onChange={() => setSearchActive(false)}
                    onFocus={() =>
                      searchActive === false ? setSearchActive(true) : ""
                    }
                    placeholder="Search Items"
                  />
                </Tooltip>
              </Box>
              <Nav title="calculator" align="end">
                <IconButton
                  style={{
                    background: "inherit",
                    height: "4 0px",
                    boxShadow:
                      " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                  icon={<Calculator />}
                ></IconButton>
              </Nav>
              {/* <Box gridArea="right" ></Box>
              </GGrid> */}
            </Header>
          </Col>
        </Row>
        <Row gutter={10} style={{ margin: "10px", marginBottom: "0px" }}>
          <Col sm={24} lg={14} xl={14} md={14}>
            <Container className="Pos-Items-container">
              <Box
                pad={"small"}
                height={"medium"}
                round={{ size: "xsmall" }}
                style={{
                  // display:"inline-block",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                {items.map(() => (
                    <ProductBox>
                      <Box
                        height={"inherit"}
                        pad={"small"}
                        width={"inherit"}
                        style={{
                          cursor: "pointer",
                          boxShadow:
                            "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                        }}
                        background={{ dark: "#42433E", light: "#f1d7f7" }}
                      >
                        {/* <StatusLabel> In stock</StatusLabel> */}
                      </Box>
                    </ProductBox>
                ))}
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} lg={10} md={10} xl={10}>
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
          <Col style={{ marginTop: "10px" }} sm={24} lg={14} xl={14} md={14}>
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
          <Col sm={24} lg={8} xl={10} md={10}>
            <Container className="Pos-customer-container">
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
  const handleStartPOS = () => {
    setLoading(true);
    props.setSessionOpen(false);

    console.log(sessionFormRef.current.root);

    const formData = new FormData(sessionFormRef.current.root);
    const data = Object.fromEntries(formData);
    console.log(data);
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
          style={{ overflow: "auto" }}
        >
          <Form ref={sessionFormRef}>
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
                      onChange={(e) => setCloseAutomatically(e.target.checked)}
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
        </Box>
      </Layer>
    </>
  );
}
