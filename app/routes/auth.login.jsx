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
  ResponsiveContext,
} from "grommet";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";

export default function Login() {
  const navigate = useNavigate();
  const screenSize = React.useContext(ResponsiveContext);

  return (
    <>
      <Heading
            margin="small"
            alignSelf="center"
            textAlign="center"
            color={"default"}
          >
            Welc<span style={{ color: "#d289f0" }}>o</span>me to y
            <span style={{ color: "#d289f0" }}>o</span>ur P
            <span style={{ color: "#d289f0" }}>O</span>S
          </Heading>
      <Box
        className="auth-outlet"
        background={"box"}
        alignSelf={"center"}
        pad={"large"}
        width={"medium"}
        round="small"
        border={{ color: "border", size: "medium", style: "double" }}
      >
        <Box
          gap="small"
          style={{ marginBottom: screenSize === "small" ? "70px" : "10px" }}
          justify="center"
        >
          <Heading
            size="small"
            margin={"0"}
            textAlign="center"
            color={"default"}
          >
            Login
          </Heading>
          <Form>
            <Box style={{ marginBottom: "10px" }}>
              <TextInput
                type="email"
                placeholder="Your Email e.g kane@gmail.com"
              ></TextInput>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextInput
                type="password"
                placeholder="Enter Your password"
              ></TextInput>
            </Box>

            <Button
              type="submit"
              // color={"button"}
              primary
              fill="horizontal"
              size="medium"
              label={"GET IN"}
            ></Button>
          </Form>

          <Anchor
            color={"link"}
            size={"small"}
            onClick={() => navigate("/auth/password/reset")}
          >
            Forgot your password?
          </Anchor>
        </Box>
      </Box>
    </>
  );
}
