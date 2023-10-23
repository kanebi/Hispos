import { Box, Header, Heading, List, Select, Text } from "grommet";
import React from "react";
import {
  Avatar,
  Grid,
  Row,
  Col,
  Divider,
  Button,
  FlexboxGrid,
  IconButton,
  Input,
  Loader,
  Form as RForm,
  Message,
  SelectPicker,
  Stack,
  Uploader,
  useToaster,
  ButtonGroup,
  Tag,
} from "rsuite";
import { Form } from "@remix-run/react";
import { Hide, New, Stop, User } from "grommet-icons";
import { useFetcher } from "react-router-dom";

const Customer = React.forwardRef((props, ref) => {
  const [details, setDetails] = React.useState(props.details);
  const [createNew, setCreateNew] = React.useState(false);
  const [editOn, setEditOn] = React.useState(false);
  const [showTransaction, setShowTransactions] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const toaster = useToaster();
  const [fileInfo, setFileInfo] = React.useState(details?.image);

  const [customerRecentTransaction, setCustomerRecentTransaction] =
    React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const { handleSubmitCustomer } = props;
  const uploadRef = React.useRef(null);
  const fetcher = useFetcher();
  React.useImperativeHandle(
    ref,
    () => {
      return {
        handleCustomerSaved({ msg = null }) {
          toaster.push(
            <Message type="success">{msg ? msg : "Customer Saved"}</Message>,
          );
          setEditOn(false);
          setCreateNew(false);
        },
        getCustomerTransactions(customerId) {
          fetcher.load(`/pos?customer=${customerId}`);
        },
        createNewActive() {
          return createNew;
        },
      };
    },
    [],
  );

  React.useEffect(() => {
    setDetails(props.details);
    setCustomers([
      ...props.customerList.map((item) => ({ label: item, value: item })),
    ]);
    setFileInfo(details?.image);
  }, [props.details, fetcher.data, , props.customerList]);

  React.useEffect(() => {
    if (fetcher.data?.recentTransactions) {
      setCustomerRecentTransaction(
        fetcher.data?.recentTransactions.map((trx) => {
          return {
            name: (
              <Stack
                justifyContent="start"
                alignItems="start"
                style={{ textAlign: "left" }}
                spacing={5}
                direction="column"
              >
                <Text title="invoice" style={{ fontWeight: "bolder" }}>
                  {trx.invoice}
                </Text>
                <time title="transaction date & time">
                  {" "}
                  {trx.date}, {trx.time}
                </time>
              </Stack>
            ),
            amount: (
              <Stack
                justifyContent="end"
                alignItems="end"
                spacing={5}
                style={{ textAlign: "right" }}
                direction="column"
              >
                <Text color={"default"} style={{ fontWeight: "bold" }}>
                  {trx.currency} {trx.amount}
                </Text>
                <Tag size="lg" color={trx.status === "paid" ? "green" : "cyan"}>
                  {" "}
                  {trx.status}
                </Tag>{" "}
              </Stack>
            ),
          };
        }),
      );
    }
  }, [fetcher.data]);
  function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const CustomInput = ({ ...props }) => (
    <Input
      {...props}
      defaultValue={editOn ? details[props.name] : ""}
      style={{ marginBottom: "10px", border: "none" }}
    />
  );

  const CustomerForm = (props) => {
    const edit = props.edit;

    return (
      <Form onSubmit={(e) => handleSubmitCustomer({ edit: edit, e: e })}>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={12} md={8}>
              <span style={{ display: "none" }}>
                <CustomInput name="id" hidden size="md" />
              </span>
              <CustomInput
                name="name"
                type="text"
                required
                size="md"
                placeholder="Name"
              />
              <CustomInput
                name="email"
                type="email"
                size="md"
                placeholder="Email"
              />
              <Button type="submit">
                {edit === true ? "Apply Edit" : "Create New"}
              </Button>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <CustomInput
                name="phone"
                type="tel"
                size="md"
                placeholder="Phone"
              />
              <CustomInput
                name="address"
                type="address"
                size="md"
                placeholder="Address"
              />
              <Button
                style={{ background: "#f74f87" }}
                onClick={() => {
                  setEditOn(false);
                  setCreateNew(false);
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Uploader
                fileListVisible={false}
                name="image"
                listType="picture"
                action="/pos"
                onUpload={(file) => {
                  setUploading(true);
                  previewFile(file.blobFile, (value) => {
                    setFileInfo(value);
                  });
                }}
                ref={uploadRef}
                onSuccess={(response, file) => {
                  setUploading(false);
                  toaster.push(
                    <Message type="success">Uploaded successfully</Message>,
                  );
                  // console.log(response);
                }}
                onError={() => {
                  setFileInfo(null);
                  setUploading(false);
                  toaster.push(<Message type="error">Upload failed</Message>);
                }}
              >
                <button type="button" style={{ width: 150, height: 150 }}>
                  {uploading && <Loader backdrop center />}
                  {fileInfo && edit === true ? (
                    <img src={fileInfo} width="100%" height="100%" />
                  ) : (
                    <User size="large" />
                  )}
                </button>
              </Uploader>
            </Col>
          </Row>
        </Grid>
      </Form>
    );
  };
  return (
    <Box>
      {props.paymentIsActive ? (
        ""
      ) : (
        <Header title="Customer Details">
          <Heading
            color={"default"}
            as="h5"
            size={editOn || createNew || showTransaction ? "10px" : "xxsmall"}
          >
            Customer Details
          </Heading>
        </Header>
      )}
      <Box margin={props.paymentIsActive ? "" : "small"}>
        {details?.name  && createNew === false ? (
          <Box
            background={"box"}
            style={{
              overflow: "hidden",
              minHeight: "40px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            border={{ side: "horizontal" }}
            round={{ size: "xsmall" }}
            pad={"xsmall"}
          >
          
            <FlexboxGrid justify="space-around">
              <FlexboxGrid.Item colspan={2}>
                <Stack direction="column">
                  <Avatar
                    style={{ borderRadius: "50%" }}
                    size={"sm"}
                    src={editOn ? details.image : fileInfo}
                  >
                    {" "}
                    {details.name[0] || "C"}
                  </Avatar>
                  <div
                    style={{
                      maxWidth: "150px",
                      height: "20px",
                      overflow: "hidden",
                      width: "inherit",

                      textOverflow: "ellipsis",
                      lineHeight: 1.3,
                    }}
                  >
                    <Text
                      style={{
                        // width: "inherit",
                        width: "inherit",
                        height: "10px",
                        lineHeight: 1.3,
                        maxWidth: "300px",
                      }}
                      hidden={editOn || showTransaction ? true : false}
                    >
                      {details.name}
                    </Text>
                  </div>
                </Stack>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={2}>
                <Stack direction="column">
                  {props.paymentIsActive ? (
                    <div
                      style={{
                        maxWidth: "150px",
                        height: "20px",
                        width: "inherit",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.3,
                      }}
                    >
                      <Text
                        style={{
                          width: "inherit",
                          height: "10px",
                          lineHeight: 1.3,
                          maxWidth: "300px",
                        }}
                      >
                        {details.name}
                      </Text>
                    </div>
                  ) : details.email.length > 3 ? (
                    <Text>{details.email}</Text>
                  ) : (
                    "No Email"
                  )}
                  <Divider style={{ margin: "2px" }}></Divider>
                  {details.phone.length >= 7 ? (
                    <Text hidden={editOn || showTransaction ? true : false}>
                      {details.phone}
                    </Text>
                  ) : editOn || showTransaction ? (
                    ""
                  ) : (
                    "No Phone"
                  )}
                </Stack>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={2}>
                <ButtonGroup
                  style={{ display: props.paymentIsActive ? "none" : "" }}
                >
                  <Button
                    style={{
                      height: "28px",
                      display: showTransaction ? "none" : "",
                    }}
                    active={editOn}
                    onClick={() => setEditOn(true)}
                  >
                    Edit Contact
                  </Button>
                  <Button
                    style={{ height: "28px", display: editOn ? "none" : "" }}
                    active={showTransaction}
                    onClick={() => setShowTransactions(true)}
                  >
                    Transactions
                  </Button>
                </ButtonGroup>
                {props.paymentIsActive ? <Text>{details.email}</Text> : ""}
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {showTransaction && !props.paymentIsActive ? (
        <Box
          pad={"small"}
          margin={{ vertical: "small" }}
          style={{ marginTop: 4 }}
        >
          <div
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "5px",
            }}
          >
            <Text
              color={"default"}
              style={{ float: "left", fontWeight: "bolder" }}
            >
              Recent transactions
            </Text>
            <IconButton
              style={{
                float: "right",
                width: "50px",
                maxHeight: "30px",
                textAlign: "center",
              }}
              startIcon={<Hide a11yTitle="Hide Transaction" />}
              onClick={() => setShowTransactions(false)}
            ></IconButton>
          </div>
          <List
            primaryKey={"name"}
            secondaryKey={"amount"}
            data={customerRecentTransaction}
          />
        </Box>
      ) : (
        <Box className="customer-input-section" margin={"small"}>
          {createNew === false && editOn && !props.paymentIsActive ? (
            <>
              <CustomerForm edit={true} />
            </>
          ) : (
            <></>
          )}

          {createNew && editOn === false && !props.paymentIsActive ? (
            <CustomerForm edit={false} new={true} />
          ) : (
            !props.paymentIsActive && (
              <Box>
                <SelectPicker
                  data={customers}
                  name="customer"
                  preventOverflow
                  // placement="topStart"
                  onSelect={(val) => props.handleSelectCustomer(val)}
                  placeholder="Select Customer "
                  block
                />
                <Button
                  startIcon={<New size="small" />}
                  onClick={() => setCreateNew(true)}
                  style={{ width: "40%", top: "20px" }}
                >
                  Add New
                </Button>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  );
});

export default Customer;
