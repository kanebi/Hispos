import { ResponsiveContext, Text } from "grommet";
import React from "react";
import { toast } from "react-toastify";
import {
  Col,
  Form,
  Row,
  Button as RButton,
  FlexboxGrid,
  Grid,
  Container,
  Stack,
  Divider,
} from "rsuite";
const EditCartItem = React.forwardRef((props, ref) => {
  const editFormRef = React.useRef(null);
  const {
    currentItemOnEditV,
    handleSubmitCartEdit,
    sessionProfileV,
    setActiveField,
  } = props;
  const [screenSize, setScreenSize] = React.useContext(ResponsiveContext);

  const [quantity, setQuantity] = React.useState();
  const [stock_uom, setStock_uom] = React.useState();
  const [price_amount, setPrice_amount] = React.useState();
  const [tax_rate, setTax_rate] = React.useState();

  const [warehouse, setWarehouse] = React.useState();
  const [available_stock_qty, setAvailable_stock_qty] = React.useState();

  const [percDiscount, setpercDiscount] = React.useState();
  const [defaultPrice, setDefaultPrice] = React.useState();
  const taxRef = React.useRef(null);
  const priceRef = React.useRef(null);
  const discountRef = React.useRef(null);
  const quantityRef = React.useRef(null);
  const availableStockRef = React.useRef(null);

  React.useEffect(() => {
    setQuantity(currentItemOnEditV?.quantity);
    setStock_uom(currentItemOnEditV?.item?.stock_uom);
    setPrice_amount(currentItemOnEditV?.item.price_amount);
    setWarehouse(currentItemOnEditV?.item.warehouse);
    setAvailable_stock_qty(currentItemOnEditV?.item.available_stock_quantity);
    setpercDiscount(currentItemOnEditV?.percDiscount);
    setTax_rate(currentItemOnEditV?.item.tax);
    setDefaultPrice(currentItemOnEditV?.item.valuation_rate);
  }, [currentItemOnEditV]);

  const validateQuantity = (val, event = false) => {
    if (val === "." && quantityRef.current.value.includes(".")) {
      toast.info("invalid quantity value");
      return false;
    }
    let availableQty = availableStockRef.current.value;
    var currentVal = quantityRef.current.value;
    if (!isNaN(val) && val !== ".") {
      if (event) {
        if (+val > availableQty) {
          toast.info("Value is more than available quantity");
          return false;
        }
      } else {
        if (
          +val > availableQty ||
          parseInt(currentVal + String(val)) > availableQty
        ) {
          toast.info("Value is more than available quantity");
          return false;
        }
      }
    } else if (isNaN(val) && val !== ".") {
      toast.info("Enter a valid number");
      return false;
    }

    return true;
  };

  const validatePrice = (val, event = false) => {
    if (val === "." && priceRef.current.value.includes(".")) {
      toast.info("invalid price value");
      return false;
    }
    if (!isNaN(val) && val !== ".") {
    } else if (isNaN(val) && val !== ".") {
      toast.info("Enter a valid number");
      return false;
    }

    return true;
  };

  const validateTax = (val, event = false) => {
    if (val === "." && taxRef.current.value.includes(".")) {
      toast.info("invalid tax value");
      return false;
    }
    if (!isNaN(val) && val !== ".") {
    } else if (isNaN(val) && val !== ".") {
      toast.info("Enter a valid number");
      return false;
    }

    return true;
  };

  const validateDiscount = (val, event = false) => {
    if (val === "." && discountRef.current.value.includes(".")) {
      toast.info("invalid discount  value");
      return false;
    }

    if (!isNaN(val) && val !== ".") {
      val = parseInt(val);

      if (event) {
        if (parseInt(val) > 100) {
          toast.info("Discount value Should not be more than 100%");
          return false;
        }
      } else {
        if (
          val > 100 ||
          parseInt(discountRef.current.value + String(val)) > 100
        ) {
          toast.info("Discount value Should not be more than 100%");
          return false;
        }
      }
    } else if (isNaN(val) && val !== ".") {
      toast.info("Enter a valid number");
      return false;
    }

    return true;
  };

  function setQuantityF(val) {
    if (validateQuantity(val) === true) {
      if (
        String(quantityRef.current.value).startsWith("0") ||
        String(quantityRef.current.value).startsWith(".")
      ) {
        if (
          (String(quantityRef.current.value).startsWith("0") && val === ".") ||
          val !== 0
        ) {
          return setQuantity(quantityRef.current.value + String(val));
        }
        setQuantity(val);
      } else {
        setQuantity(quantityRef.current.value + String(val));
      }
    }
  }

  function setPercDiscountF(val) {
    if (
      String(discountRef.current.value).startsWith("0") ||
      String(discountRef.current.value).startsWith(".")
    ) {
      if (
        (String(discountRef.current.value).startsWith("0") && val === ".") ||
        val !== 0
      ) {
        return setpercDiscount(discountRef.current.value + String(val));
      }
      setpercDiscount(val);
    } else {
      if (validateDiscount(val) === true) {
        setpercDiscount(discountRef.current.value + String(val));
      }
    }
  }

  function setPriceAmountF(val) {
    if (
      String(priceRef.current.value).startsWith("0") ||
      String(priceRef.current.value).startsWith(".")
    ) {
      if (
        (String(priceRef.current.value).startsWith("0") && val === ".") ||
        val !== 0
      ) {
        return setPrice_amount(priceRef.current.value + String(val));
      }

      setPrice_amount(val);
    } else {
      if (validatePrice(val) === true) {
        setPrice_amount(priceRef.current.value + String(val));
      }
    }
  }
  function setTaxF(val) {
    if (
      String(taxRef.current.value).startsWith("0") ||
      String(taxRef.current.value).startsWith(".")
    ) {
      if (
        (String(taxRef.current.value).startsWith("0") && val === ".") ||
        val !== 0
      ) {
        return setTax_rate(taxRef.current.value + String(val));
      }
      setTax_rate(val);
    } else {
      if (validateTax(val) === true) {
        setTax_rate(taxRef.current.value + String(val));
      }
    }
  }
  React.useImperativeHandle(
    ref,
    () => {
      return {
        setQuantityFunc(val) {
          setQuantityF(val);
        },
        setPercDiscountFunc(val) {
          setPercDiscountF(val);
        },

        setpriceAmountFunc(val) {
          setPriceAmountF(val);
        },

        setTaxFunc(val) {
          setTaxF(val);
        },
        clearPrice() {
          setPrice_amount("");
        },
        clearQuantity() {
          setQuantity("");
        },
        clearDiscount() {
          setpercDiscount("");
        },
        clearTax() {
          setTax_rate("");
        },
      };
    },
    [],
  );

  const handleEditSet = (event) => {
    const formData = new FormData(event);
    const data = Object.fromEntries(formData);
    return handleSubmitCartEdit(data);
  };

  const tabStyle = {
    fontWeight: "bolder",
    lineHeight: 1.5,
    height: "20px",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const labelStyle = {
    lineHeight: 1.5,
    height: "23px",
    overflow: "hidden",
    width: "170px",
    textOverflow: "ellipsis",
  };

  return (
    <Container
      style={{
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollMargin: "0px",
        // position:"relative",
        alignContent: "start",
        overflowX: "hidden",
        margin: "0px auto",
        scrollBehavior: "smooth",
      }}
    >
      <Form
        layout="inline"
        style={{ margin: 0, padding: 0, width: "100%" }}
        onSubmit={(status, event) => handleEditSet(event.currentTarget)}
      >
        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
            overflow: "hidden",
          }}
        >
          <Form.ControlLabel style={labelStyle}>
            Unit OF Measure
          </Form.ControlLabel>

          <Form.Control
            title="Unit of Measure"
            style={{
              margin: "none",
              width: "inherit",
              border: "none",
              outline: "none",
            }}
            value={stock_uom}
            onChange={(val) => setStock_uom(val)}
            name="stock_uom"
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
          }}
        >
          <Form.ControlLabel style={labelStyle}>Quantity </Form.ControlLabel>
          <Form.Control
            title="Quantity"
            style={{
              margin: "none",
              width: "inherit",
              border: "none",
              outline: "none",
            }}
            onChange={(val) =>
              validateQuantity(val, true) === true ? setQuantity(val) : () => {}
            }
            onClick={() => setActiveField("quantity")}
            inputRef={quantityRef}
            value={quantity}
            name="quantity"
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
          }}
        >
          {" "}
          <Form.ControlLabel style={labelStyle}>Warehouse</Form.ControlLabel>
          <Form.Control
            title="Warehouse"
            style={{
              margin: "none",
              width: "inherit",
              border: "none",
              outline: "none",
            }}
            onChange={(val) => setWarehouse(val)}
            value={warehouse}
            name="warehouse"
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
          }}
        >
          <Form.ControlLabel style={labelStyle}>Price Rate</Form.ControlLabel>
          <Form.Control
            style={{
              margin: "none",

              width: "inherit",
              border: "none",
              outline: "none",
            }}
            title="Price Rate"
            value={price_amount}
            onChange={(val) =>
              validatePrice(val, true) === true
                ? setPrice_amount(val)
                : () => {}
            }
            onClick={() => setActiveField("price")}
            inputRef={priceRef}
            name="price_amount"
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
          }}
        >
          {" "}
          <Form.ControlLabel style={labelStyle}>Tax Rate</Form.ControlLabel>
          <Form.Control
            title="Tax Rate"
            style={{
              margin: "none",
              width: "inherit",
              border: "none",
              outline: "none",
            }}
            name="tax"
            value={tax_rate}
            onChange={(val) =>
              validateTax(val, true) === true ? setTax_rate(val) : () => {}
            }
            inputRef={taxRef}
            onClick={() => setActiveField("tax")}
          />
        </Form.Group>
        {sessionProfileV?.allowAdminDiscount && (
          <Form.Group
            style={{
              width: screenSize === "s" ? "100%" : "33%",
              margin: 0,
            }}
          >
            <Form.ControlLabel style={labelStyle}>
              Discount (%)
            </Form.ControlLabel>

            <Form.Control
              title="Percentage Discount"
              style={{
                margin: "none",
                border: "none",
                outline: "none",
                width: "inherit",
              }}
              value={percDiscount}
              onChange={(val) =>
                validateDiscount(val, true) === true
                  ? setpercDiscount(val)
                  : () => {}
              }
              inputRef={discountRef}
              onClick={() => setActiveField("discount")}
              name="percDiscount"
            />
          </Form.Group>
        )}
        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            borderRight: screenSize === "s" ? "" : "none",
            margin: 0,
          }}
        >
          <Form.ControlLabel style={labelStyle}>
            Available Quantity
          </Form.ControlLabel>
          <Form.Control
            title="Available Quantity"
            disabled
            style={{
              margin: "none",
              width: "inherit",

              border: "none",
              outline: "none",
            }}
            name="available_stock_uom"
            inputRef={availableStockRef}
            onChange={(val) => setAvailable_stock_qty(val)}
            value={available_stock_qty}
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            borderRight: screenSize === "s" ? "" : "none",
            margin: 0,
          }}
        >
          {" "}
          <Form.ControlLabel style={labelStyle}>
            Valuation Rate
          </Form.ControlLabel>
          <Form.Control
            title="Valuation Rate"
            style={{
              margin: "none",
              width: "inherit",
              border: "none",
              outline: "none",
            }}
            name="price_amount"
            disabled
            value={defaultPrice}
          />
        </Form.Group>

        <Form.Group
          style={{
            width: screenSize === "s" ? "100%" : "33%",
            margin: 0,
          }}
        >
          {" "}
          <Form.ControlLabel style={labelStyle}>
            Min. Order Qty
          </Form.ControlLabel>
          <Form.Control
            title="Minimum Order Quantity"
            disabled
            style={{
              margin: "none",
              border: "none",
              outline: "none",
              width: "inherit",
            }}
            name="tax"
            value={currentItemOnEditV.item.min_order_qty}
          />
        </Form.Group>
        <Container
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <RButton
            style={{
              padding: "10px",
              fontSize: "16px",
              marginTop: "10px",
              width: "60%",

              outline: "1px outset pink",
            }}
            type="submit"
          >
            Apply Changes
          </RButton>
        </Container>
      </Form>
      <Divider style={{ margin: "5px" }} />
      <Container
        style={{
          paddding: "0px",
          margin: "0px",
          // position: "fixed",
          backgroundColor: "inherit",
          bottom: 0,
          alignItems: "center",
          // marginTop: "-10px",
          justifyItems: "center",
        }}
      >
        <Stack spacing={10} direction="row">
          <Text style={tabStyle}>
            Total Quantity
            <br /> {+quantity + " " + stock_uom}
          </Text>
          <Divider vertical style={{ padding: "2px", margin: "3px" }} />
          <Text style={tabStyle}>
            Tax Total <br /> {currentItemOnEditV.item.price_currency}{" "}
            {+quantity * +tax_rate}
          </Text>
          <Divider vertical style={{ padding: "2px", margin: "3px" }} />

          <Text style={tabStyle}>
            Sub-Total <br /> {currentItemOnEditV.item.price_currency}{" "}
            {+price_amount * +quantity}
          </Text>
          <Divider vertical style={{ padding: "2px", margin: "3px" }} />

          <Text style={tabStyle}>
            Grand Total <br /> {currentItemOnEditV.item.price_currency}{" "}
            {+percDiscount > 0 ? (
              <>
                {+price_amount * +quantity +
                  +(quantity * +tax_rate) -
                  (percDiscount / 100) *
                    (+price_amount * +quantity + +(quantity * +tax_rate))}
              </>
            ) : (
              <>{+price_amount * +quantity + +(quantity * +tax_rate)}</>
            )}
          </Text>
        </Stack>
      </Container>
    </Container>
  );
});
export default EditCartItem;
