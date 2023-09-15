import React from "react";
import { motion } from "framer-motion";
import { Box, Heading, Text } from "grommet";
import "rsuite/dist/rsuite.min.css";

import { Button as RButton, Tag, Stack, Divider } from "rsuite";
import productIcon from "../../../../public/default_images/bascket.png";
import tapSound from "../../../../public/default_audio/tap.ogg";
import { Pin, Favorite, Hide, Edit } from "grommet-icons";
import styled from "../../styled";
import { Pined } from "@rsuite/icons";
import { FloatArea, Tooltip } from "smarthr-ui";

export default function ItemCard({ product, favsO, itemsList, setItemsFunc }) {
  const [pined, setPined] = React.useState(product.userPined);
  const [faved, setFaved] = React.useState(product.userFav);
  const [carted, setCarted] = React.useState(false);

  const handleAddToCart = () => {
    setCarted(true);
    new Audio(tapSound).play();
  };

  const handlePinItem = () => {
    setPined(!pined);
    const prod = product;
    prod.userPined = pined;
    const newItems = itemsList.filter((itm) => itm.id !== product.id);
    console.log(newItems);
    setItemsFunc([prod, ...newItems]);
  };
  const handleFavItem = () => {
    setFaved(!faved);
  };
  return (
  
    <motion.div
      id={`item-${product.id}-card`}
      className="itm-card"
      initial={{
        borderRadius: "6px",
        width: "10.9vw",
        display:"inline-block!important",
            
        height: "22vh",
        margin: "0.3em",
        transition: " all 100ms",

        color: "#555",
        // scale:  favsO && faved===false && 0
        opacity:
          favsO === true
            ? faved === true
              ? 1
              : 0
            : 1,
        overflow: "hidden",
      }}
      // whileTap={{scale:"50%"}}
      whileHover={{ boxShadow: "rgba(120, 107, 135, 0.1) 0px 4px 12px" }}
      // display: favsO && faved && "none",
    >
      <Tooltip
        multiLine={true}
        message={
          <Box
            background={"box"}
            style={{
              textAlign: "center",
              height: "auto",
              maxHeight: "30vh",
              borderRadius: "10px",
              width: "400px",
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
          height={"25.3vh"}
          // pad={"small"}
          width={"10.9vw"}
          onClick={handleAddToCart}
          style={{
            cursor: "pointer",
            textAlign: "center",
            backgroundImage: `url(${
              product.image ? product.image : productIcon
            })`,
            backgroundSize: product.image ? "100%" : "45%",
            backgroundPosition: "center",
            backgroundPositionY: product.image ? "center" : "35%",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          background={{ dark: "#42433E", light: "#f1d7f7" }}
        >
          {" "}
          <Box
            style={{
              top: "0px",
              left: "0px",
              margin: "5px",
              width: "auto",
              maxWidth: "inherit",
              height: "27px",
              display: "block",
              opacity: "0.8",

              // paddingBottom: "-10px",
            }}
          >
            <Tag
              style={{
                maxWidth: "50px",
                display: "inline-block",
                height: "20px",
                float: "left",
                marginBottom: "5px",
              }}
            >
              <Text
                size="xsmall"
                color={
                  product.available_stock_quantity >= 1 ? "lightgreen" : "red"
                }
              >
                {product.available_stock_quantity} {product.stock_uom}
              </Text>
            </Tag>
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
          <motion.div
            style={{
              y: "117px",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px, inset rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            whileHover={{ y: "58px" }}
            animate={{ y: "117px" }}
          >
            <Box
              background={{ dark: "#42433E", light: "#f1d7f7" }}
              style={{ paddingBottom: "20px" }}
              width={"large"}
            >
              <Box style={{ padding: "5px", marginBottom: "5px" }}>
                <Text style={{ float: "left" }}>
                  <span
                    style={{
                      float: "left",
                      lineHeight: 1,
                      textAlign: "left",
                      height: "15px",
                      maxWidth: "70px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {product.name}
                  </span>
                  <Tag
                    style={{
                      float: "right",
                      lineHeight: 1,
                      fontWeight: "bold",
                      textAlign: "left",
                      height: "18px",
                      maxWidth: "80px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {product.price}
                  </Tag>
                </Text>
              </Box>
              <Stack
                style={{ margin: 2, marginLeft: "4px", zIndex: 9999 }}
                direction="row"
                spacing={7}
              >
                <RButton
                  onClick={handleFavItem}
                  style={{ backgroundColor: faved ? "#eac0fa" : "" }}
                  title="favourite"
                >
                  <Favorite />
                </RButton>
                <RButton
                  onClick={handlePinItem}
                  style={{ backgroundColor: pined ? "#eac0fa" : "" }}
                  title="Pin to top"
                >
                  <Pin></Pin>
                </RButton>
                <RButton
                  onClick={() => window.open(`/inventory/edit/${product.id}`)}
                  title="Edit"
                >
                  <Edit />
                </RButton>
              </Stack>
            </Box>
            <br />
            <br />
            <br />
          </motion.div>
        </Box>
      </Tooltip>
    </motion.div>
  );
}
