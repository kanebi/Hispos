import React from "react";
import { motion } from "framer-motion";
import {
  useToaster,
  Stack,
  Divider,
  Tag,
  Button,
  ButtonGroup,
  Modal,
  Input,
  Container,
  Form,
  Message,
} from "rsuite";
import { useFetcher } from "@remix-run/react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  ResponsiveContext,
  Text,
} from "grommet";
import { uid } from "react-uid";
import { FaShoppingCartIcon } from "smarthr-ui";



export default function OrderComplete({
  orderV,
  orderPayment,
  posProfile,
  handleNewOrder,
}) {
  const screenSize = React.useContext(ResponsiveContext);
  const [showMail, setShowMail] = React.useState(false);
  const fetcher = useFetcher();
  const toaster = useToaster();

  React.useEffect(() => {
  if (fetcher.data?.msg){
  toaster.push(<Message type={fetcher.data.type}>{fetcher.data.msg}</Message>)
  setShowMail(false)
  }
  
  }, [fetcher.data]);

  const handleMailReceipt = () => {
    setShowMail(!showMail);
  };

  const handlePrintReceipt = () => {
    window.open(`/pos/${orderV.code}/invoice`);
  };
  return (
  orderV  && (
    <motion.div
      style={{
        width: "100%",
        padding: "20px",
      }}
      initial={{ top: 400 }}
      animate={{ top: 0 }}
    >
      <Card
        className="mini-reciept-cont"
        pad={"small"}
        style={{
          width: screenSize === "small" ? "100vw" : "30vw",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          margin: "0 auto",
          height: "100%",
        }}
        background={"box"}
        round={{ size: "small" }}
        border={{ color: "border", size: "medium", style: "double" }}
      >
        <CardHeader style={{ display: "block", width: "100%" }}>
          <Box
            style={{
              display: "inline-block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineBreak: "unset",
              width: "45%",
              float: "left",
            }}
          >
            {" "}
            <Stack
              spacing={3}
              direction="column"
              style={{ alignSelf: "start", alignItems: "start" }}
            >
              <Heading
                as={"h4"}
                weight={"bolder"}
                size="26px"
                style={{ textAlign: "left", margin: "0px" }}
              >
                {orderV.customer.name}
              </Heading>
              <Text
                truncate={"tip"}
                weight={"bolder"}
                style={{ textAlign: "left", margin: "0px" }}
              >
                {orderV.customer?.email || orderV.customer.phone || ""}
              </Text>
              <Divider style={{ margin: "2px" }} />
              <Text
                truncate={"tip"}
                weight={"bolder"}
                color={"icon"}
                style={{ textAlign: "left" }}
              >
                Sold By: {orderV.posProfile.salesAdmin} | in :{" "}
                <b>{orderV.posProfile.shop}</b>
              </Text>
            </Stack>
          </Box>
          <Box
            style={{
              display: "inline-block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineBreak: "unset",
              width: "45%",
              float: "right",
              textAlign: "right",
            }}
          >
            {" "}
            <Stack
              spacing={3}
              direction="column"
              style={{ alignSelf: "end", alignItems: "end" }}
            >
              <Heading
                as={"h4"}
                alignSelf="end"
                style={{ textAlign: "right", margin: "0px" }}
                weight={"bolder"}
                size="26px"
              >
                {orderV.currency} {orderV.total}
              </Heading>{" "}
              <Text
                truncate={"tip"}
                weight={"bolder"}
                style={{ textAlign: "right", width: "inherit", margin: "0px" }}
              >
                {orderV.code}
              </Text>
              <Tag color={orderPayment.payment.status === "paid" ? "green" : "cyan"}>
                <Text
                  style={{
                    textTransform: "capitalize",
                    textOverflow: "ellipsis",
                    textAlign: "right",
                  }}
                  truncate={"tip"}
                  weight={"bolder"}
                >
                  {orderPayment.payment.status}
                </Text>
              </Tag>
            </Stack>
          </Box>
        </CardHeader>

        <CardBody
          style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollMargin: "0px",
            scrollBehavior: "smooth",
          }}
          pad={"small"}
          margin={{ vertical: "small" }}
        >
          {orderV.cartItems.map((crt) => (
            <div key={uid(crt)}>
              <Box className="table-head" style={{ display: "block" }}>
                <Text
                  weight={"bolder"}
                  style={{ display: "inline-block" }}
                  textAlign="start"
                >
                  <FaShoppingCartIcon color={"inherit"} />
                </Text>
                <Text style={{ display: "inline-block", float: "right" }}>
                  {crt.id}{" "}
                </Text>
              </Box>
              <Box className="table-head">
                <Text weight={"bolder"} size="21px" textAlign="start">
                  Items
                </Text>
              </Box>

              {crt.items.map((itm) => (
                <Box
                  background={"input"}
                  key={uid(itm)}
                  color={"default"}
                  pad={"small"}
                  margin={{ vertical: "small" }}
                  round={{ size: "small" }}
                  className="table-content"
                  style={{
                    fontSize: "20px",
                    paddingTop: "20px",
                    display: "block",
                    width: "100%",
                    height: "8vh",
                  }}
                >
                  <Text
                    title="Item name"
                    style={{
                      display: "inline-block",
                      width: "50%",
                      float: "left",
                    }}
                  >
                    {itm.item.name}
                  </Text>
                  <Text
                    title="Item Quantity"
                    style={{
                      display: "inline-block",
                      textAlign: "right",
                      width: "20%",
                    }}
                  >
                    {itm.quantity}
                  </Text>
                  <Text
                    title="Item Total"
                    style={{
                      display: "inline-block",
                      float: "right",
                      textAlign: "right",
                      width: "30%",
                    }}
                  >
                    {itm.totalPrice}
                  </Text>
                </Box>
              ))}
            </div>
          ))}
          <Box className="totals-table">
            <Box className="table-head">
              <Text weight={"bolder"} size="21px" textAlign="start">
                Totals
              </Text>
            </Box>
            <Box
              background={"input"}
              color={"default"}
              pad={"small"}
              // margin={"small"}
              round={{ size: "small" }}
              className="table-content"
              style={{
                fontSize: "20px",
                // paddingTop: "20px",
                display: "block",
                width: "100%",
                // height: "8vh",
              }}
            >
              <div>
                <Text
                  title="Item Subtotal"
                  color={"default"}
                  style={{
                    display: "inline-block",
                    width: "50%",
                    float: "left",
                  }}
                  margin={{ vertical: "small" }}
                  weight={"bolder"}
                >
                  Sub-Total
                </Text>
                <Text
                  title="Item SubTotal"
                  margin={{ vertical: "small" }}
                  style={{
                    display: "inline-block",
                    float: "right",
                    textAlign: "right",
                    width: "50%",
                  }}
                  weight={"bolder"}
                  color={"default"}
                >
                  {orderV.currency} {orderV.subTotal}
                </Text>
              </div>
              <div>
                <Text
                  title="Item Total"
                  weight={"bolder"}
                  style={{
                    display: "inline-block",
                    width: "50%",
                    float: "left",
                  }}
                  color={"default"}
                >
                  Total{" "}
                </Text>
                <Text
                  title="Item Total"
                  style={{
                    display: "inline-block",
                    float: "right",
                    textAlign: "right",
                    width: "50%",
                  }}
                  color={"default"}
                  weight={"bolder"}
                >
                  {orderV.currency} {orderV.total}
                </Text>
              </div>
            </Box>
          </Box>
          <Box className="payment-total">
            <Box className="table-head totals">
              <Text weight={"bolder"} size="21px" textAlign="start">
                Payments
              </Text>
            </Box>
            <Box
              background={"input"}
              color={"default"}
              pad={"small"}
              // margin={"small"}
              round={{ size: "small" }}
              className="table-content"
              style={{
                fontSize: "20px",
                display: "block",
                width: "100%",
              }}
            >
              {orderPayment.methods.map((mtd) => (
                <div key={uid(mtd)}>
                  <Text
                    title="payment methods"
                    margin={{ vertical: "small" }}
                    color={"default"}
                    style={{
                      display: "inline-block",
                      width: "50%",
                      float: "left",
                    }}
                    weight={"bold"}
                  >
                     {mtd.name}
                  </Text>
                  <Text
                    margin={{ vertical: "small" }}
                    color={"default"}
                    title="payment amount"
                    style={{
                      display: "inline-block",
                      float: "right",
                      textAlign: "right",
                      width: "50%",
                    }}
                    weight={"bolder"}
                  >
                    {mtd.currency} {mtd.amount}
                  </Text>
                </div>
              ))}
            </Box>
          </Box>
          <Box className="rcp-actions">
            <ButtonGroup justified size="lg">
              <Button
                onClick={handlePrintReceipt}
                style={{ fontWeight: "bolder", width: "30%", margin: "5px" }}
              >
                Print Receipt
              </Button>
              <Button
                onClick={handleMailReceipt}
                style={{ fontWeight: "bolder", width: "30%", margin: "5px" }}
              >
                Email Receipt
              </Button>
              <Button
                style={{ fontWeight: "bolder", width: "30%", margin: "5px" }}
                onClick={handleNewOrder}
              >
                New Order
              </Button>
            </ButtonGroup>
          </Box>
        </CardBody>
      </Card>
      <Modal open={showMail} >
        <Modal.Title>Mail Invoice</Modal.Title>
        <Modal.Body>
          <Container>
            <Form
              onSubmit={(status, e) =>
                fetcher.submit(e.currentTarget, { method: "POST" })
              }
            >
              <Form.Group>
                <Form.Control name="email" required placeholder="Enter Email" />
                <Form.Control
                  style={{ display: "none" }}
                  value={orderV.posProfile.salesAdmin}
                  
                  name="senderName"
                />
                <Form.Control
                  name="company"
                  style={{ display: "none" }}
                  value={orderV.posProfile.company}
                />
                <Form.Control
                  name="action"
                  style={{ display: "none" }}
                  value={"mailReceipt"}
                />
                <Button  type="submit">Send Receipt</Button>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red"  onClick={() => setShowMail(false)} size="sm">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> 
    </motion.div>)
  );
}
