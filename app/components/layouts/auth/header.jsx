import { Anchor, Button, Header, Image, Nav, ResponsiveContext, Text } from "grommet";
import React from "react";
import logo from "../../../../public/default_images/logo.png";
import * as Icon from "grommet-icons";
import styled from "../../styled";
import { useNavigate } from "@remix-run/react";

export default function AuthHeader() {
  const {User} = Icon
  const navigate = useNavigate()
  return (
    <Header a11yTitle="Seamless POS" title="Seamless POS"  >
      <Image
        // margin={"10px"}
        alt="Seamless POS logo"
        src={logo}
        width={150}
      ></Image>

      <Nav
        gap="medium"
        margin={"medium"}
        direction="row"
        
      >
        
          <Button
          
            color={"button"}
            onClick={()=>navigate("/auth/signup")}
            primary
            label={"Sign-Up"}
          ></Button>
          <Button
            color={"button"}
            primary
            onClick={()=>navigate("/auth/login")}
            label={ "Login"}
            
          />
      </Nav>
    </Header>
  );
}
