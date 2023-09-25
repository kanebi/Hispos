import React from "react";
import { toast } from "react-toastify";
import { Col, Form, Row, Button as RButton, FlexboxGrid ,Grid} from "rsuite";
const EditCartItem = React.forwardRef((props, ref) => {
 const editFormRef = React.useRef(null)
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
  const availableStockRef = React.useRef(null)

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

  const validateQuantity =(val, event=false)=>{
    if(val === "." && quantityRef.current.value.includes(".")){
      toast.info("invalid quantity value")
      return false
      }
    let availableQty = availableStockRef.current.value
    var currentVal = quantityRef.current.value
    if (!isNaN(val) && val !== "."){

      if (event){
        if (+val > availableQty  ){
          toast.info("Value is more than available quantity")
          return false
                    }          }else {
    if (+val > availableQty ||  parseInt( currentVal + String(val)) > availableQty ){

      toast.info("Value is more than available quantity")
      return false
    }
  }

  } else if (isNaN(val) && val !=="."){

    toast.info("Enter a valid number")
    return false
  }
  
  return true

  }

  const validatePrice = (val, event=false)=>{
    if(val === "." && priceRef.current.value.includes(".")){
      toast.info("invalid price value")
      return false
      }
    if (!isNaN(val) && val !== "."){


  } else if (isNaN(val) && val !=="."){

    toast.info("Enter a valid number")
    return false
  }
  
  return true
  }


  const validateTax = (val, event=false)=>{

    if(val === "." && taxRef.current.value.includes(".")){
      toast.info("invalid tax value")
      return false
      }
    if (!isNaN(val) && val !== "."){

    } else if (isNaN(val) && val !=="."){
  
      toast.info("Enter a valid number")
      return false
    }
    
    return true

  }

  const validateDiscount =(val, event=false)=>{

    if(val === "." && discountRef.current.value.includes(".")){
      toast.info("invalid discount  value")
      return false
      }
      
    if (!isNaN(val) && val !== "."){

          val = parseInt(val)

          if (event){
            if (parseInt(val) > 100 ){
              toast.info("Discount value Should not be more than 100%")
              return false
                        }          }else {
          if (val > 100 || parseInt(discountRef.current.value + String(val)) > 100){
toast.info("Discount value Should not be more than 100%")
return false
          }
        }



    } else if (isNaN(val) && val !=="."){
  
      toast.info("Enter a valid number")
      return false
    }
    
    return true

  }


 React.useImperativeHandle(
    ref,
    () => {
      return {
        setQuantityFunc(val) {
         if (validateQuantity(val) === true){
          if (String(quantityRef.current.value).startsWith("0") || String(quantityRef.current.value).startsWith(".")){
            setQuantity(val);

          }else{

            setQuantity(quantityRef.current.value + String(val));
          }
         }
          },
          setPercDiscountFunc(val) {
            if (String(discountRef.current.value).startsWith("0") || String(discountRef.current.value).startsWith(".")){
              setpercDiscount(val);
            }else{
            if(validateDiscount(val)=== true){
            setpercDiscount(discountRef.current.value + String(val));
          }}},
         

          setpriceAmountFunc(val) {
            if (String(priceRef.current.value).startsWith("0") || String(priceRef.current.value).startsWith(".")){
              setPrice_amount(val);
            } else{
            if (validatePrice(val)=== true){
            setPrice_amount(priceRef.current.value + String(val));
          }}},

          
          setTaxFunc(val) {
            if (String(taxRef.current.value).startsWith("0") || String(taxRef.current.value).startsWith(".")){
              setTax_rate(val);
            } else{
            if (validateTax(val)=== true){
            setTax_rate( taxRef.current.value +String(val));
          }}},
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

  const handleEditSet =()=>{


return    handleSubmitCartEdit(   {

        
        price_amount: "1700",
        stock_uom: "Unit",
        tax: "9",
        warehouse: "olomoro",
   discount:"",
      quantity: 3,}
      )
}
   
  
  return (
    <>
     <Form  onChange={(e)=>handleEditSet}>
       
          <Grid  style={{width:"inherit"}} >
          <Row gutter={4}>
       

          <Col style={{width:"50%" ,textAlign: "left" }} sm={24} lg={12} md={12} 
           
          >
            <Form.Group>
              <Form.ControlLabel>Unit OF Measure</Form.ControlLabel>

              <Form.Control
                style={{
                  margin: "none",
                  
                  width: "90%",
                  textAlign: "left",
                  outline: "1px outset pink",
                }}
                value={stock_uom}
                onChange={(val) => setStock_uom(val)}
                name="stock_uom"
              />
            </Form.Group>
          </Col> 
            <Col style={{width:"50%"}} sm={24} lg={12} md={12}>
            <Form.Group>
              <Form.ControlLabel>Quantity </Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  
                  outline: "1px outset pink",
                  width: "90%",
                }}
                onChange={(val) => validateQuantity(val, true)=== true?

                  setQuantity(val):()=>{}}
                onClick={() => setActiveField("quantity")}
                inputRef={quantityRef}
                value={quantity}
                name="quantity"
              />
            </Form.Group>
          </Col>
          </Row>
          <Row gutter={4}>
          
          <Col style={{width:"50%", textAlign: "left"}}
           
            md={12}
            lg={12}
            sm={24}
          >
            <Form.Group>
              {" "}
              <Form.ControlLabel>Warehouse</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  
                  textAlign: "left",
                  width: "90%",
                  outline: "1px outset pink",
                }}
                onChange={(val) => setWarehouse(val)}
                value={warehouse}
                name="warehouse"
              />
            </Form.Group>
          </Col>
          <Col style={{width:"50%"}}  lg={12} sm={24} md={12}>
            <Form.Group>
              <Form.ControlLabel>Price Rate</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  
                  outline: "1px outset pink",
                  width: "90%",
                }}
                value={price_amount}
                onChange={(val) => validatePrice(val, true)=== true?setPrice_amount(val):()=>{}}
                onClick={() => setActiveField("price")}
              inputRef={priceRef}
                name="price_amount"
              />
            </Form.Group>
          </Col>
          </Row>
          <Row gutter={4}>
        
          <Col style={{width:"50%",textAlign: "left" }}
          
            md={12}
            lg={12}
            sm={24}
          >
            <Form.Group>
              {" "}
              <Form.ControlLabel>Default Price</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  
                  width: "90%",
                  outline: "1px outset pink",
                  textAlign: "left",
                }}
                name="price_amount"
                disabled
                value={defaultPrice}
              />
            </Form.Group>
          </Col>  <Col style={{width:"50%"}}  lg={12} sm={24} md={12}>
            <Form.Group>
              <Form.ControlLabel>Available Quantity</Form.ControlLabel>
              <Form.Control
                disabled
                style={{
                  margin: "none",
                  
                  outline: "1px outset pink",
                  width: "90%",
                }}
                name="available_stock_uom"
                inputRef={availableStockRef}
                onChange={(val) => setAvailable_stock_qty(val)}
                value={available_stock_qty}
              />
            </Form.Group>
          </Col>
