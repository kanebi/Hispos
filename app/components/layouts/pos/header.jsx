import {  Dashboard, UserInfo} from "@rsuite/icons";
import React from "react";
import {  Nav,  Header,Navbar } from "rsuite";
import defaultLogo from "../../../../public/default_images/logo.png";
import { Heading, Text, Button, Box} from "grommet";
import { useNavigate } from "react-router-dom";
export default function POSHeader(props) {
  const navigate = useNavigate()
  const { company } = props;
  return (
    <>
      <Header
        style={{
          marginBottom: "10px",
          backgroundColor: "inherit",
        }}
      >
        {" "}
        <Box
          width={"inherit"}
          height={"inherit"}
          // color={"pos_text"}
          background="pos_brand"
        >
          <Navbar style={{ backgroundColor: "inherit", color: "inherit" }}>
            <Navbar.Brand href={company.website}>
              {company.logo ? (
                <div style={{ marginTop: "-20px" }}>
                  <Heading size="small" as="h4">
                    {" "}
                    <img width={80} height={60} src={company.logo} />
                    {company.name}
                  </Heading>
                </div>
              ) : (
                <div style={{ marginTop: "-20px" }}>
                  <Heading as="h4" size="small">
                    {" "}
                    <img width={80} height={60} src={defaultLogo} />
                    {company.name}
                  </Heading>
                </div>
              )}
            </Navbar.Brand>
            <Nav activeKey={0}>
              <Nav.Menu title={<Text>Item</Text>}>
                <Nav.Item eventKey="0">Create New</Nav.Item>
                <Nav.Item eventKey="1">
                  <Text>Update Existing</Text>
                </Nav.Item>
              </Nav.Menu>
              <Nav.Menu color="inherit" title={<Text>Session</Text>}>
                <Nav.Item onClick={()=>props.setNewSession(true)} eventKey="2">
                  {" "}
                  <Text>New Session</Text>
                </Nav.Item>
                <Nav.Item eventKey="3">
                  <Text>Close Session</Text>
                </Nav.Item>
              </Nav.Menu>
              <Nav.Item
                icon={<UserInfo />}
                eventKey="4"
                title="POS Profile Info"
              >
                Profile
              </Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item
                onClick={() => navigate("/dashboard")}
                title="Dashboard"
                eventKey="5"
              >
                <Button primary icon={<Dashboard style={{color:"inherit"}} />}></Button>
              </Nav.Item>
            </Nav>
          </Navbar>{" "}
        </Box>
      </Header>
    </>
  );
}
