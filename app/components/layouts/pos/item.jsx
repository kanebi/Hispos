import React from "react";
import { motion } from "framer-motion";
import { Box, Heading, ResponsiveContext, Text } from "grommet";
import "rsuite/dist/rsuite.min.css";

import { Button as RButton, Tag, Stack, Divider } from "rsuite";
import productIcon from "../../../../public/default_images/bascket.png";
import tapSound from "../../../../public/default_audio/tap.ogg";
import { Pin, Favorite, Hide, Edit } from "grommet-icons";
import styled from "../../styled";
import { Pined } from "@rsuite/icons";
import { FloatArea, StatusLabel, Tooltip } from "smarthr-ui";

export default function ItemCard({ product, favsO, itemsList, setItemsFunc }) {
  const [pined, setPined] = React.useState(product?.userPined);
  const [faved, setFaved] = React.useState(product?.userFav);
  const [carted, setCarted] = React.useState(false);
  const [screenSize, setScreenSize] = React.useContext(ResponsiveContext);
  const [screenHeight, setScreenHeight] = React.useState(undefined);

  React.useEffect(() => {
    if (typeof document !== undefined) {
      setScreenHeight(document.body.clientHeight);
    }
  }, []);

  const handleAddToCart = () => {
    {
      alert(screenSize);
    }

    setCarted(true);
    new Audio(tapSound).play();
  };

  const handlePinItem = () => {
    const prod = product;
    prod.userPined = !pined;
    const newItems = itemsList.filter((itm) => itm.id !== product.id);
    setItemsFunc([prod, ...newItems]);
    setPined(!pined);

    // update origin list
  };
  const handleFavItem = () => {
    const prod = product;
    prod.userFav = !faved;
    console.log(prod);
    const newItems = itemsList.map((itm) => (itm.id !== prod.id ? itm : prod));
    console.log(newItems);

    setItemsFunc([...newItems]);
    setFaved(!faved);

    // update origin list
  };
  const cardBg = { dark: "#42433E", light: "#f1d7f7" };
  return (
    // <div color="blue" style={{ backgroundColor: "red", padding :"20px" }}>
    //   {product.name} NGN 2000
    // </div>
     <div
                            className="item-cont-main"
                            style={{
                              // 2.5vw already in use
                              width: "10vw",
                              height:
                                screenHeight && screenHeight < 600
                                  ? "27vh"
                                  : "22vh",
                              borderRadius: "6px",
                              margin: "0.4vw",
                              display: "inline-block",
                            }}
                          >
      <motion.div
        id={`item-${product.id}-card`}
        className="itm-card"
        initial={{
          borderRadius: "6px",
          transition: " all 100ms",
          width: "inherit",
          overflow:"hidden",
          height: "inherit",
          color: "#555",
          scale:"-3px",

          // scale:  favsO && faved===false && 0
          opacity: favsO === true ? (faved === true ? 1 : 0) : 1,
        }}
        whileInView={{marginTop:"0px", scale:0}}
        
        // whileTap={{scale:"50%"}}
        whileHover={{ boxShadow: "rgba(120, 107, 135, 0.1) 0px 4px 12px" }}
        // display: favsO && faved && "none",
      >
        <Box
          height={"inherit"}
          // pad={"small"}
          width={"inherit"}
          style={{
            cursor: "pointer",
            // zIndex: 100,
            textAlign: "center",
            position: "relative",
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          background={cardBg}
        >
          {" "}
          <Box
            style={{
              top: "0px",
              left: "0px",
              margin: "5px",
              width: "auto",
              maxWidth: "inherit",
              overflow: "hidden",
              height: "4vh",
              display: "block",
              opacity: "0.8",

              // paddingBottom: "-10px",
            }}
          >
            {screenSize === "s" ? (
              <Text
                size="xxsmall"
                style={{
                  fontSize: screenSize === "s" ? "6px" : "16px",
                  display: "inline-block",
                  height: "20px",

                  padding: "0px",
                  float: "left",
                  paddingRight: "2px",
                  paddingLeft: "2px",
                  marginBottom: "5px",
                }}
                color={product.available_stock_quantity >= 1 ? "green" : "red"}
              >
                <small>
                  {product.available_stock_quantity} {product.stock_uom}
                </small>
              </Text>
            ) : (
              <Tag
                style={{
                  // maxWidth: "50px",
                  display: "inline-block",
                  height: "20px",

                  padding: "0px",
                  float: "left",
                  paddingRight: "2px",
                  paddingLeft: "2px",
                  marginBottom: "5px",
                }}
              >
                <Text
                  size="xxsmall"
                  style={{ fontSize: screenSize === "s" ? "6px" : "16px" }}
                  color={
                    product.available_stock_quantity >= 1 ? "green" : "red"
                  }
                >
                  <small>
                    {product.available_stock_quantity} {product.stock_uom}
                  </small>
                </Text>
              </Tag>
            )}
            <Tag
              style={{
                backgroundColor: "inherit",
                maxWidth: "30px",
                paddingBottom: "10px",
                top: "-10px",
                height: "20px",
                block: "inline-block",
                float: "right",
              }}
            >
              {pined && (
                <Pined
                  title="Pinned to top"
                  style={{
                    color: "#a991b3",
                    fontSize: "15px",
                  }}
                />
              )}
            </Tag>
          </Box>
          <Tooltip
            multiLine={true}
            message={
              <Box
                background={"box"}
                margin={"0px"}
                style={{
                  textAlign: "center",

                  height: "auto",
                  maxHeight: "30vh",
                  borderRadius: "10px",
                  // width: "500px!important",
                  scrollbarWidth: "thin",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Stack direction="column">
                  <Heading as={"h4"} color="default" size="20px">
                    {product.name}
                  </Heading>
                  <Divider
                    color="background-color: #f8d1ff;"
                    style={{ margin: "5px" }}
                  />
                  <Text>
                    <Tag
                      style={{
                        fontSize: "16px",
                        fontWeight: "bolder",
                        color: product.price <= 0 ? "red" : "green",
                        padding: "10px",
                      }}
                    >
                      {product.price}
                    </Tag>
                    <br />
                    <small>{product.description}</small>
                  </Text>
                </Stack>{" "}
              </Box>
            }
          >
            <Box
              style={{
                height: "10.5vh",
                backgroundImage: `url(${
                  product.image ? product.image : productIcon
                })`,
                backgroundSize: product.image ? "100%" : "45%",
                // zIndex: 200,
                backgroundPosition: "center",
                backgroundPositionY: product.image ? "center" : "35%",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
              }}
              onClick={handleAddToCart}
            ></Box>
          </Tooltip>
          <Box
            style={{ width: "inherit", height: "5vh", position: "relative" }}
          >
            <motion.div
              initial={{
                left: 0,
                right: 0,
                bottom: screenSize === "l" ? 60 : "",
                // top: screenSize === "l" ?0:-30,
                // zIndex: 250,

                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px, inset rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                position: "absolute",
                backgroundColor: "inherit",
                width: "inherit",
                height: "inherit",

                // overflow:"hidden"
              }}
              // animate={{bottom:-70}}
              whileHover={{
                top: screenSize === "m" ? -50 : screenSize === "l" ? -60 : "",
                height: screenSize === "m" ? "50vh" : "inherit",
              }}
              whileTap={{
                top: screenSize === "m" ? -50 : screenSize === "l" ? -60 : "",
                height: screenSize === "m" ? "50vh" : "inherit",
              }}
            >
              <Box
                // background={{ dark: "#42433E", light: "#f1d7f7" }}
                background={cardBg}
                style={{ paddingBottom: "10px" }}
              >
                <Box
                  style={{
                    padding: "5px",
                    marginBottom: "5px",
                    display: "block",
                    maxWidth: "100%",
                  }}
                >
                  <Text
                    style={{
                      float: "left",
                      width: screenSize === "s" ? "100%" : "50%",
                      lineHeight: 1,
                      textAlign: "left",
                      height: "15px",
                      fontSize: screenSize === "s" ? "6px" : "16px",
                      display: "inline-block",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </Text>
                  <Tag
                    style={{
                      float: "right",
                      lineHeight: 1,
                      display: screenSize === "s" ? "none" : "inline-block",
                      fontWeight: "bold",
                      textAlign: "left",
                      height: "18px",
                      maxWidth: "50%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    title={product.price}
                  >
                    {product.price}
                  </Tag>
                </Box>
                <motion.div
                  initial={{ opacity: 0, height: "10vh" }}
                  whileTap={{ opacity: 100 }}
                  whileHover={{ opacity: 100 }}
                >
                  <Box
                    round={"small"}
                    style={{
                      // marginLeft: screenHeight < 600 ? "4px" : "2px",
                      display: "block",
                      width: "100%",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <Box
                      round={"xxsmall"}
                      border={"all"}
                      background={faved ? "box" : "widget"}
                      style={{
                        marginRight: "1px",
                        width: "32%",
                        display: "inline-block",
                      }}
                    >
                      <RButton
                        onClick={handleFavItem}
                        active={faved ? true : false}
                        style={{
                          width: "100%",
                          backgroundColor: "inherit",
                        }}
                        title="Favourite"
                      >
                        <Favorite />
                      </RButton>
                    </Box>
                    <Box
                      border={"all"}
                      round={"xxsmall"}
                      background={pined ? "box" : "widget"}
                      style={{
                        marginRight: "1px",
                        width: "32%",
                        display: "inline-block",
                      }}
                    >
                      <RButton
                        onClick={handlePinItem}
                        active={pined ? true : false}
                        style={{
                          width: "100%",
                          backgroundColor: "inherit",
                        }}
                        title="Pin to top"
                      >
                        <Pin></Pin>
                      </RButton>
                    </Box>
                    <Box
                      border={"all"}
                      round={"xxsmall"}
                      style={{ width: "32%", display: "inline-block" }}
                    >
                      <RButton
                        style={{
                          width: "100%",
                          backgroundColor: "inherit",
                        }}
                        onClick={() =>
                          window.open(`/inventory/edit/${product.id}`)
                        }
                        title="Edit"
                      >
                        <Edit />
                      </RButton>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
              <br />
              <br />
              <br />
            </motion.div>
          </Box>
        </Box>
      </motion.div></div>
  );
}
