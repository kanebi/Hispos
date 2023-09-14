import React from "react";
import { motion } from "framer-motion";
import { Box, Heading, Text } from "grommet";
import "rsuite/dist/rsuite.min.css";

import { Button as RButton, Tag, Stack, Divider } from "rsuite";
import productIcon from "../../../../public/default_images/bascket.png";
import { Pin, Favorite, Hide, Edit } from "grommet-icons";
import styled from "../../styled";
import { Pined } from "@rsuite/icons";
import { Tooltip } from "smarthr-ui";

export default function ItemCard({ product, favsO,itemsList, setItemsFunc }) {
  const [pined, setPined] = React.useState(product.userPined);
  const [faved, setFaved] = React.useState(product.userFav);
  
  
  const ProductBox = styled(motion.div)`
    border-radius: 6px;
    margin: 0.3em;
    alignself: end;
    width: 10.5vw;
    height: 25.3vh;
    transition: all 300ms;
    color: #555;
    overflow: hidden;
    &:hover {
      box-shadow: rgba(150, 10, 105, 0.45) 0px 25px 20px -20px;
    }
  `;
  const handlePinItem = () => {
alert(product.id)
    setPined(!pined);
     const prod = product;
      prod.userPined = pined;
      const newItems = itemsList.filter((itm) => itm.id !== product.id);
      setItemsFunc([prod, ...newItems]);
     
    
  };
  const handleFavItem = () => {
    setFaved(!faved);
  };
  return (
    // <motion.div >
  
      <ProductBox
        whileTap={{ scale: "20%,20%" }}
        className="itm-card"
        style={{
          transition: "all 0.3s ease-in",
          opacity: favsO === true ? (faved === true ? 1 : 0) : 1,
        }}
        hidden={favsO === true ? (faved === true ? false : true) : false}
        // display: favsO && faved && "none",
      >
        <Tooltip
      multiLine={true}
      message={
        <Box style={{ textAlign: "center",height:"auto", maxHeight:"30vh", width:"400px", scrollbarWidth:"1px", overflowY:"auto", overflowX:"hidden" }}>
          <Stack direction="column">
            <Heading as={"h4"} color="default" size="20px">
              {product.name}
            </Heading>
            <Divider
              color="background-color: #f8d1ff;"
              style={{ margin: "5px" }}
            />
            <Text ><small>{product.description}</small></Text>
          </Stack>{" "}
        </Box>
      }
    >
        <Box
          height={"25.3vh"}
          // pad={"small"}
          width={"10.5vw"}
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
          <Box style={{ position: "absolute", padding: "7px" }} alignSelf="end">
            {pined && <Pined style={{ color: "#a991b3" }} />}
          </Box>
          <Tag
            style={{
              top: "0px",
              left: "0px",
              margin: "5px",
              width: "auto",
              maxWidth: "50px",
              height: "25px",
              opacity: "0.8",

              // paddingBottom: "-10px",
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
          <motion.div
            style={{
              y: "50px",
              paddingBottom: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px, inset rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            whileHover={{ transform: "translate(0,55%)" }}
            animate={{ y: "100px" }}
          >
            <Box
              background={{ dark: "#42433E", light: "#f1d7f7" }}
              width={"large"}
            >
              <Box style={{ padding: "5px", marginBottom: "5px" }}>
                <Text style={{ float: "left" }}>
                  <span style={{ float: "left" }}>{product.name}</span>
                  <Tag style={{ float: "right" }}>{product.price}</Tag>
                </Text>
              </Box>
              <Stack style={{ margin: 2 }} direction="row" spacing={7}>
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
          </motion.div>
        </Box></Tooltip>
      </ProductBox>
    // </motion.div>
  );
}
