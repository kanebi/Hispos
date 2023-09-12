import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
  Tag,
  ResponsiveContext,
  TextArea,
  CheckBox,
  CheckBoxGroup,
  Image,
  Card,
  CardBody,
  Layer,
  CardHeader,
  CardFooter,
  Select,
  Notification,
  DataTable,
  Meter,
  FileInput,
  Anchor,
  Paragraph,
  Header,
} from "grommet";
import React from "react";
import SelectCurrency from "@paylike/react-currency-select";
import { Link, useNavigate } from "@remix-run/react";
import styled from "../components/styled";
import {
  Cluster,
  Stack,
  Button as SHRButton,
  Dialog,
  DialogContent,
  FaMinusIcon,
  FaMinusCircleIcon,
} from "smarthr-ui";
import * as Icons from "grommet-icons";
import { AiOutlineDelete, AiOutlineMinusCircle } from "react-icons/ai/index.js";
import { useUIDSeed } from "react-uid";
import { v4 as uuid } from "uuid";
// import { check } from "express-validator";
import { toast } from "react-toastify";
import erplogo from "../../public/default_images/ERPNext.png";
import excellogo from "../../public/default_images/excel.png";
import * as XLSX from "xlsx";
import axios from "axios";
import countryList from "react-select-country-list";
import "../styles/setup.css";
import erp_item_fields from "../../config/erp_item_fields";
import { replaceAll } from "../../utils/str_utils.js";

const defaultOptions = [
  "Sales Manager",
  "Sales Agent",
  "Sales Supervisor",
  "Sales Personnel",
  "Sales Assistant",
];