</Row>
<Row gutter={4}>  
  
          
      <Col style={{width:"50%", textAlign:"left"}} lg={12} sm={24} md={12}>
            <Form.Group>
              {" "}
              <Form.ControlLabel>Tax Rate</Form.ControlLabel>
              <Form.Control
                style={{
                  margin: "none",
                  
                  width: "90%",
                  outline: "1px outset pink",
                  textAlign: "left",
                }}
                name="tax"
                value={tax_rate}
                onChange={(val)=>validateTax(val, true) === true? setTax_rate(val):()=>{}}
                inputRef={taxRef}
                onClick={() => setActiveField("tax")}
              />
            </Form.Group>
            </Col>     {sessionProfileV?.allowAdminDiscount && (
      <Col style={{width:"50%"}} lg={12} sm={24} md={12}>
              <Form.Group>
                <Form.ControlLabel>Discount %</Form.ControlLabel>

                <Form.Control
                  style={{
                    margin: "none",
                    outline: "1px outset pink",
                    width: "90%",
                  }}
                  value={percDiscount}
                  onChange={(val) => validateDiscount (val, true)=== true?setpercDiscount(val):()=>{}}
                  inputRef={discountRef}
                  onClick={() => setActiveField("discount")}
                  name="percDiscount"
                />
              </Form.Group>
              </Col>
          )}
       
</Row>

          <Row
            style={{ textAlign: "left" }}
            lg={12}
            sm={12}
            md={12}
          >
          <Col style={{width:"50%"}} sm={24} md={18} lg={18}>
          <RButton
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "90%",
              marginTop: "5px",
              outline: "1px outset pink",
            }}
            type="submit"
          >
            Apply Changes
          </RButton></Col>
        </Row>
        </Grid>   
    </Form>
    </>
  );
});
export default EditCartItem;
