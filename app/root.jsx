import { cssBundleHref } from "@remix-run/css-bundle";

import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import React from "react";
import theme from "./components/theme";
import { Box, Grommet } from "grommet";
import Toggle from "./components/display_mode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomProvider } from "rsuite";



import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const [ darkMode, setDarkMode ] = React.useState(false);

  const toggleTheme = () => {
    if (darkMode === false) {
      setDarkMode(true);
      //SET THEME IN LOCALSTORAGE
      //window.localStorage.setItem("theme", "dark");
    } else {
      setDarkMode(false);
      //SET THEME IN LOCALSTORAGE
      //window.localStorage.setItem("theme", "light");
    }
  };
  const grommetProps = { theme: theme, themeMode: darkMode ?"dark":"light", full:true };
  
  
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Meta />
      <Links />
    </head>

    <body>
    
      <Grommet {...grommetProps}>
        <CustomProvider theme={darkMode ? "dark" : "light"}>
          <Outlet />
          <Box style={{ position: "absolute", bottom: 100, right: 10 }}>
            <Toggle
              theme={darkMode ? "dark" : "light"}
              toggleTheme={toggleTheme}
            />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={darkMode ? "dark" : "light"}
            />
          </Box>
        </CustomProvider>
      </Grommet>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  );
}