const getEscapedText = (text) => text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
const formatSearchExpression = (text) => new RegExp(getEscapedText(text), "i");
const UsernameSetup = (props) => {
  const [userName, setUserName] = React.useState("");
  const [validationStatus, setvalidationStatus] = React.useState(false);
  const screenSize = React.useContext(ResponsiveContext);
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
  const handleSetUsername = (username) => {
    setUserName(username);
    validateUsername();
  };

  const validateUsername = () => {
    if (userName.length >= 5) {
      setvalidationStatus(true);
      return true;
    }
    setvalidationStatus(false);
    return false;
  };
  return (
    <Box margin={"medium"} alignSelf="center" alignContent="center">
      <Form>
        <Box width={"medium"}>
          <FormField
            label="Enter A Username"
            color={validationStatus ? "red" : "default"}
            name="username"
            style={{ textAlign: "center", alignContent: "center" }}
          >
            <TextInput
              textAlign="center"
              placeholder="Username"
              autoFocus
              onChange={(e) => handleSetUsername(e.target.value)}
              minLength={5}
              size={"medium"}
              maxLength={20}
              icon={
                validationStatus ? (
                  <Icons.StatusGood color="lightgreen" />
                ) : (
                  <p></p>
                )
              }
            ></TextInput>
          </FormField>
        </Box>
        <Box
          direction="row-responsive"
          width={"medium"}
          style={{ alignItems: "center" }}
          justify="center"
          align="center"
        >
          <Box direction={"column"} width={"medium"} justify="start">
            <FormField
              name="country"
              required
              width={"100%"}
              value={0}
              label="Country"
            >
              <Select
                placeholder="Select Country"
                options={countryList().getLabels()}
                style={{
                  textAlign: screenSize === "small" ? "left" : "right",
                }}
              ></Select>
            </FormField>
          </Box>
          <Box direction="column" width={"medium"} justify="end">
            {" "}
            <FormField
              name="currency"
              style={{
                textAlign: screenSize === "small" ? "left" : "right",
              }}
              required
              label="Currency"
            >
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
            </FormField>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

const CompanySetup = (props) => {
  const [logo, setLogo] = React.useState(null);
  const [logoURL, setLogoURL] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const screenSize = React.useContext(ResponsiveContext);
  const handleLogoURL = ({ files }) => {
    setLogo(files[0]);
    const objURL = URL.createObjectURL(files[0]);

    setLogoURL(objURL);
  };
  return (
    <>
      <Form>
        <Box
          margin={"medium"}
          alignSelf="center"
          alignContent="center"
          style={{ marginBottom: "10px" }}
        >
          <Box direction="row-responsive">
            <Box direction={"column"} width={"large"}>
              <FormField
                name="name"
                width={"50%"}
                label="Company/Business Name"
              >
                <TextInput
                  type="text"
                  placeholder="Enter Your Company Name"
                ></TextInput>
              </FormField>
            </Box>
            <Box flex="shrink" width={"medium"}>
              <FormField name="name" width={"50%"} label="Company Logo">
                <TextInput
                  hidden
                  name="logo"
                  label="Company Logo"
                  accept="image/*"
                  ref={fileInputRef}
                  type="file"
                  messages={
                    logo
                      ? "This would be considered as priority to the uploaded image, please leave blank if you selected an image file already."
                      : ""
                  }
                  onChange={(e) => handleLogoURL({ files: e.target.files })}
                ></TextInput>

                <Image
                  style={{ cursor: "pointer", padding: "10px" }}
                  label="Company Logo"
                  type="image"
                  // onLoad={(e) => alert(JSON.stringify(e))}
                  onClick={() => fileInputRef.current.click()}
                  src={logoURL ? logoURL : "/default_images/company.png"}
                ></Image>
                {logoURL ? (
                  <Button
                    style={{ border: "none" }}
                    alignSelf="center"
                    type="reset"
                    icon={<AiOutlineDelete />}
                    color="red"
                    onClick={() => setLogoURL(null)}
                    pad={"xxsmall"}
                    label="Remove"
                  ></Button>
                ) : (
                  ""
                )}
              </FormField>
            </Box>
          </Box>
          <FormField name="logo" type="url">
            <TextInput
              type="url"
              value={logoURL}
              onChange={(e) => setLogoURL(e.target.value)}
              placeholder="Or Enter Logo URL"
            ></TextInput>
          </FormField>
          <FormField label="About Company" name="description">
            <TextArea
              name="description"
              placeholder="Enter Company Description"
            ></TextArea>
          </FormField>

          <FormField label="Is Group" name="isGroup">
            <CheckBox defaultValue={false} name="isGroup" />
          </FormField>
        </Box>
      </Form>
    </>
  );
};

const Shop = React.forwardRef((props, ref) => {
  const screenSize = React.useContext(ResponsiveContext);
  const [optionalSelect, setoptionalSelect] = React.useState(false);
  const [createNewShop, setCreateNewShop] = React.useState(false);
  const [roleOptions, setRoleOptions] = React.useState(defaultOptions);
  const [allShops, setAllShops] = React.useState([]);
  const [shopOptions, setShopOptions] = React.useState(allShops);
  const [teamMembers, setTeamMembers] = React.useState([
    "Me",
    ...props.members,
  ]);
  const [teamMemberOptions, setTeamMemberOptions] = React.useState(teamMembers);
  const [shopName, setShopName] = React.useState("");
  const [roleName, setRoleName] = React.useState("");

  React.useImperativeHandle(
    ref,
    () => ({
      updateMemberData(data) {
        setTeamMembers((prev) => [
          ...prev.filter((itm) => itm !== data.email),
          data.email,
        ]);
        setTeamMemberOptions((prev) => [
          ...prev.filter((itm) => itm !== data.email),
          data.email,
        ]);
      },
    }),
    []
  );
  const onSearchTeamMember = (text) => {
    const exp = formatSearchExpression(text);
    setTeamMemberOptions(teamMembers.filter((option) => exp.test(option)));
  };
  const onSearchShop = (text) => {
    const exp = formatSearchExpression(text);
    setShopOptions(allShops.filter((option) => exp.test(option)));
  };
  const onSearchRole = (text) => {
    const exp = formatSearchExpression(text);
    setRoleOptions(defaultOptions.filter((option) => exp.test(option)));
  };
  return (
    <Box alignContent="center" pad={"small"}>
      <Box direction="row-responsive" border="all" background={"input"}>
        <Box direction="column">
          {/* {createNewShop ? ( */}
          <TextInput
            className={props.uid}
            type="text"
            name={props.uid + "-name"}
            value={shopName}
            required
            onChange={(e) => setShopName(e.target.value)}
            title="Shop name"
            icon={<Icons.Shop size="small" color="default" />}
            placeholder="Shop Name"
            style={{ border: "none", outline: "none" }}
          ></TextInput>
          {/* ) : (
            <Select
              style={{ border: "none", outline: "none" }}
              placeholder="Select/Create Shop"
              name={props.uid + "-name"}
              onChange={(e) => setShopName(e.target.value)}
              plain
              searchPlaceholder="Search Shops..."
              emptySearchMessage={
                <Button
                  size="large"
                  pad={"large"}
                  onClick={() => setCreateNewShop(true)}
                >
                  Create As New Shop
                </Button>
              }
              options={shopOptions}
              onSearch={(text) => onSearchShop(text)}
            ></Select>
          )} */}

          <TextInput
            id={props.uid}
            className={props.uid}
            type="text"
            style={{ border: "none", outline: "none" }}
            name={props.uid + "-location"}
            title="Shop location"
            icon={<Icons.Location size="small" color="default" />}
            placeholder="Shop Location"
          ></TextInput>
        </Box>
        <Box direction="column">
          <Select
            style={{ border: "none", outline: "none" }}
            placeholder="Member Email"
            className={props.uid}
            name={props.uid + "-member"}
            plain
            searchPlaceholder="Search Sales Team Member..."
            emptySearchMessage={"Team Member(s) Not Found, Create some"}
            options={teamMemberOptions}
            onSearch={(text) => onSearchTeamMember(text)}
          ></Select>
          {optionalSelect ? (
            <TextInput
              className={props.uid}
              style={{ border: "none", outline: "none" }}
              placeholder="As /Member Role"
              value={roleName}
              required
              onChange={(e) => setRoleName(e.target.value)}
              icon={<Icons.StarOutline size="small" color="default" />}
              autoFocus
              type="text"
              name={props.uid + "-member-role"}
            />
          ) : (
            <Select
              style={{ border: "none", outline: "none" }}
              placeholder="As /Member Role"
              name={props.uid + "-member-role"}
              required
              className={props.uid}
              onChange={(e) => setRoleName(e.target.value)}
              plain
              searchPlaceholder="Search Role..."
              emptySearchMessage={
                <Button onClick={() => setoptionalSelect(true)}>
                  Other/Custom
                </Button>
              }
              options={roleOptions}
              onSearch={(text) => onSearchRole(text)}
            ></Select>
          )}
        </Box>
      </Box>
    </Box>
  );
});

const Member = (props) => {
  const screenSize = React.useContext(ResponsiveContext);
  // const [value, setValue] = React.useState("")

  return (
    <Box alignContent="center" pad={"small"}>
      <TextInput
        disabled={props.sent ? true : false}
        // value={value}
        id={props.uid}
        type="email"
        autoFocus
        required
        name={props.uid}
        title="Member email"
        icon={<Icons.Mail size="small" color="default" />}
        placeholder="Member Email"
      ></TextInput>
    </Box>
  );
};

const AgentsSetup = (props) => {
  const [inviteSent, setInviteSent] = React.useState(false);
  const [sendingInvites, setSendingInvites] = React.useState(false);
  const [sentInvites, setSentInvites] = React.useState([]);
  const memberFormRef = React.useRef(null);
  const shopFormRef = React.useRef(null);
  const [shopsCreated, setShopsCreated] = React.useState(false);
  const [creatingShops, setCreatingShops] = React.useState(false);
  const [createdShops, setcreatedShops] = React.useState([]);
  const [shopNotifiVisible, setShopNotifiVisible] = React.useState(true);

  const screenSize = React.useContext(ResponsiveContext);

  const uid = useUIDSeed();

  let defaultUID = uuid();
  const defaultShopRef = React.useRef([]);
  const [memberForms, setMemberForms] = React.useState([
    {
      index: 1,
      sent: false,
      uid: defaultUID,
      email: "",

      Component: <Member index={1} uid={defaultUID} key={uuid()} />,
    },
  ]);

  const [shopForms, setShopForms] = React.useState([
    {
      index: 1,
      memberRole: "",
      uid: defaultUID,
      member: "",
      ref: defaultShopRef,
      created: false,
      Component: (
        <Shop
          index={1}
          uid={defaultUID}
          ref={(el) => (defaultShopRef.current[1] = el)}
          shops={createdShops}
          members={sentInvites}
          key={uuid()}
        />
      ),
    },
  ]);

  const handleSendInvites = ({ values }) => {
    setSendingInvites(true);
    if (!inviteSent) {
      const sendInvites = () =>
        new Promise((resolve) => {
          let invited = [];

          for (let i = 0; i < memberForms.length; i++) {
            const member = memberForms[i];
            //  validate email
            const memberEmail = values[member.uid];

            // let email_is_valid = check(memberEmail).isEmail();
            if (memberEmail !== undefined && memberEmail.trim().length >= 5) {
              // ....validate email
              member.email = memberEmail;
              invited.push(memberEmail);
              // Update All Shop Member data
              for (let i = 1; i < defaultShopRef.current.length; i++) {
                const refEl = defaultShopRef.current[i];
                refEl.updateMemberData({
                  email: memberEmail,
                });
              }
            } else {
              setSendingInvites(false);
              throw Error("Email Invalid : " + memberEmail);
            }
            if (!member.sent === true) {
              member.sent = true;
              const memInput = document.getElementById(member.uid);
              memInput.setAttribute("disabled", true);
            }
          }
          setSentInvites(invited);
          setInviteSent(true);
          setSendingInvites(false);
          resolve();
        });

      toast.promise(sendInvites, {
        pending: "sending Invites",

        success: "Invites sent",
        error: {
          render({ data }) {
            setSendingInvites(false);
            return <Text>{data.message}</Text>;
          },
        },
      });
    } else {
      toast.info("Invites Already Sent", { theme: "colored" });
      setSendingInvites(false);
    }
  };

  const handleAddMember = ({ index = null }) => {
    setInviteSent(false);
    let defaultUID = uuid();
    const i = index ? index : memberForms.length + 1;
    const member = {
      index: i,
      sent: false,
      uid: defaultUID,
      email: "",
      Component: <Member key={uuid()} uid={defaultUID} index={i} />,
    };
    // memberForms.push(member);
    const newMemberList = memberForms;
    newMemberList.push(member);
    setMemberForms((prev) => [...newMemberList]);

    return member;
  };

  const handleRemoveMember = (item) => {
    if (!(memberForms.length <= 1)) {
      setInviteSent(false);

      const newMemberList = memberForms.filter((itm) => itm.uid !== item.uid);

      setMemberForms((prev) => [...newMemberList]);
    }
  };
  const handleRemoveShop = (item) => {
    if (!(shopForms.length <= 1)) {
      setcreatedShops(false);

      const newShopList = shopForms.filter((itm) => itm.uid !== item.uid);

      setShopForms((prev) => [...newShopList]);
    }
  };

  const handleAddShop = ({ index = null }) => {
    setShopsCreated(false);
    let defaultUID = uuid();
    const i = index ? index : shopForms.length + 1;
    const shop = {
      index: i,
      memberRole: "",
      uid: defaultUID,
      member: "",
      ref: defaultShopRef,
      Component: (
        <Shop
          key={uuid()}
          shops={createdShops}
          ref={(el) => (defaultShopRef.current[i] = el)}
          members={sentInvites}
          uid={defaultUID}
          index={i}
        />
      ),
    };

    // memberForms.push(member);
    const newShopList = shopForms;
    newShopList.push(shop);
    setShopForms((prev) => [...newShopList]);

    return shop;
  };

  const handleCreateShops = ({ values }) => {
    setCreatingShops(true);
    if (!shopsCreated) {
      const createShops = () =>
        new Promise((resolve) => {
          // ...validate
          for (let i = 0; i < shopForms.length; i++) {
            const shop = shopForms[i];

            const shopEls = document.getElementsByClassName(shop.uid);
            for (let i = 0; i < shopEls.length; i++) {
              const shopEl = shopEls[i];

              shopEl.setAttribute("disabled", true);
            }
            shop.created = true;
          }
          // end disable form inputs

          setShopsCreated(true);
          setCreatingShops(false);
          resolve();
        });

      toast.promise(createShops, {
        pending: "Creating Shops",

        success: "Shops Created",
        error: {
          render({ data }) {
            setCreatingShops(false);
            return <Text>{data.message}</Text>;
          },
        },
      });
    } else {
      toast.info("Shops Already Created", { theme: "colored" });
      setCreatingShops(false);
    }
  };

  return (
    <>
      <Card margin={"medium"} pad={"medium"}>
        <CardHeader
          pad={"small"}
          border={{ side: "horizontal", style: "ridge" }}
          align="center"
        >
          <Heading
            size="xxsmall"
            margin={"medium"}
            as={"b"}
            alignSelf="end"
            style={{ marginTop: "-20px" }}
            color={"default"}
          >
            Invite Team Members
          </Heading>
          <Button
            margin={"small"}
            primary
            width="xxsmall"
            icon={
              <Icons.UserAdd size="small" scale={"small"} color="default" />
            }
            alignSelf="start"
            onClick={handleAddMember}
            size="small"
            label="Add"
          ></Button>
        </CardHeader>
        <CardBody>
          <Form
            ref={memberFormRef}
            onSubmit={(nextVal) => {
              handleSendInvites({ values: nextVal.value });
            }}
          >
            {memberForms.map((Item, index) => (
              <Box direction="row" key={uid(Item)} margin={"medium"}>
                <Box direction="column" width={"large"}>
                  {Item.Component}
                </Box>
                <Box direction="column" width={"small"} flex="shrink">
                  <Button
                    border={{ round: "xlarge" }}
                    style={{ top: screenSize === "small" ? "30px" : "-20px" }}
                    size="xxsmall"
                    color={Item.sent ? "lightgreen" : "red"}
                    margin={"small"}
                    onClick={() =>
                      Item.sent ? () => {} : handleRemoveMember(Item)
                    }
                    icon={
                      Item.sent ? (
                        <Icons.StatusGood />
                      ) : (
                        <AiOutlineMinusCircle />
                      )
                    }
                  ></Button>
                </Box>
              </Box>
            ))}
            <CardFooter align="center" pad={"medium"}>
              <Button
                size="small"
                type="submit"
                busy={sendingInvites}
                label={inviteSent ? "Invites Sent ✔" : "Send Invites"}
              ></Button>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
      <Card margin={"medium"} pad={"medium"}>
        <CardHeader
          pad={"small"}
          border={{ side: "horizontal", style: "ridge" }}
          align="center"
        >
          <Heading
            size="xxsmall"
            margin={"medium"}
            as={"b"}
            alignSelf="end"
            style={{ marginTop: "-10px" }}
            color={"default"}
          >
            Create Shops And Assign Team Members
          </Heading>
          <Button
            margin={"small"}
            primary
            width="xxsmall"
            icon={<Icons.Shop size="small" scale={"small"} color="default" />}
            alignSelf="start"
            onClick={handleAddShop}
            size="small"
            label="Add"
          ></Button>
        </CardHeader>
        {shopNotifiVisible ? (
          <Notification
            status="info"
            style={{ marginTop: "6px" }}
            message="Similar Shop Names with same or no location would be treated as same and roles would be assinged to members as designated on each shop form."
            onClose={() => {
              setShopNotifiVisible(false);
            }}
          />
        ) : (
          ""
        )}
        <CardBody>
          <Form
            ref={shopFormRef}
            onSubmit={(nextVal) => {
              handleCreateShops({ values: nextVal.value });
            }}
          >
            {shopForms.map((Item, index) => (
              <Box
                direction={screenSize === "small" ? "column" : "row-responsive"}
                key={uid(Item)}
                margin={"medium"}
              >
                <Box direction="column">{Item.Component}</Box>
                <Box direction="column">
                  <Button
                    border={{ round: "xlarge" }}
                    size="xxsmall"
                    color={Item.sent ? "lightgreen" : "red"}
                    margin={"medium"}
                    onClick={() =>
                      Item.sent ? () => {} : handleRemoveShop(Item)
                    }
                    icon={
                      Item.created ? (
                        <Icons.StatusGood />
                      ) : (
                        <AiOutlineMinusCircle />
                      )
                    }
                  ></Button>
                </Box>
              </Box>
            ))}
            <CardFooter align="center" pad={"medium"}>
              <Button
                size="small"
                type="submit"
                busy={creatingShops}
                label={shopsCreated ? "Shops Created ✔" : "Create Shops"}
              ></Button>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const InventorySetup = (props) => {
  const StyledBox = styled(Box).attrs((props) => ({ bgImage: props.bgImage }))`
    text-align: center;
    display: flex;
    float: right;
    margin: 40px;
    background-size: 150px;
    font-weight: bold;
    background-repeat: no-repeat;
    background-image: url("${(props) => props.bgImage}");

    border-radius: 20px;

    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
    cursor: pointer;
    transition: all 100ms ease-in;

    background-position: 50% 45%;
    &:hover {
      background-color: #bcb9c7;
    }
  `;

  const fileRef = React.useRef(null);
  const [importedData, setimportedData] = React.useState([]);
  const [selectedItems, dispatchSelectedItems] = React.useReducer(
    selectedItemsReducer,
    []
  );
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const screenSize = React.useContext(ResponsiveContext);
  const [showConnectERP, setShowConnectERP] = React.useState(false);
  const [erpnextConnected, setERPNextConnected] = React.useState(false);
  const [erpUser, setErpUser] = React.useState(null);
  const [showConfigureERP, setShowConfigureERP] = React.useState(false);
  const [extraFields, setExtraFields] = React.useState([]);
  const [importType, setImportType] = React.useState("Platform");
  const importCheckBoxesRef = React.useRef([]);
  const [userImportConfigs, setUserImportConfigs] = React.useState(["default"]);
  const [currentConfigChanged, setCurrentConfigChanged] = React.useState(false);
  const [showSaveConfig, setShowSaveConfig] = React.useState(false);
  const [importStatus, setimportStatus] = React.useState(null);
  const [newConfigSettings, setNewConfigSettings] = React.useState({});
  const [fieldError, setFieldError] = React.useState(null);
  const [importData, setImportData] = React.useState({
    name: "default",
    type: importType,
    to_item_company: false,
    destination_company: "Default Company",
    all_items: false,
    is_sales_item: false,
    is_stock_item: true,
    is_grouped_asset: false,
    is_fixed_asset: false,
    is_purchase_item: false,
    is_sub_contracted_item: false,
    is_customer_provided_item: false,
    extra_fields: extraFields,
    create_sales_invoice: true,
    status: "Not Started",
  });
  const [erpUserConfig, setErpUserConfig] = React.useState({
    api_key: "",
    api_secret: "",
    host_url: "",
  });

  const [platFormFields, setPlatFormFields] = React.useState(
    [
      // { header: <Text>S/N</Text>, property: "index", primary: true },

      {
        header: <Text>Name</Text>,
        property: "name",
        primary: true,
      },
      {
        header: <Text>Code</Text>,
        property: "code",
        primary: true,
      },
      {
        header: <Text>Price </Text>,
        property: "price_amount",
        primary: true,
      },
      {
        header: <Text>Currency </Text>,
        property: "price_currency",
        primary: true,
      },
      {
        header: <Text>Unit Of Measurement </Text>,
        property: "stock_uom",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <>
              <Button
                icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
                alignSelf="center"
                size="small"
                secondary
                width="small"
                onClick={() => handleRemoveField("stock_uom")}
              />{" "}
            </>
          ) : (
            ""
          ),
      },
      {
        header: <Text>Weight Per Unit </Text>,
        property: "weight_per_unit",
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("weight_per_unit")}
            />
          ) : (
            ""
          ),
        primary: true,
      },
      {
        header: <Text>Valuation Rate </Text>,
        property: "valuation_rate",
        primary: true,
        
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("valuation_rate")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Quantity </Text>,
        property: "available_stock_quantity",
        primary: true,
        render: (datum) => (
          <Box pad={{ vertical: "xsmall" }}>
            <Meter
              size="small"
              value={datum.quantity}
              thickness="small"
            ></Meter>
          </Box>
        ),
      },
    ].concat(
      importStatus !== "completed"
        ? [
            {
              header: <Text>Action</Text>,

              property: "action",
              render: (datum) => (
                <Button
                  label="Remove"
                  color={"red"}
                  size="small"
                  style={{ border: "none" }}
                  onClick={() => handleRemoveFromSelcted(datum.code)}
                  icon={<Icons.Trash size="small" />}
                ></Button>
              ),
            },
          ]
        : []
    )
  );

  const [erpFields, setErpFields] = React.useState(
    [
      {
        header: <Text>Item Name </Text>,
        property: "item_name",
        primary: true,
      },
      {
        header: <Text>Item Code </Text>,
        property: "item_code",
        primary: true,
      },
      {
        header: <Text>Item Group </Text>,
        property: "item_group",
        primary: true,
      },
      {
        header: <Text>Stock UOM </Text>,
        property: "stock_uom",
        primary: true,
      },
      // {
      //   header: <Text>Disabled</Text>,
      //   property: "disabled",
      //   primary: true,
      // },
      // {
      //   header: <Text>Is Stock Item</Text>,
      //   property: "is_stock_item",
      //   primary: true,
      // },
      {
        header: <Text>Opening Stock (Qty) </Text>,
        property: "opening_stock",
        primary: true,
      },
      {
        header: <Text>Valuation rate </Text>,
        property: "valuation_rate",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("valuation_rate")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Standard Rate (Price) </Text>,
        property: "standard_rate",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("standard_rate")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text></Text>,
        property: "brand",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("brand")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Weight Per Unit </Text>,
        property: "weight_per_unit",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("weight_per_unit")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Weight UOM </Text>,
        property: "weight_uom",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("weight_uom")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text></Text>,
        property: "image",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("image")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Description </Text>,
        property: "description",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("description")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Allow Negative Stock </Text>,
        property: "allow_negative_stock",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("allow_negative_stock")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Variant Of </Text>,
        property: "variant_of",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("variant_of")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Variant Based On </Text>,
        property: "variant_based_on",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("variant_based_on")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Min Order Qty </Text>,
        property: "min_order_qty",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("min_order_qty")}
            />
          ) : (
            ""
          ),
      },
      {
        header: <Text>Default Manufacturer </Text>,
        property: "default_item_manufacturer",
        primary: true,
        footer:
          importStatus !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField("default_item_manufacturer")}
            />
          ) : (
            ""
          ),
      },
    ].concat(
      importStatus !== "completed"
        ? [
            {
              header: <Text>Action</Text>,

              property: "action",
              render: (datum) => (
                <Button
                  label="Remove"
                  color={"red"}
                  size="small"
                  style={{ border: "none" }}
                  onClick={() => handleRemoveFromSelcted(datum.item_code)}
                  icon={<Icons.Trash size="small" />}
                ></Button>
              ),
            },
          ]
        : []
    )
  );
  function itemFieldReducer(state, action) {
    // let newState;
    switch (action.type) {
      case "Platform":
        const newFields_ = action.fields ? action.fields : platFormFields;
        return newFields_;
      case "ERP":
        const newFields = action.fields ? action.fields : erpFields;
        return newFields;
      case "ADD_NEW_FIELDS":
        if (action.mType === "ERP" || action.mType.includes("ERP")) {
          const newERPFields = [];
          const currentERPState = state.length >= 1 ? state : erpFields;
          for (let i = 0; i < currentERPState.length; i++) {
            const field = currentERPState[i];
            field.footer =
              field.footer !== undefined && status !== "completed" ? (
                <Button
                  icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
                  alignSelf="center"
                  size="small"
                  secondary
                  width="small"
                  onClick={() => handleRemoveField(field.property)}
                />
              ) : undefined;

            if (field.property === "action" && status === "completed") {
              field.render = (datum) => <></>;
              field.header = "";
            }
            field.size = "300px";
            field.align = "start";
            // field.key = i
            newERPFields.push(field);
          }
          const actionCell =
            newERPFields[
              newERPFields.indexOf(
                newERPFields.filter((itm) => itm.property === "action")[0]
              )
            ];

          let noActionFields = newERPFields;
          noActionFields.pop(actionCell);

          const finalFields = [
            ...noActionFields,
            ...action.newFields,
            actionCell,
          ];

          return finalFields;
        }

      case "remove_field":
        const newState = [
          ...state.filter((itm) => itm.property !== action.property),
        ];

        return newState;
      case "ERP_UPDATE":
        const newStateUpdate = [...action.fields, ...state];
        return newStateUpdate;
      case "Empty":
        return [];
      default:
        throw state;
    }
  }
  function selectedItemsReducer(state, action) {
    switch (action.type) {
      case "new":
        return action.values;
      case "remove_item":
        const newState = [
          ...state.filter((itm) => {
            if (itm.code != undefined) {
              return itm.code != action.code;
            }
            if (itm.item_code != undefined) {
              return itm.item_code != action.code;
            }
          }),
        ];
        return newState;
      default:
        return state;
    }
  }
  const [itemFields, itemFieldsDispatch] = React.useReducer(itemFieldReducer, [
    importType === "ERP" ? [...erpFields] : [...platFormFields],
  ]);

  function handleRemoveField(property) {
    // alert(getItem.length)
    itemFieldsDispatch({ type: "remove_field", property: property });
  }

  const handleSaveNewConfig = (val) => {
    // ...
    setCurrentConfigChanged(false);
    handleSetupErpNext(newConfigSettings);

    if (val === false) {
      setShowConnectERP(false);
      setShowSaveConfig(false);

      return toast.info("Changes Ignored");
    }
    const newDataInst = importData;

    if (
      newConfigSettings.name !== undefined &&
      newConfigSettings.name !== importData.name
    ) {
      // create new on server
      for (let key in newDataInst) {
        if (newConfigSettings[key]) {
          newDataInst[key] = newConfigSettings[key];
        }
      }
      console.log(newDataInst, "create");
      toast.success("Config Created");
      setImportData(newDataInst);
    } else {
      for (let key in newDataInst) {
        if (newConfigSettings[key]) {
          newDataInst[key] = newConfigSettings[key];
        }
      }

      console.log(newDataInst, "update");

      // update existing record with new config
      toast.success("Config Updated");

      setImportData(newDataInst);
    }

    setShowSaveConfig(false);

    setShowConnectERP(false);
  };
  const handleSetImportConfig = (val) => {
    // load config from server and set to importConfig state
    // ...
  };
  const handleFileImport = (files) => {
    setImportType("Platform");
    itemFieldsDispatch({ type: "Platform" });
    setSelectedFile(files[0]);

    // process File
    const processXLS = (f) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const importData = [];
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          resolve(json);
        };

        reader.readAsArrayBuffer(f);
      });
    };
    Promise.all(Array.from(files).map(processXLS)).then((jsonData) => {
      dispatchSelectedItems({ type: "new", values: jsonData[0] });
    });

    // ...getFile Data and set to selected Items or return error
    // setSelectedItems(testData);
    // pop up modal to edit items before final import
    handleViewImportEdit();
  };

  const handleERPNext = () => {
    setImportType("ERP");
    itemFieldsDispatch({ type: "ERP" });

    // provide form for connecting to erp account api
    setShowConnectERP(true);
    // connect to erp
    // import items via provided endpoint
    // set selected items
    // open edit modal
  };
  const handleViewImportEdit = () => {
    // show edit modal
    setShowEditModal(true);
  };

  const reUpdateAllFields = ({
    status = null,
    mType = null,
    newFields = [],
  }) => {
    // alert(importType);

    // platform update
    var gFields = [];

    if (mType === "Platform" || mType.includes("Platform")) {
      const currentFieldList =
        itemFields.length >= 1 ? itemFields : platFormFields;
      for (let i = 0; i < currentFieldList.length; i++) {
        const field = currentFieldList[i];
        field.footer =
          status !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField(field.property)}
            />
          ) : (
            ""
          );
        if (field.property === "action" && status === "completed") {
          field.render = (datum) => <></>;
          field.header = "";
        }

        newPlatformFields.push(field);
      }
      gFields = newPlatformFields;
    }

    // ERP update

    if (mType === "ERP" || mType.includes("ERP")) {
      const newERPFields = [];
      const currentFieldList = itemFields.length >= 1 ? itemFields : erpFields;
      for (let i = 0; i < currentFieldList.length; i++) {
        const field = currentFieldList[i];
        field.footer =
          field.footer !== undefined && status !== "completed" ? (
            <Button
              icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
              alignSelf="center"
              size="small"
              secondary
              width="small"
              onClick={() => handleRemoveField(field.property)}
            />
          ) : undefined;

        if (field.property === "action" && status === "completed") {
          field.render = (datum) => <></>;
          field.header = "";
        }
        field.size = "300px";
        field.align = "start";
        // field.key = i
        newERPFields.push(field);
      }

      gFields = newERPFields;
    }

    itemFieldsDispatch({ type: mType, fields: [...gFields] });
  };
  const handleImportToServer = () => {
    setImporting(true);
    setimportStatus("importing");

    // ...post to server
    toast.info("Importing", { isLoading: true });
    // console.log(selectedItems);
    setimportedData((prev) => [...selectedItems]);

    toast.update("Completing import");

    setShowEditModal(false);

    toast.success("Import Completed");

    setImporting(false);

    setimportStatus("completed");
    reUpdateAllFields({ status: "completed", mType: importType });
  };

  const handleConnectERPNext = (values) => {
    const erp_base_url = values.host_url;
    // fetch loggedin user and set to state

    axios
      .get(erp_base_url + "/api/method/frappe.auth.get_logged_user", {
        headers: {
          Authorization: `token ${values.api_key}:${values.api_secret}`,
        },
      })
      .then((resp) => {
        const data = resp.data;
        setErpUser(data.message);

        // set onlyif correct
        setErpUserConfig(values);
        // end set
        toast.success("ERP-Next Connected Successfully");
        setShowConfigureERP(true);
      })
      .catch((err) => {
        err?.response?.status === 404
          ? toast.error(
              `ERP host "${values.host_url}" not found, try removing any trailing slash after the domain name`
            )
          : err?.response?.status === 401
          ? toast.error("Invalid credentials, Please Check the inputed keys")
          : toast.error("Network Error, Check URL Provided");
      });

    // create erpuser object in db

    // ...
    // use /api/method/item to get all items and set to selected state
  };
  const handleImportErpNext = (values) => {
    setImportType("ERP");
    // itemFieldsDispatch({ type: "ERP" });
    axios
      .get(
        values.host_url +
          `/api/resource/Item?fields=["item_code","item_name","item_group","stock_uom","disabled","is_stock_item","opening_stock","valuation_rate","standard_rate","image","description","brand","weight_per_unit","weight_uom","allow_negative_stock","variant_of","variant_based_on","min_order_qty","default_item_manufacturer"${
            extraFields.length >= 1 ? "," + [...extraFields] : " "
          }]`.trim(),
        {
          headers: {
            Authorization: `token ${erpUserConfig.api_key}:${erpUserConfig.api_secret}`,
          },
        }
      )
      .then((resp) => {
        const data = resp.data;

        dispatchSelectedItems({ type: "new", values: data["data"] });
        // map with platform
        handleViewImportEdit();
      })
      .catch((err) => toast.error("Import Failed: Connection Issue"));
  };
  const handleRemoveFromSelcted = (code_) => {
    const _values = dispatchSelectedItems({ type: "remove_item", code: code_ });
    //  return dispatchSelectedItems({type:"new", values:_values})
  };

  const handleSetupErpNext = (val) => {
    // update erp user configuration
    // ...

    handleImportErpNext(erpUserConfig);
  };

  const handleSetExtraFields = (val) => {
    const extraF = val.split(",");
    const rawFields = [];
    const filteredFields = [];

    if (val === "*") {
      const selectedFromERP = erp_item_fields.filter(
        (fld) => erpFields.find((obj) => obj.property === fld) === undefined
      );

      for (let i = 0; i < selectedFromERP.length; i++) {
        const field = selectedFromERP[i];
        rawFields.push(JSON.stringify(field));
        const formatedField = replaceAll("_", " ", field, true);
        const fieldObj = {
          header: <Text>{formatedField}</Text>,
          property: field,
          primary: true,
          footer:
            importStatus !== "completed" ? (
              <Button
                icon={<AiOutlineMinusCircle style={{ color: "inherit" }} />}
                alignSelf="center"
                size="small"
                secondary
                width="small"
                onClick={() => handleRemoveField(field)}
              />
            ) : (
              ""
            ),
        };

        filteredFields.push(fieldObj);
      }
    } else {
      for (let i = 0; i < extraF.length; i++) {
        const field = extraF[i].trim();
        if (!erp_item_fields.includes(field) && !(field.length <= 1)) {
          return setFieldError(`${field} is not a valid ERP-Next Item Field`);
        } else {
          if (field.length <= 1) {
            setFieldError("");

            continue;
          }
        }
        rawFields.push(JSON.stringify(field));
        const formatedField = replaceAll("_", " ", field, true);
        const fieldObj = {
          header: <Text>{formatedField}</Text>,
          property: field,
          primary: true,
          footer: <></>,
        };
        if (
          erpFields.filter((itm) => itm.property === field).length <= 0 &&
          platFormFields.filter((itm) => itm.property === field).length <= 0
        ) {
          filteredFields.push(fieldObj);
        }
      }
    }
    setExtraFields(rawFields);
    importData.extra_fields = rawFields;
    // reUpdateAllFields({
    //   status: importStatus,
    //   mType: importType,
    //   newFields: filteredFields,
    // });
    itemFieldsDispatch({
      type: "ADD_NEW_FIELDS",
      mType: "ERP",
      newFields: [...filteredFields],
    });
  };

  return (
    <>
      {importStatus === "completed" ? (
        <Box>
          <Box alignContent="center" margin={"medium"} alignSelf="center">
            <Text
              style={{
                display: "inline-block",
                fontSize: "20px",
                fontWeight: "bolder",
              }}
              color="default"
            >
              {" "}
              Inventory Imported{" "}
              <Icons.StatusGood
                style={{ marginBottom: "-7px" }}
                size="medium"
              />
            </Text>{" "}
          </Box>
          <Box>
            <DataTable
              columns={itemFields}
              // size="large"
              title="Imported Items"
              data={importedData}
              background={"input"}
              paginate={true}
            ></DataTable>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box style={{ display: "none" }}>
            <FileInput
              ref={fileRef}
              maxLength={1}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="file"
              onChange={(e) => handleFileImport(e.target.files)}
            ></FileInput>
          </Box>

          <Heading
            alignSelf="center"
            color={"default"}
            style={{ fontSize: "25px" }}
            size="xxsmall"
          >
            {" "}
            Import Inventory
          </Heading>
          <Box
            justify="center"
            direction={screenSize === "small" ? "column" : "row-responsive"}
            margin={"medium"}
            align="center"
            alignContent="center"
          >
            <Box direction="column">
              <StyledBox
                // border="box"
                width="small"
                height="small"
                bgImage={excellogo}
                pad={"medium"}
                margin="small"
                style={{ backgroundSize: "70px" }}
                title="Import from Excel File"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                {/* From File */}
                <Anchor color={"grey"}>Excel File</Anchor>
              </StyledBox>
            </Box>
            <Box direction="column">
              <StyledBox
                width="small"
                // border="box"
                pad={"medium"}
                height="small"
                margin="small"
                bgImage={erplogo}
                onClick={() => handleERPNext()}
                title="Import from ERPNext"
              >
                {/* From ERPNext */}
                <Anchor color={"grey"}>Frappe ERP-Next</Anchor>
              </StyledBox>
            </Box>
          </Box>
          <Notification
            icon={<Icons.Info />}
            status="info"
            message={
              <small>
                Your Excel Sheet must have the following columns: <li> Name</li>
                <li> Code (Unique)</li>
                <li> Price</li>
                <li> Currency</li>
                <li> Quantity (number)</li>{" "}
              </small>
            }
          />
        </Box>
      )}

      {showEditModal ? (
        <Layer
          onClickOutside={() => setShowEditModal(false)}
          onEsc={() => setShowEditModal(false)}
        >
          <Box pad={"medium"} width={"xlarge"} height={"large"}>
            <Box className="actions" margin={"small"}>
              <Button
                onClick={() => setShowEditModal(false)}
                alignSelf="end"
                pad={"xsmall"}
                justify="end"
                style={{ border: "none" }}
                width={"small"}
                icon={
                  <Icons.Close width={"small"} size="small" color="default" />
                }
                label="close"
              ></Button>
            </Box>
            <Box pad={"small"}>
              <DataTable
                sortable
                columns={itemFields}
                title="Edit Imported Items"
                data={selectedItems}
                paginate={true}
              ></DataTable>
            </Box>
            <Box direction="row-responsive" justify="center">
              <Box
                direction="column"
                margin={"small"}
                style={{ marginTop: "20px" }}
                width={screenSize === "small" ? "large" : "small"}
              >
                <Button
                  label="Import"
                  primary
                  onClick={() => handleImportToServer()}
                ></Button>
              </Box>
              <Box
                direction="column"
                margin={"small"}
                style={{ marginTop: "20px" }}
                width={screenSize === "small" ? "large" : "small"}
              >
                <Button
                  label="cancel"
                  onClick={() => {
                    dispatchSelectedItems({ type: "reset" });
                    setShowEditModal(false);
                  }}
                ></Button>
              </Box>
            </Box>
          </Box>
        </Layer>
      ) : (
        ""
      )}
      {showConnectERP ? (
        <Layer
          onClickOutside={() => setShowConnectERP(false)}
          onEsc={() => setShowConnectERP(false)}
        >
          {showConfigureERP ? (
            <Box>
              <Header align="center" margin={"small"}>
                <Heading color={"default"} size="small">
                  Welcome {erpUser}
                </Heading>
                <Button
                  onClick={() => setShowConnectERP(false)}
                  alignSelf="end"
                  pad={"xsmall"}
                  justify="end"
                  style={{ border: "none" }}
                  width={"small"}
                  icon={
                    <Icons.Close width={"small"} size="small" color="default" />
                  }
                  label="close"
                ></Button>
              </Header>
              <Box align="center" justify="center">
                {/* <Paragraph
                > */}
                <b>Load Import Configuration</b>
                <Select
                  placeholder="Import Configuration Name"
                  defaultValue={importData.name}
                  onChange={(val) => handleSetImportConfig(val)}
                  options={userImportConfigs}
                ></Select>{" "}
                {/* </Paragraph> */}
              </Box>
              <Box
                margin={"medium"}
                style={{
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  scrollbarColor: "inherit",
                  scrollBehavior: "smooth",
                  scrollbarGutter: "revert-layer",
                }}
              >
                <Form
                  onChange={() => setCurrentConfigChanged(true)}
                  onSubmit={(nV) => {
                    setNewConfigSettings(nV.value);

                    if (currentConfigChanged) {
                      setShowSaveConfig(true);
                    } else {
                      handleSetupErpNext(nV.value);
                      setShowConnectERP(false);
                    }
                  }}
                >
                  <Box margin={"small"}>
                    <CheckBox
                      defaultChecked={importData.create_sales_invoice}
                      name="create_sales_invoice"
                      label="Create Sales Invoice On ERP-Next After Every  Order"
                    ></CheckBox>
                    <Box margin={"small"}>
                      <FormField
                        label="Import all Items to this Company"
                        name="destination_company"
                        defaultValue={importData.destination_company}
                        placeholder="Enter Company name"
                      />
                    </Box>
                    <Paragraph>
                      Check the boxes of item type(s) you want to import
                    </Paragraph>
                    <br />
                    <Box margin={"medium"} direction="row-responsive">
                      {/* <CheckBoxGroup  /> */}
                      <Box direction="column" margin={"small"}>
                        <CheckBox
                          name="all_items"
                          label="All items"
                          defaultChecked={importData.all_items}
                          ref={(el) => (importCheckBoxesRef.current[7] = el)}
                          style={{ margin: "6px" }}
                        ></CheckBox>
                        <CheckBox
                          name="is_stock_item"
                          ref={(el) => (importCheckBoxesRef.current[0] = el)}
                          defaultChecked={
                            importData.is_stock_item ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Stock Items"
                          style={{ margin: "6px" }}
                        ></CheckBox>{" "}
                        <CheckBox
                          name="is_sales_item"
                          ref={(el) => (importCheckBoxesRef.current[1] = el)}
                          className="import_checkValues"
                          defaultChecked={
                            importData.is_sales_item ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Sales Items"
                          style={{ margin: "6px" }}
                        ></CheckBox>
                      </Box>
                      <Box direction="column" margin={"small"}>
                        <CheckBox
                          ref={(el) => (importCheckBoxesRef.current[2] = el)}
                          name="is_purchase_item"
                          defaultChecked={
                            importData.is_purchase_item ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Purchase Items"
                          style={{ margin: "6px" }}
                        ></CheckBox>
                        <CheckBox
                          name="is_customer_provided_item"
                          ref={(el) => (importCheckBoxesRef.current[3] = el)}
                          defaultChecked={
                            importData.is_customer_provided_item ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Customer provided Items"
                          style={{ margin: "6px" }}
                        ></CheckBox>

                        <CheckBox
                          name="is_grouped_asset"
                          defaultChecked={
                            importData.is_grouped_asset ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Grouped Assets"
                          ref={(el) => (importCheckBoxesRef.current[4] = el)}
                          style={{ margin: "6px" }}
                        ></CheckBox>
                      </Box>

                      <Box direction="column" margin={"small"}>
                        <CheckBox
                          name="is_fixed_asset"
                          defaultChecked={
                            importData.is_fixed_asset ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          label="Fixed Assets"
                          ref={(el) => (importCheckBoxesRef.current[5] = el)}
                          style={{ margin: "6px" }}
                        ></CheckBox>
                        <CheckBox
                          name="is_sub_contracted_item"
                          defaultChecked={
                            importData.is_sub_contracted_item ||
                            importCheckBoxesRef.current[7]?.checked
                          }
                          ref={(el) => (importCheckBoxesRef.current[6] = el)}
                          label="Sub Contracted Items"
                          style={{ margin: "6px" }}
                        ></CheckBox>
                      </Box>
                      {/* </CheckBoxGroup> */}
                    </Box>
                    <FormField
                      label="Extra Fields"
                      info="Specify extra fields that you want in your item data or enter asterisk (*) to import all fields. Separate each field with a comma (e.g over_billing_allowance, end_of_life)"
                      name="extra_fields"
                      onChange={(e) => handleSetExtraFields(e.target.value)}
                      placeholder="Field names (comma separated) "
                      validateOn="change"
                      error={fieldError}
                    />
                    <FormField hidden name="type" value={"ERP"} />
                    {showSaveConfig ? (
                      <Layer
                        onClickOverlay={() => setShowSaveConfig(false)}
                        title="Save this  configuration as"
                        modal
                      >
                        <Box align="center" margin={"small"}>
                          <h3>Save configuration as</h3>
                        </Box>
                        {/* <DialogContent> */}{" "}
                        <Box margin={"medium"} width={"medium"}>
                          <FormField
                            // label="Enter new Configuration name or already existing name to be updated with new settings"
                            name="name"
                            onChange={(e) =>
                              (newConfigSettings.name = e.target.value)
                            }
                            defaultValue={importData.name}
                            placeholder="Configuration Name (existing name will be updated)"
                          />
                          <Box margin={"small"}>
                            <Button
                              label="Yes"
                              color={"green"}
                              style={{
                                float: "left",
                                width: "50&",
                                margin: "10px",
                              }}
                              secondary
                              onClick={() => handleSaveNewConfig(true)}
                            ></Button>
                            <Button
                              label="No"
                              color={"grey"}
                              onClick={() => handleSaveNewConfig(false)}
                              style={{
                                float: "right",
                                width: "50&",
                                margin: "10px",
                              }}
                              secondary
                            ></Button>
                          </Box>
                        </Box>
                        {/* </DialogContent> */}
                      </Layer>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box width={"large"}>
                    <Button
                      justify="center"
                      alignSelf="center"
                      pad={"small"}
                      type="submit"
                      size="small"
                      margin={"medium"}
                      primary
                      label="Proceed to Import"
                    ></Button>
                  </Box>
                </Form>
              </Box>
            </Box>
          ) : (
            <Form onSubmit={(nextVal) => handleConnectERPNext(nextVal.value)}>
              <Box className="actions" margin={"small"}>
                <Button
                  onClick={() => setShowConnectERP(false)}
                  alignSelf="end"
                  pad={"xsmall"}
                  justify="end"
                  style={{ border: "none" }}
                  width={"small"}
                  icon={
                    <Icons.Close width={"small"} size="small" color="default" />
                  }
                  label="close"
                ></Button>
              </Box>
              <Box pad={"small"} width={"medium"} height={"large"}>
                <Heading
                  textAlign="center"
                  margin={"none"}
                  color={"default"}
                  style={{ fontSize: "20px" }}
                >
                  {" "}
                  Connect Frappe ERP-Next{" "}
                </Heading>
                <Box margin={"small"}>
                  <Notification
                    message={
                      <>
                        <small>
                          <b>&#x2219;</b> Don't know how to generate your keys?
                          Click{" "}
                          <Anchor
                            target="_blank"
                            href="https://frappeframework.com/docs/user/en/api/rest"
                          >
                            Here
                          </Anchor>
                        </small>
                        <small>
                          <b> &#x2219;</b> Activate{" "}
                          <Anchor
                            target="_blank"
                            href="https://frappeframework.com/docs/user/en/basics/site_config"
                          >
                            CORS
                          </Anchor>{" "}
                          by adding SPOS url to the list of accepted origins in
                          your common_site_config.json file (e.g "allow_cors":
                          ["
                          {window.origin}"]){" "}
                        </small>
                      </>
                    }
                    status="info"
                  />{" "}
                </Box>

                <Box pad={"small"}>
                  <TextInput
                    name="api_key"
                    type="text"
                    style={{ borderBottom: "none" }}
                    required
                    placeholder="Enter Your API Key"
                  >
                    {/* <TextInput placeholder="API Key"></TextInput> */}
                  </TextInput>
                </Box>
                <Box pad={"small"}>
                  <TextInput
                    name="api_secret"
                    type="password"
                    style={{ borderBottom: "none", borderTop: "none" }}
                    required
                    placeholder="Enter Your API Secret Key"
                  >
                    {/* <TextInput placeholder="API Secret"></TextInput> */}
                  </TextInput>
                </Box>
                <Box pad={"small"}>
                  <TextInput
                    name="host_url"
                    type="url"
                    style={{ borderTop: "none" }}
                    required
                    placeholder="Enter ERP Host URL e.g https://myerpapp.com"
                  >
                    {/* <TextInput placeholder="Host URL / Base URL"></TextInput> */}
                  </TextInput>
                </Box>
                <Box
                  direction="row-responsive"
                  margin={"medium"}
                  justify="center"
                >
                  <Box
                    direction="column"
                    margin={"small"}
                    width={screenSize === "small" ? "large" : "small"}
                    // justify="start"
                  >
                    <Button label="Connect" type="submit" primary></Button>
                  </Box>
                  <Box
                    direction="column"
                    margin={"small"}
                    width={screenSize === "small" ? "large" : "small"}
                    // justify="end"
                  >
                    <Button
                      label="Cancel"
                      onClick={() => {
                        setShowConnectERP(false);
                      }}
                    ></Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Layer>
      ) : (
        ""
      )}
    </>
  );
};

const PackageSubscriptionSetup = (props) => {
const navigate = useNavigate()
  return (
    <>
      <Box
        margin={"medium"}
        align="center"
        alignContent="center"
        pad={"medium"}
        className="container"
        background={"box"}
      >
        <Box>
          <Heading size="medium" textAlign="center" color={"default"}>
            Setup Complete
          </Heading>

          <Paragraph textAlign="center">
            You can enjoy this product, it's free for now. made just for you!{" "}
            <br />
            <b
              title="Thank you (Igbo)"
              style={{
                textShadow: "2px solid purple ",
                color: "peru",
                fontSize: "18px",
                textDecorationColor: "gainsboro",
                textSizeAdjust: "auto",
                textDecorationStyle: "double",
              }}
            >
              dàálụ́
            </b>
          </Paragraph>
        </Box>
        <Box
          direction="row"
          margin={"small"}
          justify="center"
          alignContent="center"
          style={{ textAlign: "center" }}
        >
          <Button
            primary
            direction="column"
            icon={<Image width={"30px"} src="/default_images/dashboard.png" />}
            label="See Dashboard"
            style={{ padding: "10px", width: "200px", height: "100px" }}
            margin={"medium"}
            title="Account Dashboard"
            onClick={() => navigate("/dashboard")}
          >
            {" "}
          </Button>
          <Button
            margin={"medium"}
            primary
            pad={"large"}
            title="Point of Sales"
            direction="column"
            onClick={() => navigate("/pos")}
            style={{ padding: "10px", width: "200px", height: "100px" }}
            icon={
              <Image width={"30px"} src="/default_images/cashier.png"></Image>
            }
            label="Open POS"
          >
            {" "}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default function AccountSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const screenSize = React.useContext(ResponsiveContext);
  const [SetupSteps, setSetupSteps] = React.useState([
    { title: "Set Username", validated: false, Component: <UsernameSetup /> },
    { title: "Business", validated: false, Component: <CompanySetup /> },
    { title: "Sales Team", validated: false, Component: <AgentsSetup /> },
    {
      title: "Add Inventory",
      validated: false,
      Component: <InventorySetup />,
    },
    {
      title: "Finish",
      validated: false,
      Component: <PackageSubscriptionSetup />,
    },
  ]);

  const StyledHeaderContainer = styled.div`
    background-image: linear-gradient(
      to right,
      violet,
      indigo,
      blue,
      green,
      yellow,
      orange,
      red
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `;

  const validateStep = (index) => {
    // alert("validated");
    const steps = SetupSteps;

    let selected = steps[index];

    selected.validated = true;
    steps[index] = selected;
    setSetupSteps(steps);
    return true;
  };
  const handleNextStep = () => {
    // alert("next");
    if (!(currentStep + 1 >= SetupSteps.length)) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("step not valid");
      }
    }
  };

  const handleBackStep = () => {
    // alert("back");

    if (!currentStep <= 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSkipStep = () => {
    // alert("skiped")
    if (!(currentStep + 1 >= SetupSteps.length)) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Box
      className="auth-outlet"
      background={"box"}
      alignSelf={"center"}
      pad={"large"}
      width={"large"}
      round="small"
      border={{ color: "border", size: "medium", style: "double" }}
    >
      <Box gap="small" justify="center">
        <StyledHeaderContainer>
          <Heading size="small" alignSelf="center" margin={"none"} as={"h2"}>
            {" "}
            Account Setup.
          </Heading>
          Get ready for the unforgettable experience ahead!
        </StyledHeaderContainer>

        <Box title={"Account Setup"}>
          <Box width={"xsmall"} alignSelf="end" margin={"medium"}>
            <Button
              primary
              pad={"xsmall"}
              label="Skip"
              onClick={handleSkipStep}
              style={{
                display:
                  currentStep + 1 === SetupSteps.length ? "none" : "block",
              }}
            ></Button>
          </Box>

          <Box className="setup-steps" align="center" width={"large"}>
            <Stack style={{ marginBottom: "10px", marginTop: "20px" }}>
              <Cluster gap={"S"}>
                {SetupSteps.map((step, index) => (
                  <span key={index + 300}>
                    <Tag
                      key={index + 200}
                      onClick={() => setCurrentStep(index)}
                      border={{
                        color: currentStep >= index ? "green" : "grey",
                        round: "xxsmall",
                      }}
                      a11yTitle={step.title}
                      pad={"xxsmall"}
                      style={{ marginBottom: "10px" }}
                      value={<Text>{step.title}</Text>}
                    ></Tag>
                    {!(index + 1 === SetupSteps.length) ? (
                      <span
                        style={{
                          color: currentStep >= index ? "green" : "grey",
                        }}
                      >
                        -
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                ))}
              </Cluster>
            </Stack>
          </Box>

          <Box className="activeStep">{SetupSteps[currentStep].Component}</Box>

          <Box
            direction="row"
            width={"large"}
            margin={"medium"}
            className="step-controls"
          >
            <Box direction="column" style={{ marginRight: "30%" }}>
              <Button
                onClick={() => handleBackStep()}
                label="Back"
                primary
                disabled={currentStep <= 0 ? true : false}
              ></Button>
            </Box>
            <Box direction="column" style={{ marginLeft: "35%" }}>
              <Button
                primary
                style={{
                  display:
                    currentStep + 1 === SetupSteps.length ? "none" : "block",
                }}
                label="Next"
                onClick={() => handleNextStep()}
              ></Button>{" "}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
