import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Image,
  Anchor,
  Text,
  TextInput,
  Grommet,
} from "grommet";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";

import styled from "../components/styled";

export default function Signup() {
  const navigate = useNavigate();
  // User.type = String(typeof(User))
  const StyledHeaderContainer = styled.div`
    background-image: linear-gradient(
      to right,
      violet,
      indigo,
      blue,
      green,
      yellow,
      orange,
      red
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `;

return (
  <Box
    className="auth-outlet"
    background={"box"}
    alignSelf={"center"}
    pad={"large"}
    width={"medium"}
    round="small"
    border={{ color: "border", size: "medium", style: "double" }}
  >
    <Box gap="small" justify="center">
      <StyledHeaderContainer>
        <Heading size="small" alignSelf="center" margin={"none"} as={"h2"}>
          {" "}
          Create Account{" "}
        </Heading>
        <span className="rainbow-text">J</span>
        <span className="rainbow-text">o</span>
        <span className="rainbow-text">i</span>
        <span className="rainbow-text">n</span>
        &nbsp;the&nbsp;
        <span className="rainbow-text">B</span>
        <span className="rainbow-text">i</span>
        <span className="rainbow-text">g</span>
        &nbsp;Ting&nbsp;<span className="rainbow-text">🌈</span>
      </StyledHeaderContainer>
      <Form>
        <Box style={{ marginBottom: "10px" }}>
          <TextInput
            type="text"
            name="first_name"
            placeholder="Enter First Name"
          ></TextInput>
        </Box>

        <Box style={{ marginBottom: "20px" }}>
          <TextInput
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
          ></TextInput>
        </Box>
        <Box style={{ marginBottom: "10px" }}>
          <TextInput
            type="email"
            placeholder="Enter Email e.g kane@gmail.com"
          ></TextInput>
        </Box>

        <Box style={{ marginBottom: "20px" }}>
          <TextInput type="password" placeholder="Enter  password"></TextInput>
        </Box>
        <Box style={{ marginBottom: "20px" }}>
          <TextInput type="password" placeholder="Retype password"></TextInput>
        </Box>

        <Button
          type="submit"
          primary
          fill="horizontal"
          size="medium"
          color={"button"}
          onClick={() => navigate("/auth/email/verify")}
          label="Create Account"
        ></Button>
      </Form>
    </Box>
  </Box>
);
}
