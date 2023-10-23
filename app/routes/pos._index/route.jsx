import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Header,
  Heading,
  Skeleton,
  FormField,
  Layer,
  DateInput,
  Select,
  TextArea,
  CheckBox,
  Button,
  Grid as GGrid,
  DataSearch,
  Tip,
  Tag as GTag,
  TextInput,
  Text,
  ResponsiveContext,
  Image,
} from "grommet";
import {
  Col,
  Container,
  Grid,
  Loader,
  Row,
  Button as RButton,
  IconButton,
  Nav,
  Navbar,
  Tag,
  Stack,
  Divider,
  Modal,
  Input,
  FlexboxGrid,
  List,
  Message,
  useToaster,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import POSHeader from "../../components/layouts/pos/header";
import CurrencyInput from "react-currency-input-field";
import {
  FaBoxIcon,
  FaHandsIcon,
  FaTrashIcon,
  StatusLabel,
  Tooltip,
} from "smarthr-ui";
import DateTimePicker from "react-datetime-picker";
import SelectCurrency from "@paylike/react-currency-select";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import productIcon from "../../../public/default_images/bascket.png";
import styled from "../../components/styled";
import {
  Calculator,
  UserManager,
  Search,
  Edit,
  Favorite,
  Hide,
  Pause,
  Resume,
  Cart,
  Grid as IGrid,
  List as IList,
} from "grommet-icons";
import ItemCard from "../../components/layouts/pos/item";
import itemSeed from "../../components/seeds/itemSeed";
import { uid } from "react-uid";
import POSCartItem from "../../components/layouts/pos/cartItem";
import { CheckOutline, Coupon, Icon, Minus } from "@rsuite/icons";
import EditCartItem from "../../components/layouts/pos/editCartItem";
import { toast } from "react-toastify";
import { Form, useActionData, useFetcher, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/node";
import Customer from "../../components/layouts/pos/customer";
import Payment from "../../components/layouts/pos/payment";
import OrderComplete from "../../components/layouts/pos/orderComplete";
// import { Search } from "@rsuite/icons";
import mailer from "../../../utils/mail.js";
import { replaceAll } from "../../../utils/str_utils";

export function loader({ params, request }) {
  const customer = new URL(request.url).searchParams.get("customer");
  const payment = new URL(request.url).searchParams.get("paymentMethods");
  console.log(customer);
  if (customer) {
    return json({
      customer: {
        id: 1,
        name: customer,
        email: "ejike@gmail.com",
        phone: "0902333234",
        address: "Woji estate",
        createdBy: "Loadnje",
      },
      recentTransactions: [
        {
          invoice: "12234kssl",
          amount: "12000",
          currency: "NGN",
          status: "credit",
          date: "22th may 2023",
          time: "12:30pm",
        },
        {
          invoice: "5994KSODP",
          amount: "3000",
          currency: "NGN",
          status: "paid",
          date: "22th may 2023",
          time: "12:30pm",
        },
        {
          invoice: "JUSIDOK203",
          amount: "2000",
          currency: "NGN",
          status: "paid",
          date: "22th may 2023",
          time: "12:30pm",
        },
      ],
    });
  }
  console.log(payment);
  if (payment === "all") {
    return json({
      paymentMethods: [
        { name: "Zenth Bank", id: 22, createdBy: "kane", currency: "NGN" },
        { name: "Access Bank", id: 22, createdBy: "kane", currency: "USD" },
        { name: "UBA Bank", id: 22, createdBy: "kane", currency: "NGN" },
        { name: "POS Monie Point", id: 22, createdBy: "kane", currency: "NGN" },
        { name: "Royal POS", id: 22, createdBy: "kane", currency: "NGN" },
        { name: "Access Bank POS", id: 22, createdBy: "kane", currency: "USD" },
        {
          name: "UBA Bank Current",
          id: 22,
          createdBy: "kane",
          currency: "NGN",
        },
        { name: "OPay", id: 22, createdBy: "kane", currency: "NGN" },
        { name: "FLutterwave ", id: 22, createdBy: "kane", currency: "USD" },
      ],
    });
  }
  return params;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  var order = {};

  if (data.payment) {
    var payment = JSON.parse(data.payment);
    // console.log(payment);
    order = payment.orderCode;
    orderNote = payment.orderNote;

    var pyMethodsUsed = [];

    for (const key in payment) {
      if (
        key !== "orderNote" &&
        key !== "orderCode" &&
        +replaceAll(",", "", payment[key]) > 0
      ) {
        pyMethodsUsed.push({
          name: key,
          amount: payment[key],
          currency: "NGN",
        });
      }
    }

    return json({ payment: { status: "paid" }, methods: pyMethodsUsed });
  }
  if (data.order) {
    order = JSON.parse(data.order);
    console.log(order);
    var cartItems = order.cartItems;
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

    if (order.coupon?.isValid === true) {
      cartsTotalSum =
        cartsSubTotalSum - (order.coupon.percentage / 100) * cartsSubTotalSum;
    }
    order.total = cartsTotalSum.toFixed(2);
    order.subTotal = cartsSubTotalSum.toFixed(2);

    // to be generated and saved to db
    // unique code or id
    order.code = "3iedfc9383";
    // select profile default
    order.currency = "NGN";
    order.totalDiscount = "NGN 230000";
    order.totalTax = "NGN2000";
    // order.posProfile = {}
    // order.posSession = {}
  }

  if (data.coupon) {
    var coupon = null;
    if (data.coupon === {}) {
      coupon = {};
    } else {
      // get Coupon from db
      coupon = {
        code: data.coupon,
        isValid: true,
        percentage: 50,
        createdBy: "kane",
      };
    }

    order.coupon = coupon;
  }
  if (data.action === "remove-coupon") {
    console.log("coupon removed");
    order.coupon = null;
  }
  if (data.action === "mailReceipt") {
    // get sales admin or company admin email instead of hispos
    mailer.sendMail({
      data: {
        from: `${data.senderName}  <hispos.info@gmail.com>`, // sender address
        to: data.email, // list of receivers
        subject: `Order Invoice from ${data.company}`, // Subject line
        text: "Receipt from a shop", // plain text body
        html: "Receipt from a Shop", // html body
      },
    });
    return json({ msg: "Email Sent", type: "success" });
  }
  return json({ order: order });
}

export default function PointOfSale(props) {
  const [loading, setloading] = React.useState(false);
  const [sessionData, setSessionData] = React.useState({});
  const [companyData, setCompanyData] = React.useState({
    name: "HPR",
    shops: ["Ph shop", "alcon Shop", "gentle shop"],
    logo: "",
    url: "https://accountgig.com",
    includeLogoOnInvoice: true,
    logoWidth: 100,
    logoHeight: 100,
  });

  const [loggedInUser, setLoggedInUser] = React.useState({
    username: "kanemanuel",
    isAdmin: true,
    last_name: "kanebi",
    first_name: "emmanuel",
    role: "Administrator",
    defaultProfile: "Obigbo Shop",
  });
  const [profiles, setProfiles] = React.useState([
    "obigbo profile",
    "aba profile",
  ]);
  const [itemsLoading, setItemsLoading] = React.useState(false);
  const [newSession, setNewSession] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);
  const [items, setItems] = React.useState(itemSeed);
  const screenSize = React.useContext(ResponsiveContext);
  const [systemUsers, setSystemUser] = React.useState([
    "kanebi",
    "doffe",
    "imog",
    "tobi",
  ]);

  const [itemsList, setItemsList] = React.useState(itemSeed);
  const [favsOnly, setFavsOnly] = React.useState(false);
  const [screenHeight, setScreenHeight] = React.useState(undefined);
  const [cartItems, setCartItems] = React.useState([
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

          totalPrice: "NGN5200",
        },
      ],
      totalPrice: "NGN10300",
      totalPriceAmount: "10300",
    },
  ]);
  const [cartsHeld, setCartsHeld] = React.useState(false);
  const [activeCart, setActiveCart] = React.useState(cartItems[0]?.id || null);
  const [pseudoActivecart, setPseudoActiveCart] = React.useState(null);
  const [cartsTotal, setCartsTotal] = React.useState(0);
  const [cartsSubTotal, setCartsSubTotal] = React.useState(0);
  const [sessionProfile, setSessionProfile] = React.useState({
    name: "Elliana",
    company: "HPR",
    defaultCurrency: "NGN",
    shop: "Ellen Store",
    salesAdmin: "Kanebi",
    allowAdminDiscount: true,
    note: "Bla blan bla bla bla bla bla bla i am the son of the most High",
  });

  const [defaultCurrency, setDefaultCurrency] = React.useState(
    sessionProfile?.defaultCurrency,
  );

  const [checkoutType, setCheckoutType] = React.useState("Active");
  const [cartGridView, setCartGridView] = React.useState(false);
  const [itemEditOn, setItemEditOn] = React.useState(false);
  const [currentItemOnEdit, setCurrentItemOnEdit] = React.useState(null);
  const [orderCoupon, setOrderCoupon] = React.useState({});
  const cartOnEditRef = React.useRef(null);

  const [editTargetValue, setEditTargetValue] = React.useState("");
  const [editTargetField, setEditTargetField] = React.useState(null);
  const [couponCode, setCouponCode] = React.useState(null);
  const actionData = useActionData();
  const submit = useSubmit();
  const fetcher = useFetcher();
  const [previousCoupon, setPreviousCoupon] = React.useState(null);
  const customerComRef = React.useRef(null);
  const [customerInfo, setCustomerInfo] = React.useState({
    id: null,
    name: null,
    image: "",
    email: "",
    phone: "",
    address: "",
    createdBy: "",
  });
  const [customers, setCustomers] = React.useState([
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ]);
  const [order, setOrder] = React.useState({
    customer: {
      id: 1,
      name: "Bryan",
      email: "ejike@gmail.com",
      phone: "0902333234",
      address: "Woji estate",
      createdBy: "Loadnje",
    },
    cartItems: [
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

            totalPrice: "NGN2200",
          },
        ],
        totalPrice: "NGN2300",
        totalPriceAmount: "2300",
      },
      {
        id: 3,
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
            percDiscount: 0,
            totalPrice: "NGN3600",
          },
          {
            item: {
              id: 9,
              name: "Pizza",
              price_amount: "2200",
              image: null,
              price_currency: "NGN",
              description: "Pizza .",
              price: "NGN92000",
              stock_uom: "Unit",
              min_order_qty: 1,
              valuation_rate: "8000",
              tax: "8.2",
              allow_negative_stock: false,
              available_stock_quantity: 9,
              barcode: "sdfjso4567jsf",
              userFav: true,
              userPined: false,
            },
            id: 23,
            quantity: 6,
            taxTotal: "222",
            percDiscount: 10,

            totalPrice: "NGN2200",
          },
        ],
        totalPrice: "NGN2300",
        totalPriceAmount: "2300",
      },
    ],
    coupon: {},
    total: "10000",
    subTotal: "5000",
    currency: "NGN",
    status: "completed",

    note: "",
    code: "3iedfc9383",
    posProfile: sessionProfile,
    posSession: sessionData,
  });
  const [paymentActive, setPaymentActive] = React.useState(false);
  const toaster = useToaster();

  const [orderComplete, setOrderComplete] = React.useState(false);
  const [orderPayment, setOrderPayment] = React.useState({
    methods: [
      { name: "Zenth Bank", amount: "300", currency: "NGN" },
      { name: "Access Bank", amount: "20000", currency: "NGN" },
      { name: "UBA Bank Current", amount: "1000", currency: "NGN" },
    ],
    status: "paid",
  });

  React.useEffect(() => {
    // update the itemsList or origin list
    const newItemsList = itemsList.map(
      (itm) => items.find((prd) => prd.id === itm.id) || itm,
    );
    setItemsList(newItemsList);

    if (typeof document !== undefined) {
      setScreenHeight(document.body.clientHeight);
    }

    var cartsTotalSum = 0;
    var cartsSubTotalSum = 0;

    const availableCarts = cartItems.filter((crt) => crt.onHold === false);
    for (let i = 0; i < availableCarts.length; i++) {
      const cart = availableCarts[i];
      if (cart.onHold === true && activeCart === cart.id) {
        if (cartItems.filter((itm) => itm.onHold === false).length >= 1) {
          setActiveCart(cartItems.filter((itm) => itm.onHold === false)[0]);
        } else {
          setActiveCart(null);
        }
      }
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

    if (orderCoupon.isValid === true) {
      cartsTotalSum =
        cartsSubTotal - (orderCoupon.percentage / 100) * cartsSubTotalSum;
    }

    setCartsSubTotal(cartsSubTotalSum.toFixed(2));
    setCartsTotal(cartsTotalSum.toFixed(2));
  }, [items, cartItems, activeCart, orderCoupon, actionData]);

  React.useEffect(() => {
    const response = fetcher.data;
    if (response?.payment) {
      setOrderPayment(response);
      toast.success("Order Successfully Completed", {
        position: "bottom-right",
      });

      toaster.push(<Message type="success">Payment Completed</Message>);
      return setOrderComplete(true);
    }
    if (response?.order) {
      setOrder(response.order);
    }

    if (response?.order.coupon) {
      // if (previousCoupon !== response.order.coupon) {
      if (response.order.coupon?.isValid === true) {
        setOrderCoupon(response.order.coupon);
        // toast.success("Coupon Successfully Applied");
        return;
      } else {
        // toast.error("Invalid Coupon");
        return;
      }
      // }
    }
  }, [fetcher.data]);

  const handleStartNewOrder = () => {
    setPaymentActive(false);
    setOrderComplete(false);

    setCartItems([]);
    setOrder(null);
    setOrderPayment(null);
    setCustomerInfo(null);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData);
    const data = { payment: JSON.stringify(entries) };
    fetcher.submit(data, { method: "POST" });
  };
  const handleCheckout = () => {
    if (paymentActive) {
      return setPaymentActive(false);
    }
    if (customerComRef.current.createNewActive()) {
      return toaster.push(
        <Message showIcon type="error">
          Save or cancel new Customer creation
        </Message>,
      );
    }
    if (
      customerInfo.id === null ||
      customerInfo.id === "" ||
      customerInfo.id === undefined
    ) {
      return toaster.push(
        <Message showIcon type="error">
          Select a customer{" "}
        </Message>,
      );
    }
    if (
      cartItems.length <= 0 ||
      cartItems.filter((itm) => itm.onHold === false && itm.items.length >= 1)
        .length <= 0
    ) {
      return toaster.push(
        <Message showIcon type="error">
          Select items to checkout
        </Message>,
      );
    }
    // create order in server
    fetcher.submit(
      {
        order: JSON.stringify({
          customer: customerInfo,
          cartItems:
            checkoutType === "Active" && activeCart !== null
              ? cartItems.filter((crt) => crt.id === activeCart)
              : cartItems.filter((crt) => crt.onHold === false),
          coupon: orderCoupon,
          posProfile: sessionProfile,
          posSession: sessionData,
        }),
      },
      { method: "POST" },
    );
    setPaymentActive(true);
  };
  const handleSelectCustomerDetail = (val) => {
    // get customer from server and set to customer info state

    setCustomerInfo({
      id: 1,
      name: val,
      email: "ejike@gmail.com",
      phone: "0902333234",
      address: "Woji estate",
      createdBy: "Loadnje",
    });

    customerComRef.current.getCustomerTransactions(1);
  };

  const handleSubmitCustomerDetails = ({ edit = true, e }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (edit == true) {
      // edit record
      var newCustomerInfo = customerInfo;
      for (let key in customerInfo) {
        newCustomerInfo[key] = data[key];
      }
      setCustomerInfo(newCustomerInfo);
    } else {
      // create one

      setCustomers((prev) => [...prev, data.name]);
      data.id = 2;
      data.createdBy = "kane";
      setCustomerInfo(data);
    }

    customerComRef.current.handleCustomerSaved({
      msg: edit ? "Edit Applied" : "Customer Saved",
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    fetcher.submit(data, { method: "POST" });
  };
  const handleRemoveCoupon = () => {
    fetcher.submit({ coupon: {} }, { method: "POST" });
    const response = fetcher.data;
    setOrderCoupon({});
  };
  const handleUpdateCart = (cart) => {
    const newCarts = cartItems.map((crt) => (crt.id !== cart.id ? crt : cart));
    setCartItems(() => [...newCarts]);
  };

  const resetItems = () => {
    setItems(itemsList);
  };
  const handleSearchItems = () => {};

  const handleShowFavOnly = () => {
    if (favsOnly === false) {
      setFavsOnly(true);
      const favList = itemsList.filter((itm) => itm.userFav === true);

      setItems(favList);
    } else {
      setFavsOnly(false);
      resetItems();
    }
  };
  const handleHoldCart = () => {
    const newCarts = [
      ...cartItems.map((cart) => {
        cart.onHold = !cartsHeld;
        return cart;
      }),
    ];
    setCartItems((prev) => newCarts);
    setCartsHeld(!cartsHeld);
  };

  const checkoutButtonStyle = {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "inherit",
    padding: "30px",
    fontSize: "30px",
    backgroundColor: paymentActive ? "initial" : "inherit",
    boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px",
  };

  const handleCartEditSubmit = (val) => {
    const itemOnEdit = currentItemOnEdit;
    itemOnEdit.quantity = val.quantity;
    itemOnEdit.percDiscount = val.percDiscount;
    itemOnEdit.item.price_amount = val.price_amount;
    itemOnEdit.item.warehouse = val.warehouse;
    itemOnEdit.item.stock_uom = val.stock_uom;
    itemOnEdit.item.tax = val.tax;
    // console.log(val);
    // console.log(itemOnEdit);
    const updatedCarts = cartItems.map((crt) =>
      crt.id === itemOnEdit ? itemOnEdit : crt,
    );
    setCartItems((prev) => [...updatedCarts]);
    setItemEditOn(false);
    setCurrentItemOnEdit(null);
  };
  const handleRemoveItemFromCart = ({ item, cart = null }) => {
    var targetCart = {};
    if (cart !== null) {
      targetCart = cart;
    } else {
      targetCart = cartItems.find((crt) => crt.id === pseudoActivecart);
    }
    const newItemList = targetCart.items.filter((itm) => itm.id != item.id);
    targetCart.items = newItemList;
    const newCartList = cartItems.map((crt) =>
      crt.id === targetCart.id ? targetCart : crt,
    );
    setCartItems((prev) => [...newCartList]);

    setItemEditOn(false);
    setCurrentItemOnEdit(null);
    return targetCart.items;
  };
  const handleKeyInput = (val) => {
    if (
      !["quantity", "remove", "price", "discount", "tax"].includes(val) &&
      editTargetField === null
    ) {
      toast.info("Select a field to edit");
    }
    if (isNaN(val) && val !== "" && val !== ".") {
      switch (val) {
        case "delete":
          setEditTargetValue("");
          handleKeyInput("");
          break;
        case "remove":
          handleRemoveItemFromCart({ item: currentItemOnEdit });
          break;
        default:
          setEditTargetField(val);
          break;
      }
    } else {
      setEditTargetValue(String(editTargetValue) + String(val));
      switch (editTargetField) {
        case "quantity":
          if (val !== "") {
            cartOnEditRef.current.setQuantityFunc(val);
          } else if (val === "") {
            cartOnEditRef.current.clearQuantity();
          }
          break;
        case "discount":
          if (val === "") {
            cartOnEditRef.current.clearDiscount();
          } else {
            cartOnEditRef.current.setPercDiscountFunc(val);
          }
          break;
        case "price":
          if (val === "") {
            cartOnEditRef.current.clearPrice();
          } else {
            cartOnEditRef.current.setpriceAmountFunc(val);
          }
          break;
        case "tax":
          if (val === "") {
            cartOnEditRef.current.clearTax();
          } else {
            cartOnEditRef.current.setTaxFunc(val);
          }
          break;

        default:
          break;
      }
    }
  };

  const deleteCart = ({ id }) => {
    const newCarts = cartItems.filter((itm) => itm.id != id);

    setCartItems((prev) => [...newCarts]);
  };
  return !orderComplete ? (
    <Container
      // style={{
      //             backgroundColor: "#f8d1ff",
      //             backgroundImage:
      //               "radial-gradient(#f745e2 0.5px, transparent 0.5px), radial-gradient(#f745e2 0.5px, #f8d1ff 0.5px)",
      //             backgroundSize: "20px 20px",
      //             backgroundPosition: "0 0,10px 10px",
      //           }}
      style={{ overflowX: "hidden" }}
    >
      <POSHeader
        company={companyData}
        profile={sessionProfile}
        setNewSession={setNewSession}
      ></POSHeader>
      <Grid style={{ width: "90%", height: "100vh" }}>
        <Row style={{ height: "10vh", overflow: "hidden" }}>
          <Col xs={24} lg={34} md={34} className="Pos-Header">
            <Header
              pad={"xsmall"}
              round={{ size: "xsmall" }}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              {/* <GGrid 
              areas={[{name:"left", start:[0,0], end:[0,0]}, {name:"right", start :[1,1], end:[1,1]}]} gap={"small"} 
              rows={["medium", "medium"]} columns={["small", "xsmall"]}> */}
              <Box gridArea="left">
                <Tooltip
                  title="Search items by Name, Item Code or Barcode"
                  message="Search items by Name, Item Code or Barcode"
                >
                  <DataSearch
                    size="inherit"
                    style={{
                      height: "40px",
                      border: "inherit",
                      fontSize: "16px",
                      outline: "none",
                    }}
                    icon={<Search size="16px" />}
                    onChange={() => setSearchActive(false)}
                    onFocus={() =>
                      searchActive === false ? setSearchActive(true) : ""
                    }
                    placeholder="Search Items"
                  />
                </Tooltip>
                <Box
                  style={{
                    position: "absolute",
                    width: "50px",
                    left: "210px",
                    top: "8px",
                  }}
                >
                  <IconButton
                    onClick={handleShowFavOnly}
                    title="Show Favourites only"
                    style={{
                      width: "20px",
                      background: "inherit",
                      textAlign: "center",
                    }}
                  >
                    <Favorite
                      size="20px"
                      color={favsOnly ? "active" : "default"}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Navbar style={{ backgroundColor: "inherit", padding: "10px" }}>
                <Nav
                  hidden={paymentActive}
                  title="Put Transaction on Hold"
                  pullRight
                >
                  <IconButton
                    style={{
                      marginLeft: "10px",

                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    title={cartsHeld ? "Resume All Carts" : "Hold All Carts"}
                    icon={
                      cartsHeld ? (
                        <Resume size="small" />
                      ) : (
                        <Pause size="small" />
                      )
                    }
                    onClick={handleHoldCart}
                  ></IconButton>
                </Nav>
                <Nav title="Open Calculator" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "10px",

                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    icon={<Calculator size="small" />}
                  ></IconButton>
                </Nav>

                <Nav title="Cart Grid View" pullRight>
                  <IconButton
                    style={{
                      marginLeft: "5px",
                      boxShadow:
                        " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    onClick={() => setCartGridView(!cartGridView)}
                    icon={
                      cartGridView ? (
                        <IList size="small" />
                      ) : (
                        <IGrid size="small" />
                      )
                    }
                  ></IconButton>
                </Nav>
                {itemEditOn && (
                  <Nav title="Hide Item Edit View" pullRight>
                    <IconButton
                      style={{
                        marginLeft: "5px",
                        padding: "6.5px",
                        boxShadow:
                          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      onClick={() => setItemEditOn(false)}
                      icon={<Hide size="20px" />}
                    ></IconButton>
                  </Nav>
                )}
              </Navbar>
              {/* <Box gridArea="right" ></Box>
              </GGrid> */}
            </Header>
          </Col>
        </Row>
        <Row
          gutter={10}
          style={{
            marginBottom: "0px",
            height: paymentActive ? "80vh" : "60vh",
            overflow: "hidden",
          }}
        >
          <Col sm={24} lg={15} xl={15} md={15} style={{ height: "inherit" }}>
            <Container
              className="Pos-Items-container"
              style={{ height: "inherit" }}
            >
              {paymentActive ? (
                <Box
                  round={{ size: "xsmall" }}
                  style={{
                    display: "block!important",
                    overflow: "hidden",
                    height: "inherit",
                    boxShadow: "rgba(159, 112, 212, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Payment
                    orderV={order}
                    handleSubmitPayment={handlePayment}
                    profile={sessionProfile}
                    setOrderFunc={setOrder}
                  />
                </Box>
              ) : (
                <Box
                  // pad={"small"}
                  round={{ size: "xsmall" }}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    overflowY: "scroll",
                    paddingRight: "0px",
                    // paddingLeft: screenSize === "medium" ? "15px" : "5px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    scrollMargin: "0px ",
                    scrollBehavior: "smooth",
                    scrollbarColor: "pink",
                    scrollbarGutter: "stable",
                    scrollbarWidth: "thin",
                    boxShadow: "rgba(159, 112, 212, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  {/* Pinned items  */}

                  {items.map(
                    (product, index) =>
                      product?.userPined && (
                   
                          <ItemCard
                            itemsList={items}
                            setItemsFunc={setItems}
                            product={product}
                            favsO={favsOnly}
                            originItemList={itemsList}
                          />
                      ),
                  )}

                  {/* unpined items */}

                  {items.map(
                    (product, index) =>
                      !product?.userPined && (
                        <ItemCard
                          key={uid(product)}
                          itemsList={items}
                          setItemsFunc={setItems}
                          product={product}
                          favsO={favsOnly}
                          originItemList={itemsList}
                        />
                      ),
                  )}
                </Box>
              )}
            </Container>
          </Col>{" "}
          <Col sm={24} style={{ height: "inherit" }} lg={9} md={9} xl={9}>
            <Container
              style={{ height: "inherit" }}
              className="Pos-Carts-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                // background={"brand"}
                style={{
                  borderBottomRightRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  overflow: "hidden",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                  height: "inherit",
                  scrollbarWidth: "thin",
                }}
              >
                <Header>
                  <Heading size="xxsmall" color={"default"} as={"h4"}>
                    Item Carts
                  </Heading>
                </Header>
                {cartItems.map((cart, index) => (
                  <div
                    onClick={() => {
                      cart.onHold === false ? setActiveCart(cart.id) : "";
                      setPseudoActiveCart(cart.id);
                    }}
                    style={{
                      cursor: "pointer",
                      display: paymentActive && cart.onHold ? "none" : "block",
                    }}
                    key={uid(cart)}
                  >
                    <POSCartItem
                      setEdit={setItemEditOn}
                      paymentIsActive={paymentActive}
                      setCurrentEdit={setCurrentItemOnEdit}
                      currentOnEdit={currentItemOnEdit}
                      cart={cart}
                      gridView={cartGridView}
                      deleteCartItem={handleRemoveItemFromCart}
                      handleUpdateCartFunc={handleUpdateCart}
                      handleDeleteCart={deleteCart}
                      defaultCurrencV={defaultCurrency}
                      editOn={itemEditOn}
                      active={cart.id === activeCart}
                    />
                  </div>
                ))}
                {currentItemOnEdit && (
                  <motion.div
                    initial={{
                      position: "absolute",
                      zIndex: 0,
                      top: 0,

                      bottom: 0,

                      // x: 300,
                      width: "100%",
                      opacity: 0,

                      overflow: "hidden",
                    }}
                    animate={{
                      left: itemEditOn ? 0 : 500,
                      right: itemEditOn ? 0 : "",
                      opacity: itemEditOn ? 1 : 0,
                    }}
                    style={{
                      display: itemEditOn ? "block" : "none",
                      height: "inherit",
                    }}
                  >
                    <Box
                      pad={"small"}
                      round={{ size: "3px" }}
                      style={{ height: "inherit" }}
                      background={"box"}
                    >
                      <Header style={{ direction: "rtl" }}>
                        <Box alignSelf="end" align="end" justify="end">
                          <Button
                            pad={"xsmall"}
                            label="Cancel"
                            primary
                            onClick={() => {
                              setItemEditOn(false);
                              setCurrentItemOnEdit(null);
                            }}
                          ></Button>
                        </Box>
                        <Box alignSelf="start" align="end" justify="start">
                          <Stack direction="row">
                            <Heading size="xxsmall" as={"h4"} alignSelf="start">
                              {currentItemOnEdit?.item?.name}
                            </Heading>
                            <Image
                              sizes="xxsmall"
                              height={40}
                              width={40}
                              margin={"xxsmall"}
                              src={currentItemOnEdit?.item.image || productIcon}
                            ></Image>
                          </Stack>
                        </Box>
                      </Header>
                      <Divider style={{ margin: "5px", padding: "2px" }}>
                        Edit Item
                      </Divider>{" "}
                      <EditCartItem
                        ref={cartOnEditRef}
                        handleSubmitCartEdit={handleCartEditSubmit}
                        currentItemOnEditV={currentItemOnEdit}
                        sessionProfileV={sessionProfile}
                        setActiveField={setEditTargetField}
                      />
                    </Box>
                  </motion.div>
                )}

                {cartItems.length >= 1 && (
                  <Stack direction="column">
                    {orderCoupon?.isValid && (
                      <Box
                        round={{ size: "xxsmall" }}
                        pad={"small"}
                        margin={"xxsmall"}
                        background={"box"}
                        siz
                        style={{ width: "100%", position: "relative" }}
                        border={{
                          side: "all",
                          style: "dashed",
                          color: "default",
                        }}
                      >
                        <div>
                          <IconButton
                            icon={<span>&#10005;</span>}
                            style={{
                              top: 0,
                              borderRadius: "40%",
                              position: "absolute",
                              width: "20px",
                              fontSize: "13px",
                              margin: "2px",
                              height: "20px",
                              right: 0,
                            }}
                            onClick={handleRemoveCoupon}
                          ></IconButton>
                        </div>
                        <div>
                          <Heading as={"h3"} color={"default"} size="xsmall">
                            {orderCoupon?.percentage}% Coupon Applied
                          </Heading>
                          <Text>#{orderCoupon?.code}</Text>
                        </div>
                      </Box>
                    )}
                    <Divider style={{ margin: "2px", padding: "1px" }} />
                    {/* <Box round={{ size: "20px" }} width={"xlarge"} pad={"small"}> */}
                    <Stack
                      direction="row"
                      style={{
                        alignContent: "center",
                        width: "100%",
                        alignItems: "center",
                        alignSelf: "center",
                        borderSpacing: "5px",
                        boxShadow:
                          "rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px",
                      }}
                    >
                      {" "}
                      <Divider
                        vertical
                        style={{ margin: "0px", marginRight: "5px" }}
                      />
                      <Heading
                        as={"h4"}
                        size="xxsmall"
                        style={{ display: "block" }}
                        color={"default"}
                      >
                        Sub-Total :
                      </Heading>
                      <br />
                      <Heading
                        as={"h4"}
                        style={{ padding: "5px", display: "block" }}
                        size="xxsmall"
                        color={"default"}
                      >
                        {defaultCurrency} {cartsSubTotal}
                      </Heading>
                      <Divider
                        vertical
                        style={{
                          margin: "0px",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      />
                      <Heading as={"h4"} size="xxsmall" color={"default"}>
                        Total :
                      </Heading>
                      <Heading
                        as={"h4"}
                        style={{ padding: "5px" }}
                        size="xxsmall"
                        color={"default"}
                      >
                        {defaultCurrency} {cartsTotal}
                      </Heading>
                      <Divider vertical />
                    </Stack>
                    {/* </Box> */}
                  </Stack>
                )}
                <Divider />
              </Box>
            </Container>
          </Col>
        </Row>
        <Row
          gutter={10}
          style={{
            height: paymentActive ? "10vh" : "30vh",
            overflow: "hidden",
          }}
        >
          <Col
            style={{ marginTop: "10px", height: "inherit" }}
            sm={24}
            lg={15}
            xl={15}
            md={15}
          >
            <Container
              style={{ height: "inherit" }}
              className="Pos-customer-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                style={{
                  height: "inherit",
                  overflowY: "auto",
                  msOverflowStyle: "-ms-autohiding-scrollbar",
                  scrollbarColor: "inherit",
                  scrollbarWidth: "thin",
                  scrollbarGutter: "unset",
                  scrollBehavior: "smooth",
                  overflowAnchor: "revert",
                  overflowClipBox: "content-box",
                }}
                background={{ dark: "#323033", light: "#f5d0f1" }}
              >
                <Customer
                  details={customerInfo}
                  ref={customerComRef}
                  customerList={customers}
                  paymentIsActive={paymentActive}
                  handleSelectCustomer={handleSelectCustomerDetail}
                  handleSubmitCustomer={handleSubmitCustomerDetails}
                />
              </Box>
            </Container>
          </Col>{" "}
          <Col sm={24} style={{ height: "inherit" }} lg={9} xl={9} md={9}>
            <Container
              style={{ height: "inherit" }}
              className="Pos-checkout-container"
            >
              <Box
                pad={"small"}
                round={{ size: "xsmall" }}
                style={{
                  height: "inherit",
                  borderTopRightRadius: "0px",
                  overflowX: "auto",
                  borderTopLeftRadius: "0px",
                  boxShadow:
                    " rgba(135, 112, 133, 0.35) 0px -50px 36px -28px inset rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                }}
              >
                {!paymentActive && (
                  <>
                    <Box
                      alignContent="center"
                      style={{ padding: "5px", width: "100%" }}
                      // background={{ dark: "#353036", light: "#e4c3eb" }}
                      justify="center"
                      align="center"
                    >
                      <Stack direction="row">
                        <Button
                          label={"All Carts"}
                          primary
                          onClick={() => setCheckoutType("All")}
                          style={{
                            backgroundColor:
                              checkoutType !== "All" && "inherit",
                          }}
                        ></Button>

                        <Minus color="#e9adff" />
                        <Button
                          label={"Active Cart"}
                          // background={{ dark: "#a695a3", light: "#FCD8C9" }}

                          onClick={() => {
                            setCheckoutType("Active");
                            cartItems.filter(
                              (crt) =>
                                crt.onHold === false && crt.id !== activeCart,
                            ).length >= 1
                              ? setActiveCart(
                                  cartItems.filter(
                                    (crt) =>
                                      crt.onHold === false &&
                                      crt.id !== activeCart,
                                  )[0].id,
                                )
                              : "";
                          }}
                          primary
                          style={{
                            opacity: activeCart === null ? "0.5" : 1,
                            backgroundColor:
                              checkoutType !== "Active" && "inherit",
                          }}
                        ></Button>
                      </Stack>
                    </Box>
                    <Divider style={{ margin: "4px" }} /> {/* Coupon Code  */}
                    <Box
                      // width={"70%"}
                      round={{ size: "xxsmall" }}
                      background="box"
                      margin={"small"}
                      style={{ display: "block" }}
                    >
                      <Form onSubmit={handleApplyCoupon} method="post">
                        <Box
                          style={{ display: "inline-block", height: "inherit" }}
                          background={"box"}
                          width={"70%"}
                        >
                          <TextInput
                            round={{ size: "xxsmall" }}
                            style={{
                              background: "inherit",
                              padding: "10px",
                              height: "inherit",
                              outline: "none",
                              border: "none",
                            }}
                            placeholder="Coupon code"
                            name="coupon"
                          ></TextInput>
                        </Box>
                        <Box
                          width={"30%"}
                          style={{
                            display: "inline-block",
                            backgroundColor: "inherit",
                            height: "inherit",
                          }}
                        >
                          <RButton
                            endIcon={<Coupon />}
                            type="submit"
                            style={{
                              width: "100%",
                              height: "inherit",
                              background: "inherit",

                              padding: "10.5px",
                            }}
                          >
                            Apply
                          </RButton>
                        </Box>
                      </Form>
                    </Box>
                  </>
                )}
                <Box
                  background={
                    paymentActive
                      ? "inherit"
                      : { dark: "#a695a3", light: "#FCD8C9" }
                  }
                  pad={"none"}
                  style={{
                    height: paymentActive ? "7vh" : "10vh",
                    bottom: 0,
                    position: "relative",
                    marginTop: paymentActive ? "50px" : "20px",
                  }}
                >
                  <RButton
                    style={checkoutButtonStyle}
                    onClick={handleCheckout}
                    startIcon={<Cart color="inherit" />}
                  >
                    {" "}
                    {paymentActive ? "Edit Cart" : "Checkout"}
                  </RButton>{" "}
                </Box>
              </Box>
              {itemEditOn && currentItemOnEdit && (
                <motion.div
                  initial={{
                    position: "absolute",
                    zIndex: 0,
                    // x: 300,
                    width: "100%",
                    direction: "rtl",

                    opacity: 0,
                    left: 0,
                    bottom: 0,
                    height: "100%",

                    overflow: "hidden",
                  }}
                  animate={{
                    top: itemEditOn ? 0 : 500,
                    right: itemEditOn ? 0 : "",

                    opacity: itemEditOn ? 1 : 0,
                  }}
                  style={{ display: itemEditOn ? "block" : "none" }}
                >
                  <Box
                    pad={"small"}
                    round={{ size: "3px" }}
                    height={"100%"}
                    background={"box"}
                  >
                    <List
                      style={{
                        scrollbarColor: "pink",
                        scrollbarWidth: "thin",
                        scrollBehavior: "smooth",
                        height: "100%",
                      }}
                    >
                      <List.Item
                        style={{
                          padding: "0px",
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
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          active={editTargetField === "quantity" ? true : false}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"quantity"}
                        >
                          Quantity
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
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
                            width: "20%",
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
                            width: "20%",

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
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"discount"}
                          active={editTargetField === "discount" ? true : false}
                        >
                          Discount
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
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
                            width: "20%",
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
                            width: "20%",
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
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"price"}
                          active={editTargetField === "price" ? true : false}
                        >
                          Price
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
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
                            width: "20%",
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
                            width: "20%",
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
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"remove"}
                        >
                          Remove
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
                            margin: "2.5px",
                            fontSize: "20px",
                            fontWeight: "bolder",
                          }}
                          onClick={(e) => handleKeyInput(e.target.value)}
                          value={"delete"}
                        >
                          Clear
                        </RButton>
                        <RButton
                          style={{
                            height: "6vh",
                            width: "20%",
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
                            width: "20%",
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
                  </Box>
                </motion.div>
              )}
            </Container>
          </Col>{" "}
        </Row>
      </Grid>
      {loading && <Loader backdrop center></Loader>}
      {newSession && (
        <NewSession
          user={loggedInUser}
          users={systemUsers}
          newSessionVar={newSession}
          setSessionOpen={setNewSession}
          defaultProfile={loggedInUser.defaultProfile}
          profileList={profiles}
          companyShops={companyData.shops}
        />
      )}
    </Container>
  ) : (
    <Container>
      <POSHeader
        company={companyData}
        profile={sessionProfile}
        setNewSession={setNewSession}
      ></POSHeader>
      <OrderComplete
        orderV={order}
        posProfile={sessionProfile}
        handleNewOrder={handleStartNewOrder}
        orderPayment={orderPayment}
      />
    </Container>
  );
}

function NewSession(props) {
  const [closeAutomatically, setCloseAutomatically] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [closeTime, setCloseTime] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const sessionFormRef = React.useRef(null);
  const [profileList, setProfileList] = React.useState(props.profileList);
  const [newProfile, setNewProfile] = React.useState(false);
  const handleStartPOS = () => {
    setLoading(true);
    props.setSessionOpen(false);

    console.log(sessionFormRef.current.root);

    const formData = new FormData(sessionFormRef.current.root);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  const handleCreateProfile = () => {
    setNewProfile(false);
  };
  const StyledDateTimePicker = styled(DateTimePicker)`
    & .react-datetime-picker__wrapper {
      padding: 10px;
      border-color: whitesmoke;
      background: inherit;
      border-radius: 10px;

      width: 100%;
    }
  `;
  const CurrencyField = styled.div`
    background-color: inherit;
    .userCurrencyField {
      width: 100%;
      height: inherit;
      font-size: 15px;
      background-color: inherit;
      color: inherit;
      border: none;
      font-family: inherit;
      padding: 22px;
      font-weight: bold;
    }
  `;
  return (
    <>
      <Layer
        title="Start New POS Session"
        onClose={() => props.setSessionOpen(false)}
        round
        modal={true}
        background="box"
        margin={"medium"}
      >
        {loading && <Loader title="Getting Ready..." backdrop center></Loader>}

        <Box
          height={"xlarge"}
          pad={{ vertical: "small" }}
          style={{ overflow: newProfile ? "hidden" : "auto" }}
        >
          {newProfile && (
            <motion.div animate={{ y: 30 }}>
              <Form>
                <Grid style={{ width: "80%", marginTop: "20px" }}>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={20} lg={20} sm={20}>
                      <Heading color={"default"} size="xxsmall" as={"h3"}>
                        New Profile
                      </Heading>
                    </Col>
                    <Col md={4} lg={4} sm={4}>
                      <Button
                        primary
                        label="Create"
                        onClick={handleCreateProfile}
                      ></Button>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={12} lg={12} sm={24}>
                      <FormField name="name" label="Name">
                        <TextInput
                          placeholder="Enter Profile Name"
                          name="name"
                        />
                      </FormField>
                    </Col>
                    <Col md={12} lg={12} sm={24}>
                      <FormField name="shop" label="Shop">
                        <Select
                          placeholder="Select Shop"
                          options={props.companyShops}
                          searchPlaceholder={"find shop"}
                          defaultValue={props.user?.defaultShop}
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={16} lg={16} sm={16}>
                      {" "}
                      <Tooltip message="Only assigned Sales Admin can approve and submit sessions sales">
                        <FormField
                          name="salesAdmin"
                          label="Sales Administrator"
                        >
                          <Select
                            options={props.users}
                            placeholder="Select Sales Admin"
                            searchPlaceholder={"find manager  "}
                          />
                        </FormField>
                      </Tooltip>
                    </Col>
                    <Col md={6} lg={6} sm={6}>
                      <FormField
                        name="allowAdminDiscount"
                        label="Allow Sales Admin Discounts"
                      >
                        <CheckBox />
                      </FormField>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Col md={24} lg={24} sm={24}>
                      {" "}
                      <CurrencyField>
                        <SelectCurrency
                          className="userCurrencyField"
                          selected="USD"
                          placeholder="Select Currency"
                          // name="currency"

                          // required
                          // defaultValue={"USD"}

                          // width={"50%"}
                          // label="Currency"
                        />
                        {/* <Select options={allCurrencies}></Select> */}
                        {/* </> */}
                      </CurrencyField>
                    </Col>
                  </Row>

                  <Row gutter={2} style={{ marginBottom: "20px" }}>
                    <Col md={24} lg={24} sm={24}>
                      <FormField name="note" label="Note">
                        <TextArea name="note" placeholder="Note" rows={2} />
                      </FormField>
                    </Col>
                  </Row>
                </Grid>
              </Form>
            </motion.div>
          )}
          <motion.div
            transition={"2s"}
            whileInView={
              newProfile
                ? { opacity: 0.5, y: 100 }
                : { opacity: 1, animation: "linear", y: 0 }
            }
          >
            <Form ref={sessionFormRef} disabled={newProfile}>
              <Grid style={{ width: "80%", marginTop: "20px" }}>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={20} lg={20} sm={20}>
                    <Heading color={"default"} size="xxsmall" as={"h3"}>
                      Start New POS Session
                    </Heading>
                  </Col>
                  <Col md={4} lg={4} sm={4}>
                    <Button
                      primary
                      label="Start"
                      onClick={handleStartPOS}
                    ></Button>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={24} lg={24} sm={24}>
                    <Select
                      name="profile"
                      placeholder="Select Profile"
                      options={profileList}
                      searchPlaceholder={"find profile"}
                      defaultValue={props.defaultProfile}
                    />

                    <RButton
                      onClick={() => setNewProfile(true)}
                      style={{
                        position: "absolute",
                        border: "0.5px solid inherit",
                        right: "0",
                        width: "150px",
                        height: "70px",
                      }}
                    >
                      New Profile
                    </RButton>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <Col md={24} lg={24} sm={24}>
                    <FormField name="openingTime" label="Opening Time">
                      <StyledDateTimePicker
                        name="openingTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e)}
                      />
                    </FormField>
                  </Col>
                  <Row>
                    <Col md={24} lg={24} sm={24}>
                      <FormField
                        name="closeTime"
                        style={{ border: "none" }}
                        label="Closing Time"
                      >
                        <StyledDateTimePicker
                          name="closingTime"
                          value={closeTime}
                          disabled={closeAutomatically}
                          onChange={(e) => setCloseTime(e)}
                        />{" "}
                      </FormField>
                      <CheckBox
                        name="autoClose"
                        onChange={(e) =>
                          setCloseAutomatically(e.target.checked)
                        }
                        label="Auto Close"
                      />
                    </Col>{" "}
                  </Row>
                </Row>
                <Row style={{ marginBottom: "10px" }}>
                  <Col md={12} lg={12} sm={24}>
                    <FormField label="Inventory Source">
                      <Select
                        name="inventorySource"
                        defaultValue="All"
                        // style={{ width: 220 }}
                        options={["All", "Platform", "ERPNext"]}
                        placeholder="Inventory Source"
                      ></Select>
                    </FormField>
                  </Col>
                  {props.user.isAdmin && (
                    <Col md={12} lg={12} sm={24}>
                      <FormField label="Sales Attendant">
                        <Select
                          placeholder="POS Sales Attendant"
                          name="agent"
                          style={{ width: 220 }}
                          options={props.users}
                        />
                      </FormField>
                    </Col>
                  )}{" "}
                </Row>

                <Row md={24} lg={24} sm={24} style={{ marginTop: "20px" }}>
                  <FormField label="Starting Balance">
                    <CurrencyInput
                      id="starting-bal"
                      placeholder="Starting Balance"
                      name="startingBalance"
                      defaultValue={0.0}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderColor: "whitesmoke",
                        borderRadius: "10px",
                        borderStyle: "inherit",
                        backgroundColor: "inherit",
                      }}
                      decimalsLimit={2}
                      // onValueChange={(value, name) => console.log(value, name)}
                    />
                  </FormField>
                </Row>
                <Row md={24} lg={24} sm={24} style={{ marginTop: "20px" }}>
                  <TextArea name="note" placeholder="Note" rows={2} />
                </Row>
              </Grid>
            </Form>
          </motion.div>
        </Box>
      </Layer>
    </>
  );
}
