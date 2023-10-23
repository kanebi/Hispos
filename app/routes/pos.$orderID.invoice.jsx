import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import { Divider, Header, Nav, Navbar, useToaster } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useLoaderData } from "@remix-run/react";
import { Download, Print } from "grommet-icons";
import { uid } from "react-uid";
import { FaShoppingCartIcon } from "smarthr-ui";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import ReactDomServer from "react-dom/server";
import ReactPDF, {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import html2canvas from "html2canvas";
// import {Page}

export function loader({ params, request }) {
  const orderID = params.orderID;
  // use id to fetch order details from db
  const order = {};

  var cartItems = [
    {
      id: 1,
      onHold: false,
      items: [
        {
          id: 22,
          item: {
            id: 5,
            name: "Pizza",
            price_amount: "1800",
            valuation_rate: "1800",
            image: null,
            min_order_qty: 1,
            allow_negative_stock: true,
            price_currency: "NGN",
            description: "Delicious pizza with various toppings.",
            price: "NGN18000",
            stock_uom: "Unit",
            tax: "22",
            available_stock_quantity: 15,
            barcode: "sdfjso7890jsf",
            userFav: false,
            userPined: true,
            warehouse: "obigbp",
          },
          quantity: 2,
          taxTotal: "333",
          ordered: true,
          percDiscount: 0,
          totalPrice: "NGN3600",
        },
        {
          item: {
            id: 8,
            name: "Fish Fillet",
            price_amount: "2200",
            image: null,
            price_currency: "NGN",
            description: "Tender fish fillet.",
            price: "NGN22000",
            stock_uom: "Unit",
            min_order_qty: 1,
            valuation_rate: "2000",
            tax: "8.2",
            allow_negative_stock: false,
            available_stock_quantity: 4,
            barcode: "sdfjso4567jsf",
            userFav: true,
            userPined: false,
          },
          id: 23,
          quantity: 1,
          taxTotal: "222",
          percDiscount: 0,
          ordered: true,

          totalPrice: "NGN2200",
        },
      ],
      totalPrice: "NGN2300",
      totalPriceAmount: "2300",
    },
    {
      id: 2,
      onHold: true,
      items: [
        {
          item: {
            id: 11,
            name: "Tacos",
            price_amount: "1700",
            image: null,
            price_currency: "NGN",
            description: "Tasty tacos.",
            price: "NGN17000",
            stock_uom: "Unit",
            available_stock_quantity: 6,
            min_order_qty: 2,
            valuation_rate: "10000",
            barcode: "sdfjso1234jsf",
            userFav: false,
            tax: "9",
            allow_negative_stock: false,
            userPined: true,
            warehouse: "olomoro",
          },
          id: 28,
          ordered: true,

          quantity: 3,
          taxTotal: "93",
          percDiscount: 0,
          totalPrice: "NGN5100",
        },
        {
          id: 26,

          item: {
            id: 17,
            name: "Shrimp Scampi",
            price_amount: "2600",
            image: null,
            price_currency: "NGN",
            min_order_qty: 1,
            description: "Scrumptious shrimp scampi.",
            price: "NGN26000",
            allow_negative_stock: true,
            stock_uom: "Unit",
            available_stock_quantity: 3,
            valuation_rate: "2000",
            barcode: "sdfjso5678jsf",
            userFav: false,
            tax: "2.22",
            userPined: true,
            warehouse: "obidgo",
          },
          taxTotal: "4",
          quantity: 2,
          percDiscount: 0,
          ordered: true,

          totalPrice: "NGN5200",
        },
      ],
      totalPrice: "NGN10300",
      totalPriceAmount: "10300",
    },
  ];
  var cartsTotalSum = 0;
  var cartsSubTotalSum = 0;

  const availableCarts = cartItems.filter((crt) => crt.onHold === false);
  for (let i = 0; i < availableCarts.length; i++) {
    const cart = availableCarts[i];

    var crtItmSum = 0;

    // convert to default currency if necessary
    for (let i = 0; i < cart.items.length; i++) {
      const crtItm = cart.items[i];
      if (+crtItm.percDiscount > 0) {
        crtItmSum +=
          +crtItm.item.price_amount * +crtItm.quantity +
          +(crtItm.quantity * +crtItm.item.tax) -
          (crtItm.percDiscount / 100) *
            (+crtItm.item.price_amount * +crtItm.quantity +
              +(crtItm.quantity * +crtItm.item.tax));
      } else {
        crtItmSum +=
          +crtItm.item.price_amount * +crtItm.quantity +
          +crtItm.quantity * +crtItm.item.tax;
      }
    }
    cartsSubTotalSum += crtItmSum;
    cartsTotalSum += cartsSubTotalSum;
  }
  order.cartItems = cartItems;

  if (order.coupon?.isValid === true) {
    cartsTotalSum =
      cartsSubTotalSum - (order.coupon.percentage / 100) * cartsSubTotalSum;
  }
  order.total = cartsTotalSum.toFixed(2);
  order.subTotal = cartsSubTotalSum.toFixed(2);
  order.dateCompleted = "23th Dec 2023";
  order.timeCompleted = "9:30am";
  // to be generated and saved to db
  // unique code or id
  order.code = "3iedfc9383";
  // select profile default
  order.currency = "NGN";

  // sum up order payments and get below
  order.totalPaid = 12200;
  order.balance = 120;
  order.customer = { name: "kanemanuel emmanuel", email: "jon@gmai.com" };
  order.totalDiscount = "NGN 230000";
  order.totalTax = "NGN 2000";
  // order.posSession = {}
  order.posProfile = {
    name: "Elliana",
    defaultCurrency: "NGN",
    shop: "Ellen Store",
    salesAdmin: "Kanebi",
    allowAdminDiscount: true,
    note: "Bla blan bla bla bla bla bla bla i am the son of the most High",
  };

  // get shop and company using sessoion data and pos profile
  const orderShop = { invoiceFooterText: "null" };

  // get company using shop  or  profile data
  const orderCompany = {
    name: "HPR",
    shops: ["Ph shop", "alcon Shop", "gentle shop"],
    logo: "",
    url: "https://accountgig.com",
    includeLogoOnInvoice: true,
    // logoWidth: 100,
    // logoHeight: 100,
  };

  // use order to get payment(through model) thats exists with order id and payments  (manyTomany  )
  const paymentObj = {
    methods: [
      { name: "Zenth Bank", amount: "300", currency: "NGN" },
      { name: "Access Bank", amount: "20000", currency: "NGN" },
      { name: "UBA Bank Current", amount: "1000", currency: "NGN" },
    ],
    status: "paid",
  };
  return {
    order: order,
    payment: paymentObj,
    shop: orderShop,
    company: orderCompany,
  };
}

export default function OrderInvoice(props) {
  const [loading, setloading] = React.useState(true);
  const [order, setOrder] = React.useState(null);
  const [orderPayment, setOrderPayment] = React.useState(null);
  const loader = useLoaderData();
  const [company, setCompany] = React.useState({});
  const [orderShop, setOrderShop] = React.useState({});
  const printElement = React.useRef(null);
  const handlePrint = useReactToPrint({ content: () => printElement.current });

  // const Invoice = (

  // );
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  const OrderInvoice = () => {
    return (
      order && (
       
                <div
                  ref={printElement}
                  id="invoice-cont"
                  style={{
                    padding: "10px",
                    paddingRight: "20px",
                    width: "100%",
                    paddingLeft: "20px",
                  }}
                >
                  <Box
                    className="letterHead-logo"
                    style={{ width: "100%" }}
                    pad={"small"}
                    margin={"small"}
                  >
                    {company.includeLogoOnInvoice && company.logo && (
                      <img
                        src={company.logo}
                        width={company.logoWidth || 150}
                        height={company.logoHeight || 120}
                      />
                    )}
                  </Box>

                  <Box
                    className="letterhead-text"
                    style={{
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bolder" }}>
                      <h4>{company.name}</h4>
                    </div>
                    <div>
                      {" "}
                      <b style={{ fontWeight: "bolder" }}>Invoice</b>
                    </div>
                  </Box>

                  <Box className="time-address-stamp">
                    <div>
                      {" "}
                      <b>Order Code: </b> {order.code}
                    </div>
                    <div>
                      {" "}
                      <b>Cashier: </b> {order.posProfile.salesAdmin}
                    </div>
                    <div>
                      {" "}
                      <b>Customer </b>{" "}
                      {order.customer.name || order.customer.email}
                    </div>
                    <div>
                      {" "}
                      <b>Date: </b> {order.dateCompleted}
                    </div>
                    <div>
                      {" "}
                      <b>Time:</b> {order.timeCompleted}
                    </div>
                  </Box>
                  <Divider />

                  <Box className="table">
                    <div
                      style={{ display: "block", fontWeight: "bolder" }}
                      className="table-head"
                    >
                      <Box
                        title="Item "
                        weight={"bolder"}
                        style={{
                          display: "inline-block",
                          width: "30%",
                        }}
                      >
                        Item{" "}
                      </Box>
                      <Box
                        title="Quantity"
                        style={{
                          display: "inline-block",

                          textAlign: "right",
                          width: "20%",
                        }}
                        weight={"bolder"}
                      >
                        Qty
                      </Box>
                      <Box
                        title="Tax"
                        style={{
                          display: "inline-block",

                          textAlign: "right",
                          width: "25%",
                        }}
                        weight={"bolder"}
                      >
                        Tax
                      </Box>
                      <Box
                        title="Price Amount"
                        style={{
                          display: "inline-block",

                          textAlign: "right",
                          width: "25%",
                        }}
                        weight={"bolder"}
                      >
                        Amount
                      </Box>
                    </div>
                    {/* <Divider style={{ margin: "2px" }} /> */}

                    <Box className="table-body">
                      {order.cartItems.map((crt) => (
                        <div
                          key={uid(crt)}
                          style={{ display: "block" }}
                          className="table-row"
                        >
                          <Box
                            className="table-head"
                            style={{ display: "block" }}
                          >
                            <Text
                              weight={"bolder"}
                              style={{ display: "inline-block" }}
                              textAlign="start"
                            >
                              <FaShoppingCartIcon color={"inherit"} />
                            </Text>
                            <Text style={{ display: "inline-block" }}></Text>
                          </Box>
                          {crt.items.map((itm) => (
                            <div
                              key={uid(itm)}
                              style={{
                                paddingTop: "5px",
                                paddingBottom: "5px",
                              }}
                            >
                              <Box
                                title="Item "
                                weight={"bold"}
                                style={{
                                  display: "inline-block",
                                  width: "30%",
                                }}
                              >
                                {itm.item.name}
                              </Box>
                              <Box
                                title="Quantity"
                                style={{
                                  display: "inline-block",

                                  textAlign: "right",
                                  width: "20%",
                                }}
                                weight={"bold"}
                              >
                                {itm.quantity} @ {itm.item.price}
                              </Box>

                              <Box
                                title="Tax"
                                style={{
                                  display: "inline-block",

                                  textAlign: "right",
                                  width: "25%",
                                }}
                                weight={"bold"}
                              >
                                {itm.price_currency} {itm.taxTotal} @{" "}
                                {itm.price_currency} {itm.item.tax}
                              </Box>
                              <Box
                                title="Price Amount"
                                style={{
                                  display: "inline-block",

                                  textAlign: "right",
                                  width: "25%",
                                }}
                                weight={"bold"}
                              >
                                {itm.totalPrice}
                              </Box>
                            </div>
                          ))}
                          <Divider style={{ margin: "2px" }} />
                        </div>
                      ))}

                      <div style={{ fontWeight: "bold" }} className="totals">
                        <div
                          className="sub-total"
                          style={{ paddingTop: "5px", paddingBottom: "5px" }}
                        >
                          <Box
                            title="Item "
                            weight={"bolder"}
                            style={{
                              display: "inline-block",
                              width: "70%",
                              textAlign: "right",
                            }}
                          >
                            Sub-Total
                          </Box>
                          <Box
                            title="Price Amount"
                            style={{
                              display: "inline-block",

                              textAlign: "right",
                              width: "30%",
                            }}
                            weight={"bolder"}
                          >
                            {order.currency} {order.subTotal}
                          </Box>
                        </div>
                        <div
                          className="discount"
                          style={{ paddingTop: "5px", paddingBottom: "5px" }}
                        >
                          <Box
                            title="Item "
                            weight={"bold"}
                            style={{
                              display: "inline-block",
                              width: "70%",
                              textAlign: "right",
                            }}
                          >
                            Discount Total
                          </Box>
                          <Box
                            title="Price Amount"
                            style={{
                              display: "inline-block",

                              textAlign: "right",
                              width: "30%",
                            }}
                            weight={"bold"}
                          >
                            {order.totalDiscount}
                          </Box>
                        </div>
                        <div
                          className="tax"
                          style={{ paddingTop: "5px", paddingBottom: "5px" }}
                        >
                          <Box
                            title="Item "
                            weight={"bold"}
                            style={{
                              display: "inline-block",
                              width: "70%",
                              textAlign: "right",
                            }}
                          >
                            Tax Total
                          </Box>
                          <Box
                            title="Price Amount"
                            style={{
                              display: "inline-block",

                              textAlign: "right",
                              width: "30%",
                            }}
                            weight={"bold"}
                          >
                            {order.totalTax}
                          </Box>
                        </div>
                        <div
                          className="total"
                          style={{ paddingTop: "5px", paddingBottom: "5px" }}
                        >
                          <Box
                            title="Item "
                            weight={"bolder"}
                            style={{
                              display: "inline-block",
                              width: "70%",
                              textAlign: "right",
                            }}
                          >
                            Total
                          </Box>
                          <Box
                            title="Price Amount"
                            style={{
                              display: "inline-block",

                              textAlign: "right",
                              width: "30%",
                            }}
                            weight={"bolder"}
                          >
                            {order.currency} {order.total}
                          </Box>
                        </div>
                      </div>

                      <div className="payments">
                        {orderPayment.methods.map((pymnt) => (
                          <div
                            style={{ paddingTop: "5px", paddingBottom: "5px" }}
                          >
                            <Box
                              title="Item "
                              weight={"bold"}
                              style={{
                                display: "inline-block",
                                width: "70%",
                                textAlign: "right",
                              }}
                            >
                              {pymnt.name}
                            </Box>
                            <Box
                              title="Price Amount"
                              style={{
                                display: "inline-block",

                                textAlign: "right",
                                width: "30%",
                              }}
                              weight={"bold"}
                            >
                              {pymnt.currency} {pymnt.amount}
                            </Box>
                            <Divider style={{ margin: "3px" }}></Divider>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          paddingTop: "5px",
                          fontWeight: "bolder",
                          paddingBottom: "5px",
                        }}
                      >
                        <Box
                          title="Item "
                          weight={"bolder"}
                          style={{
                            display: "inline-block",
                            width: "70%",
                            textAlign: "right",
                          }}
                        >
                          Paid Amount
                        </Box>
                        <Box
                          title="Price Amount"
                          style={{
                            display: "inline-block",

                            textAlign: "right",
                            width: "30%",
                          }}
                          weight={"bolder"}
                        >
                          {order.totalPaid}
                        </Box>
                        {order.balance && (
                          <div
                            style={{
                              paddingTop: "5px",
                              fontWeight: "bolder",
                              paddingBottom: "5px",
                            }}
                          >
                            <Box
                              title="Item "
                              weight={"bolder"}
                              style={{
                                display: "inline-block",
                                width: "70%",
                                textAlign: "right",
                              }}
                            >
                              Balance
                            </Box>
                            <Box
                              title="Price Amount"
                              style={{
                                display: "inline-block",

                                textAlign: "right",
                                width: "30%",
                              }}
                              weight={"bolder"}
                            >
                              {order.balance}
                            </Box>
                          </div>
                        )}
                      </div>
                      <Divider />
                    </Box>
                  </Box>

                  <Box style={{ display: "block", textAlign: "center" }}>
                    {orderShop.invoiceFooterText ||
                      "Thank You For Your Patronage, Please Come again."}
                  </Box>
                </div>
          
      )
    );
  };

  const handleDownload = () => {
  const input = document.getElementById("invoice-cont");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG",0,0, 210, 250 );
    pdf.save(`${company.name}-invoice-${order.code}.pdf`);
  });
  };

  React.useEffect(() => {
    if (loader.payment && loader.order) {
      setOrderPayment(loader.payment);
      setOrder(loader.order);
    }
    if (loader.orderShop) {
      setShop(loader.orderShop);
    }
    if (loader.company) {
      setCompany(loader.company);
    }
    setloading(false);

    // if(order){
    // }
  }, [loader]);

  return (
    <motion.div>
      <Header>
        <Navbar>
          <Nav pullRight>
            <Nav.Item onClick={handlePrint} icon={<Print size="small" />}>
              Print
            </Nav.Item>
            <Nav.Item onClick={handleDownload} icon={<Download size="small" />}>
              Download PDF
            </Nav.Item>
          </Nav>
        </Navbar>
      </Header>
      <Box background={"input"} style={{ width: "50%", margin: "0 auto " }}>
        {order ? (
          <OrderInvoice />
        ) : (
          !loading && (
            <Box style={{ textAlign: "center", fontSize: "30px" }}>
              Oops! Not Found
            </Box>
          )
        )}
      </Box>
    </motion.div>
  );
}
