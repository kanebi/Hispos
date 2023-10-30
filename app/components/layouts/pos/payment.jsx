import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  ResponsiveContext,
  Text,
  TextArea,
} from "grommet";

import {
  Button as RButton,
  Tag,
  Stack,
  Divider,
  Input,
  List,
  Row,
  Col,
  Grid,
  useToaster,
  Message,
  IconButton,
} from "rsuite";
// import tapSound from "../../../../public/default_audio/checkoutComplete.ogg";
import { useFetcher } from "@remix-run/react";
import { Cart, Save, StatusGoodSmall } from "grommet-icons";
import CurrencyInput from "react-currency-input-field";
import { uid } from "react-uid";
import { replaceAll } from "../../../../utils/str_utils";
import {Form} from "@remix-run/react"
export default function Payment({ orderV, setOrderFunc, profile, handleSubmitPayment }) {
  const [paymentMethods, setPaymentmethods] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [currentTarget, setCurrentTarget] = React.useState(null);
  const [currentTargetObject, setCurrentTargetObject] = React.useState({});
  const [inputSuggestions, setInputSuggestions] = React.useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = React.useState(
    [],
  );

  const fetcher = useFetcher();
  const paymentInputRefs = React.useRef([]);
  const toaster = useToaster();

  React.useEffect(() => {
    setTotal(orderV.total);
    fetcher.load("/pos?paymentMethods=all");
  }, [orderV]);

  React.useEffect(() => {
    setPaymentmethods([
      fetcher.data?.paymentMethods.map((mtd, index) => (
        <motion.div
          key={uid(mtd)}
          style={{
            cursor: "pointer",
            display: "inline-block",
            margin: "10px",
            width: "30%",
            height: "50px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
            transition: "all 90ms linear",
            boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
          }}
          animate={{
            height:
              currentTarget === paymentInputRefs.current[index]
                ? "115px"
                : "50px",
          }}
        >
          {currentTarget === paymentInputRefs.current[index] ? (
            <IconButton
              title="Save"
              onClick={() => setCurrentTarget(null)}
              icon={<b>✓</b>}
              style={{
                color: "whitesmoke",
                width: "22px",
                height: "22px",
                position: "absolute",
                right: 5,
                backgroundColor: "orange",
                bottom: 5,
                borderRadius: "50%",
              }}
            />
          ) : (
            ""
          )}

          <Box
            background="input"
            onClick={() => {
              setCurrentTarget(paymentInputRefs.current[index]);

              paymentInputRefs.current[index].scrollIntoView();
              setCurrentTargetObject(mtd);
            }}
            round={{ size: "small" }}
            border={{
              color:
                currentTarget === paymentInputRefs.current[index]
                  ? { dark: "#453b3b", light: "#f7c5c1" }
                  : "none",
            }}
            style={{
              width: "100%",
              padding: "20px",
              height: "100%",
            }}
          >
            <Box
              style={{
                width: "100%",
                position: "relative",
                display: "block",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  width: "50%",
                  overflow: "hidden",
                  height: "25px",
                  lineHeight: 1.5,
                  textOverflow: "ellipsis",
                  textAlign: "left",
                  float: "left",
                  display: "inline-block",
                  textTransform: "capitalize",
                }}
                title={mtd.name}
              >
                {mtd.name}
              </Text>
              <Text
                color={"default"}
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  float: "right",
                  width: "50%",
                  overflow: "hidden",
                  position: "relative",
                  textAlign: "right",
                  height: "25px",
                  lineHeight: 1.5,
                  textOverflow: "ellipsis",

                  textTransform: "capitalize",
                  display:
                    paymentInputRefs.current[index] === currentTarget
                      ? "none"
                      : "inline-block",
                }}
              >
                {paymentInputRefs.current[index]?.value}
              </Text>
              <small
                style={{
                  position: "absolute",
                  right: "-10px",
                  fontSize: "14px",
                  top: "-12px",
                }}
              >
                {" "}
                {mtd.currency}{" "}
              </small>
            </Box>
            <Box
              style={{
                width: "100%",
                height: "auto",
                display:
                  currentTarget === paymentInputRefs.current[index]
                    ? "block"
                    : "none",
                borderRadius: "10px",
              }}
              background={"box"}
              margin={{ vertical: "small" }}
            >
              <CurrencyInput
                name={mtd.name}
                id={"paymentInput-" + index}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "inherit",
                  color: "inherit",

                  border: "none",
                  transition: "100ms ease-in",
                  borderRadius: "10px",
                  outlineColor: "pink",
                  borderColor: "pink",
                }}
                ref={(el) => (paymentInputRefs.current[index] = el)}
                decimalsLimit={2}
                defaultValue={paymentInputRefs.current[index]?.value || 0}
                placeholder={`Enter ${mtd.name} amount.`}
              ></CurrencyInput>
            </Box>

            <Box style={{ display: "block" }} margin={"xsmall"}>
              {inputSuggestions.length >= 1
                ? inputSuggestions.map((sg) => (
                    <Tag
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      {sg.value}
                    </Tag>
                  ))
                : ""}
            </Box>
          </Box>
        </motion.div>
      )),
    ]);
  }, [fetcher.data, currentTarget]);

  const getPaymentFieldsTotal = () => {
    var totalSum = 0;

    for (let i = 0; i < paymentInputRefs.current.length; i++) {
      totalSum += +replaceAll(",", "", paymentInputRefs.current[i].value);
    }

    return totalSum;
  };
  const paidAmount = getPaymentFieldsTotal();

  const checkoutButtonStyle = {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "inherit",
    padding: "30px",
    fontSize: "25px",
    fontWeight: "bolder",
    backgroundColor: "inherit",
    boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px",
  };

  const handleKeyInput = (val) => {
    if (currentTarget === null) {
      return toaster.push(
        <Message type="info">Select a Payment Method</Message>,
      );
    }

    currentTarget.focus();
    if (val !== "delete") {
      if (currentTarget.value.includes(".") && val === ".") {
        return;
      }
      if (
        currentTarget.value.startsWith(".") ||
        currentTarget.value.startsWith("00")
      ) {
        currentTarget.value = "";
      }

      currentTarget.value += val;
    } else {
      currentTarget.value =
        currentTarget.value.slice(0, [currentTarget.value.length - 1]) || "";
    }
  };

  const KeyPad = () => {
    return (
      <List
        style={{
          scrollbarColor: "pink",
          scrollbarWidth: "thin",
          scrollBehavior: "smooth",
          height: "100%",

          width: "100%",
        }}
      >
        <List.Item
          style={{
            padding: "0px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center ",
            border: "none",
            backgroundColor: "inherit",
          }}
        >
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={3}
          >
            3
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={2}
          >
            2
          </RButton>
          <RButton
            style={{
              height: "6vh",
              margin: "2.5px",
              width: "30%",

              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={1}
          >
            {" "}
            1
          </RButton>
        </List.Item>

        <List.Item
          style={{
            padding: "0px",
            width: "100%",
            margin: "0 auto",
            border: "none",
            textAlign: "center ",
            backgroundColor: "inherit",
          }}
        >
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={6}
          >
            6
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={5}
          >
            5
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={4}
          >
            {" "}
            4
          </RButton>
        </List.Item>
        <List.Item
          style={{
            padding: "0px",
            border: "none",
            width: "100%",
            margin: "0 auto",
            textAlign: "center ",
            backgroundColor: "inherit",
          }}
        >
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={9}
          >
            9
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={8}
          >
            8
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={7}
          >
            {" "}
            7
          </RButton>
        </List.Item>
        <List.Item
          style={{
            padding: "0px",
            width: "100%",
            margin: "0 auto",
            border: "none",
            textAlign: "center ",
            backgroundColor: "inherit",
          }}
        >
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "20px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={"delete"}
          >
            Delete
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={0}
          >
            0
          </RButton>
          <RButton
            style={{
              height: "6vh",
              width: "30%",
              margin: "2.5px",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            onClick={(e) => handleKeyInput(e.target.value)}
            value={"."}
          >
            {" "}
            .
          </RButton>
        </List.Item>
      </List>
    );
  };

  return (
    <motion.div
      className="itm-card"
      initial={{
        borderRadius: "6px",
        transition: " all 100ms",
        width: "inherit",

        color: "#555",
      }}
      whileHover={{ boxShadow: "rgba(120, 107, 135, 0.1) 0px 4px 12px" }}
    >
      <Card pad={"small"}>
        <CardHeader
          style={{
            justifyContent: "left",
            alignContent: "start",
            textAlign: "left",
          }}
          title={"Payment Method"}
        >
          {" "}
          <Heading size="20px" weight={"small"} as="h4" color={"default"}>
            {" "}
            Payment Method
          </Heading>
        </CardHeader>
        <Form onSubmit={handleSubmitPayment}>
          <CardBody>
            <Box
              className="payment-methods-cont"
              pad={"small"}
              style={{
                overflowY: "auto",
                display: "block",
                maxHeight: "150px",
                scrollbarWidth: "thin",
                scrollBehavior: "smooth",
              }}
            >
              {...paymentMethods}
            </Box>

            <Box style={{ display: "block", width: "100%" }}>
              <Box
                style={{
                  textAlign: "left",
                  display: "inline-block",
                  width: "45%",
                  margin: "2px",
                  float: "left",
                }}
              >
                <Heading
                  as={"h4"}
                  style={{ fontSize: "17px" }}
                  margin={"small"}
                >
                  Additional Content
                </Heading>
                <Box margin={{ vertical: "small" }}>
                  <TextArea name="orderNote" cols={8} placeholder="Note"></TextArea>
                </Box>
              </Box>

              <Box
                align="end"
                alignSelf="end"
                pad={"small"}
                margin={{ vertical: "small" }}
                style={{
                  width: "45%",
                  margin: "2px",
                  display: "inline-block",
                  float: "right",
                }}
              >
                <KeyPad />
              </Box>
            </Box>
          </CardBody>
          <CardFooter>
            <Box
              background={{ dark: "#332e33", light: "#e8cdca" }}
              style={{ width: "100%" }}
              round={{ size: "small" }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "block",
                  position: "relative",
                }}
              >
                <Box
                  pad={"small"}
                  style={{
                    width: "30%",
                    textAlign: "center",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <Text weight={"bolder"} size="medium">
                    {" "}
                    Total
                  </Text>
                  <Text color={"default"}>
                    <h4 style={{ color: "inherit", fontSize: "30px" }}>
                      {total}
                    </h4>
                  </Text>
                </Box>
                <Divider
                  vertical
                  style={{
                    position: "absolute",
                    bottom: 0,
                    top: 0,
                    height: "40px",
                  }}
                />
                <Box
                  pad={"small"}
                  style={{
                    width: "30%",
                    textAlign: "center",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <Text weight={"bolder"} size="medium">
                    Paid
                  </Text>
                  <Text color={"default"}>
                    <h4 style={{ color: "inherit", fontSize: "30px" }}>
                      {" "}
                      {paidAmount <= 0 ? 0 : paidAmount}
                    </h4>
                  </Text>
                </Box>
                <Divider
                  vertical
                  style={{
                    position: "absolute",
                    bottom: 0,
                    top: 0,
                    height: "40px",
                  }}
                />
                <Box
                  pad={"small"}
                  style={{
                    width: "30%",
                    textAlign: "center",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <Text weight={"bolder"} size="medium">
                    {+(paidAmount <= 0 ? 0 : paidAmount) > total
                      ? "Change"
                      : "To Be Paid"}
                  </Text>
                  <Text color={"default"}>
                    <h4 style={{ color: "inherit", fontSize: "30px" }}>
                      {" "}
                      {total > paidAmount
                        ? total - paidAmount
                        : paidAmount - total}
                    </h4>
                  </Text>
                </Box>
              </Box>
              <Box
                background={{ dark: "#a695a3", light: "#FCD8C9" }}
                pad={"none"}
                style={{
                  height: "8vh",
                  bottom: 0,
                  position: "relative",
                }}
              >
                <RButton
                  style={checkoutButtonStyle}
                  startIcon={<Cart color="inherit" />}
                  type="submit"
                >
                  {" "}
                  Complete Order{" "}
                </RButton>{" "}
              </Box>
            </Box>
          </CardFooter>
          
          <input hidden name="orderCode" value={orderV.code}/>
        </Form>
      </Card>
    </motion.div>
  );
}
