import { Outlet } from "react-router-dom";
import AuthFooter from "../components/layouts/auth/footer";
import { Box, Grommet, Heading } from "grommet";
import React from "react";
import theme from "../components/theme";
import AuthHeader from "../components/layouts/auth/header";

export function loader({ params }) {
  return params;
}

export function action({ params }) {
  return params;
}

export default function Auth() {

  
  return (
    <>
      <Box gap="large">
        <AuthHeader />

        <Box justify="center" alignContent="center">
         
            <Outlet />
        </Box>
        <AuthFooter />
      </Box>
    </>
  );
}
