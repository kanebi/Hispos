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
  ResponsiveContext,
  Notification,
} from "grommet";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";

import styled from "../components/styled";
import OTPInput from "react-otp-input";
import { Disc } from "grommet-icons";
import { FaCircle } from "react-icons/fa/index.js";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const screenSize = React.useContext(ResponsiveContext);
  const [defaultCodeLength, setDefaultCodeLength] = React.useState(5);
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

  const CodeInputProps = {
    className: "email-code-input",
    inputStyle: {
      fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "15px",
      borderRadius: "3px",
      fontSize: "14px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "inherit",
      color: "lightskyblue",
      border: "1px solid purple",
    },
    inputStyleInvalid: {
      fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "15px",
      borderRadius: "3px",
      fontSize: "14px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "inherit",
      color: "red",
      border: "1px solid red",
    },
  };
  const validateOTP = (val) => {
    setOtp(val)
    if (val.length === defaultCodeLength) {
      navigate("/auth/account/setup");
    }
    
  };
  return (
      <Box
        className="auth-outlet"
        background={"box"}
        alignSelf={"center"}
        pad={"large"}
        width={"large"}
        style={{ marginTop: screenSize === "small" ? "100px" : "50px" }}
        round="small"
        border={{ color: "border", size: "medium", style: "double" }}
      >
        <Box gap="small" justify="center">
          <StyledHeaderContainer>
            <Heading size="small" alignSelf="center" margin={"none"} as={"h2"}>
              {" "}
              Almost Done{" "}
            </Heading>
          </StyledHeaderContainer>
          <Box align="center">
            <Heading size="small" margin={"0"} color={"default"}>
              Email Verification
            </Heading>
            <p>Please Enter the code sent to kane@gmail.com</p>
          </Box>
          {/* <Form> */}
          <Box align="center" style={{ marginBottom: "10px" }}>
            <OTPInput
              value={otp}
              onChange={validateOTP
              }
              numInputs={defaultCodeLength}
              inputType="text"
              inputStyle={{ width: "70px", margin: "5px", fontSize: "20px" }}
              renderSeparator={
                <p style={{ margin: "5px", fontSize: "5px" }}>
                  <FaCircle />
                </p>
              }
              renderInput={(props) => (
                <TextInput {...props} inputMode="numeric" />
              )}
            />{" "}
          </Box>

          {/* {/* </Form> */}
        </Box>
      </Box>
  );
}
