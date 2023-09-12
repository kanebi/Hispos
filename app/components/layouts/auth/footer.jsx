import { Footer, Grommet } from "grommet";
import React from "react";

export default function AuthFooter() {

const currentYear =  new Date().getFullYear()
  return (
    <Footer
      justify="center"
      // margin={"large"}
      color="default"
      pad={"medium"}
    >
      <b>
        SPOS <i className="fa fa-copyright" aria-hidden="true"></i>{" "}
        {currentYear}
      </b>
    </Footer>
  );
}
