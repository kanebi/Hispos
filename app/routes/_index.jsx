import { Email, Phone, Send } from "@rsuite/icons";
import {
  Box,
  Button,
  FormField,
  Header,
  Text,
  TextArea,
  Layer,
  TextInput,
  Heading,
  ResponsiveContext,
} from "grommet";
import styled from "../components/styled";
import React from "react";
import {
  Avatar,
  Navbar,
  Nav,
  Container,
  IconButton,
  CustomProvider,
  Stack,
  Affix,
  Message,
} from "rsuite";
import { toast } from "react-toastify";
import patternImg from "../../public/default_images/pattern.png";
import { ThemeContext, useTheme } from "styled-components";
import webLogo from "../../public/default_images/logo.png";
import {Form, useActionData} from "@remix-run/react"
import { redirect,json } from "@remix-run/node";



export async function action({ request }) { 
const body = await request.formData();
const data = Object.fromEntries(body)
  return json({ error: true, message: "Invalid Email", ...data });

  


  // console.log(data);
  
  
}

export async function loader() {
  return json({});
}
export default function Index(props) {
  const [contact, setContact] = React.useState(false);
  const [contactMessage, setContactMessage] = React.useState("");
  const screenSize = React.useContext(ResponsiveContext);
  const actionData = useActionData()
  
  
  React.useEffect(()=>{
  console.log(actionData)
  
  }, [])
  const sender = {
    
    margin: "0.4em",
    // float:"right",
  };

  const receiver = {

    display: "flex",
    
    margin: "0.4em",
    alignSelf:"end", justifySelf:"end", alignItems:"end", alignContent:"end"
  };
  const senderMsg = {
    background: "rgba(88, 76, 110, 0.55)",
    width: "50%",
    height: "75%",
    borderRadius: "0.3em",
    position: "relative",
    // textAlign: "left",
    padding: "20px",

    boxShadow: "1px 1px 12px rgba(0, 0, 0, 0.1)",
  };

  const receiverMsg = {
    background: "rgba(108, 140, 132, 0.55)",
    width: screenSize ==="small"?"80%" :"500px",
    
    // textAlign: "right",
    height: "75%",
    padding:"20px",
    borderRadius: "0.3em",
    position: "relative",
    boxShadow: "1px 1px 12px rgba(0, 0, 0, 0.1)",
  };
  const senderAvatar = {margin:"2.0px"};

  const receiverAvatar = {};

  async function sendMail({ data }) {
   
  }
  function handleSendMessage(val) {
    console.log(val);
    const mail = sendMail({ data: {} });

    mail.catch(toast.error("Error occured while sending your message!"));

    setContact(false);
  }

  const StyledContainer = styled(Container)`
    background-repeat: repeat;
    background-size: 200px 100px;
  `;
  return (
    <Box>
      <StyledContainer
        style={{
          margin: screenSize === "small" ? "0 auto" : "10px auto",
          marginBottom: "0px",
          width: screenSize === "small" ? "100%" : "70%",
          overflow: "auto",
          padding: screenSize === "small" ? "10px" : "50px",
          backgroundImage: `url(${patternImg})`,
          borderRadius: "10px",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 100px",
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        <Header
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "rgba(114, 83, 120, 0.35) 0px -50px 36px -28px inset",
          }}
          sticky="scrollup"
        >
          <Box>
            <Stack spacing={2}>
              <Avatar circle src={webLogo}></Avatar>
              <Heading color="default" as="h4" size="xsmall">
                HisPOS
              </Heading>{" "}
            </Stack>
          </Box>{" "}
          <Navbar style={{ backgroundColor: "inherit" }}>
            {" "}
            <Stack spacing={4}>
              <IconButton
                style={{ marginRight: "10px" }}
                icon={<Email />}
                onClick={() => window.open("mailto:hispos.info@gmail.com")}
              ></IconButton>

              <IconButton
                icon={<Phone />}
                onClick={() => window.open("tel:+2348138682705")}
              ></IconButton>
            </Stack>{" "}
          </Navbar>
        </Header>

        <Container className="Msg-box" style={{ marginBottom: "100px" }}>
          <Box style={sender}>
            <Avatar circle style={senderAvatar}>
              Me
            </Avatar>
            <Text style={senderMsg}>Hi...</Text>
          </Box>

          <Box style={receiver}>
            <Text style={receiverMsg}>Hello! Welcome to our crib 😉 </Text>
          </Box>
          <Box style={sender}>
            <Avatar circle style={senderAvatar}>
              Me
            </Avatar>
            <Text style={senderMsg}>tnx! what's going on here?</Text>
          </Box>

          <Box style={receiver}>
            <Text style={receiverMsg}>
              Oh dear! Something you'd find very useful soon...😊{" "}
            </Text>
          </Box>
          <Box style={sender}>
            <Avatar circle style={senderAvatar}>
              Me
            </Avatar>
            <Text style={senderMsg}>hmmn.... Tell me more 😊?</Text>
          </Box>

          <Box style={receiver}>
            <Text style={receiverMsg}>
              Sure!
              <section>
                <h2>So, Guess What We're Up To?</h2>
                <p>
                  We've got something super cool in the works – it's a Point of
                  Sales (POS) machine that's going to change the game.
                </p>
              </section>
              <section>
                <h2>Geeky Stuff Alert: ERP Integration</h2>
                <p>
                  Here's the kicker: our POS machine plays nice with Frappe
                  ERP-Next right now, and down the line, we're planning to make
                  it work with even more ERPs. So, your business stays ahead of
                  the curve!
                </p>
              </section>
              <section>
                <h2>Get Ready for User Dashboards Galore</h2>
                <p>
                  Oh, and we're not stopping there. We're whipping up some user
                  dashboards that let you easily keep an eye on your sales,
                  sales teams, payments, orders, inventory – you name it. It's
                  like having a superpower for your business management!
                </p>
              </section>
              <section>
                <h2>One Account to Rule Them All</h2>
                <p>
                  But here's the kicker – you can use this software across all
                  your different stores, and it's all managed under just one
                  account. Yep, you read that right. Say goodbye to the headache
                  of juggling multiple accounts!
                </p>
              </section>
              <p>
                Excited? You should be! Ready to jump on board?{" "}
                <a onClick={() => setContact(true)}>Hit us up</a> and let's chat
                more about this awesomeness!
              </p>
            </Text>
          </Box>
        </Container>
        {actionData?.values?.error && (
          <Message type="error">
            Sorry An Error Occured While Sending Your Message :{" "}
            {actionData?.values?.message}
          </Message>
        )}
        {actionData?.values?.success && (
          <Message type="success">
            Your Message Wass SuccessFully Sent, Thank you for your time.
          </Message>
        )}
        {contact && (
          <Layer onClickOutside={() => setContact(false)}>
            <Box height={"large"} pad={"small"} width={"large"}>
              <Heading
                as="h1"
                size="medium"
                margin={"small"}
                alignSelf="center"
                color={"default"}
                textAlign="center"
              >
                Leave us a message
              </Heading>

              <Form method="post">
                <FormField name="full_name" label={"Full Name"}>
                  <TextInput
                    required
                    name="full_name"
                    placeholder="e.g James Bruke"
                  ></TextInput>
                </FormField>
                <FormField name="email" type="email" label={"Email"}>
                  <TextInput
                    placeholder="e.g Jamesb@domain.com"
                    required
                    type="email"
                    name="email"
                  ></TextInput>
                </FormField>
                <FormField name="message" type="text" label={"Message"}>
                  <TextArea
                    placeholder="Talk to us..."
                    required
                    name="message"
                    defaultValue={contactMessage}
                    rows={5}
                  ></TextArea>
                </FormField>
                <Button type="submit" label="Send Message"></Button>
              </Form>
            </Box>
          </Layer>
        )}
      </StyledContainer>
      <Container
        style={{
          bottom: "-10px",
          position: "fixed",
          width: screenSize === "small" ? "100%" : "70%",
          padding: screenSize === "small" ? "10px" : "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Box
          background={"box"}
          style={{ overflow: "hidden", height: "100px", borderRadius: "4px" }}
        >
          <Box
            background={"box"}
            alignSelf="start"
            style={{ width: "80%", display: "inline-flex" }}
          >
            <TextInput
              style={{ border: "none", height: "100px", outline: "none" }}
              // value={contactMessage}
              onChange={(e) => {
                setContactMessage(e.target.value);
              }}
              placeholder="Drop Us A Message..."
            ></TextInput>
          </Box>
          <Box style={{ position: "absolute", right: "0", height: "inherit" }}>
            <IconButton
              style={{
                width: "inherit",
                padding: "43px",
                marginRight: screenSize === "small" ? "20px" : "52px",
                height: "inherit",
              }}
              onClick={() => setContact(true)}
              icon={<Send />}
            ></IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
