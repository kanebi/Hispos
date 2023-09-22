import React from "react";
import { Col, Form, Row, Button as RButton, FlexboxGrid } from "rsuite";

const EditCartItem = React.forwardRef((props, ref) => {
 
  const {
    currentItemOnEditV,
    handleSubmitCartEdit,
    sessionProfileV,
    setActiveField,
  } = props;
  const [quantity, setQuantity] = React.useState();
  const [stock_uom, setStock_uom] = React.useState(
  );
  const [price_amount, setPrice_amount] = React.useState(
  );
  const [tax_rate, setTax_rate] = React.useState();

  const [warehouse, setWarehouse] = React.useState(
  );
  const [available_stock_qty, setAvailable_stock_qty] = React.useState(
  );

  const [percDiscount, setpercDiscount] = React.useState(
  );
  const [defaultPrice, setDefaultPrice] = React.useState(
  );
  const taxRef = React.useRef(null)
  const priceRef = React.useRef(null)
  const discountRef = React.useRef(null)
  const quantityRef = React.useRef(null)
  React.useEffect(()=>{
  setQuantity(currentItemOnEditV?.quantity);
  setStock_uom(currentItemOnEditV?.item?.stock_uom);
  setPrice_amount(currentItemOnEditV?.item.price_amount);
  setWarehouse(currentItemOnEditV?.item.warehouse);
  setAvailable_stock_qty(currentItemOnEditV?.item.available_stock_quantity);
  setpercDiscount(currentItemOnEditV?.percDiscount);
  setTax_rate(currentItemOnEditV?.item.tax);
  setDefaultPrice(currentItemOnEditV?.item.price_amount);
  
  },[currentItemOnEditV])
 React.useImperativeHandle(
    ref,
    () => {
      return {
        setQuantityFunc(val) {
            setQuantity(quantityRef.current.value + String(val));
          },
          setPercDiscountFunc(val) {
            setpercDiscount(discountRef.current.value + String(val));
          },
         

          setpriceAmountFunc(val) {
            setPrice_amount(priceRef.current.value + String(val));
          },

          
          setTaxFunc(val) {
            setTax_rate( taxRef.current.value +String(val));
          },
          clearPrice(){
          setPrice_amount("")
          }
          ,
          clearQuantity(){
          setQuantity("")
          }
          ,clearDiscount(){
          setpercDiscount("")
          },clearTax(){
          setTax_rate("")
          }
          
          
        };
    },
    [],
  );
  return (
    <>
      <Form
        onSubmit={(val) => {
          handleSubmitCartEdit(val);
        }}
      >
        <FlexboxGrid justify="start" align="center">
          <FlexboxGrid.Item colspan={4} as={Col} md={12}>
            <Form.Group>
              <Form.ControlLabel>Quantity </Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  outline: "1px outset pink",
                  width: "inherit",
                }}
                onChange={(val) => {
                  setQuantity(val);
                }}
                onClick={() => setActiveField("quantity")}
                inputRef={quantityRef}
                value={quantity}
                name="quantity"
              />
            </Form.Group>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            style={{ textAlign: "left" }}
            colspan={4}
            as={Col}
            md={12}
            lg={12}
            sm={12}
          >
            <Form.Group>
              <Form.ControlLabel>Unit OF Measure</Form.ControlLabel>

              <Form.Control
                style={{
                  margin: "none",
                  width: "inherit",
                  textAlign: "left",
                  outline: "1px outset pink",
                }}
                value={stock_uom}
                onChange={(val) => setStock_uom(val)}
                name="stock_uom"
              />
            </Form.Group>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={4} as={Col} lg={12} sm={12} md={12}>
            <Form.Group>
              <Form.ControlLabel>Rate</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  outline: "1px outset pink",
                  width: "inherit",
                }}
                value={price_amount}
                onChange={(val) => setPrice_amount(val)}
                onClick={() => setActiveField("price")}
              inputRef={priceRef}
                name="price_amount"
              />
            </Form.Group>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            style={{ textAlign: "left" }}
            colspan={4}
            as={Col}
            md={12}
            lg={12}
            sm={12}
          >
            <Form.Group>
              {" "}
              <Form.ControlLabel>Warehouse</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  textAlign: "left",
                  width: "inherit",
                  outline: "1px outset pink",
                }}
                onChange={(val) => setWarehouse(val)}
                value={warehouse}
                name="warehouse"
              />
            </Form.Group>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} as={Col} lg={12} sm={12} md={12}>
            <Form.Group>
              <Form.ControlLabel>Available Quantity</Form.ControlLabel>
              <Form.Control
                disabled
                style={{
                  margin: "none",
                  outline: "1px outset pink",
                  width: "inherit",
                }}
                name="available_stock_uom"
                onChange={(val) => setAvailable_stock_qty(val)}
                value={available_stock_qty}
              />
            </Form.Group>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            style={{ textAlign: "left" }}
            colspan={4}
            as={Col}
            md={12}
            lg={12}
            sm={12}
          >
            <Form.Group>
              {" "}
              <Form.ControlLabel>Default Price</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  width: "inherit",
                  outline: "1px outset pink",
                  textAlign: "left",
                }}
                name="price_amount"
                disabled
                value={defaultPrice}
              />
            </Form.Group>
          </FlexboxGrid.Item>

          {sessionProfileV?.allowAdminDiscount && (
            <FlexboxGrid.Item colspan={4} as={Col} lg={12} sm={12} md={12}>
              <Form.Group>
                <Form.ControlLabel>Discount %</Form.ControlLabel>

                <Form.Control
                  style={{
                    margin: "none",
                    outline: "1px outset pink",
                    width: "inherit",
                  }}
                  value={percDiscount}
                  onChange={(val) => setpercDiscount(val)}
                  inputRef={discountRef}
                  onClick={() => setActiveField("discount")}
                  name="percDiscount"
                />
              </Form.Group>
            </FlexboxGrid.Item>
          )}
          <FlexboxGrid.Item
            style={{ textAlign: "left" }}
            colspan={4}
            as={Col}
            lg={12}
            sm={12}
            md={12}
          >
            <Form.Group>
              {" "}
              <Form.ControlLabel>Tax Rate</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  width: "inherit",
                  outline: "1px outset pink",
                  textAlign: "left",
                }}
                name="tax"
                value={tax_rate}
                inputRef={taxRef}
                onClick={() => setActiveField("tax")}
              />
            </Form.Group>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid.Item colspan={10} as={Col} md={16}>
          <RButton
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "inherit",
              marginTop: "5px",
              outline: "1px outset pink",
            }}
            type="submit"
          >
            Apply Changes
          </RButton>
        </FlexboxGrid.Item>
      </Form>
    </>
  );
});
export default EditCartItem;
