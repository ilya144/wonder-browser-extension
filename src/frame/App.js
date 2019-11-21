import React, {useState} from 'react';
import { StylesProvider } from "@material-ui/styles";
import { Container, Fab, Box } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";

import Header from "./components/header";
import User from "./components/user";
import Footer from "./components/footer";
import Short from "./components/short";
import NotFound from "./components/notFound";

const App = ({ jss, ...props }) => {
    const [isOpened, setOpen] = useState( props.data.empty ? false : true );
    const [open, close] = [
        () => setOpen(true),
        () => setOpen(false)
    ];

    if (isOpened) {
      props.setSize("408px", "100vh");
      props.setTop("0");
    } else {
      props.setSize("75px", props.data.empty ? "132px" : "70vh");
      props.setTop("30vh");
    }
    
    return (
        <StylesProvider jss={jss}>
        <Container
            maxWidth="xs"
            style={{
                minHeight: isOpened ? "600px" : "",
        
                backgroundColor: "#fff",
                padding: "0",
                height: isOpened ? "100vh" : props.data.empty ? "" : "100vh",
                overflow: "hidden",
        
                maxWidth: "375px",
                boxShadow: "0 0 10px rgba(0, 0, 0.1, 0.5)"
            }}
        >
        {isOpened ? (
          <Box>
            <Header />
            {props.data.empty ? <NotFound data={props.data} /> : <User data={props.data} />}
            <Box style={{ minHeight: "300px" }}>
              <Fab
                aria-label="add"
                // className={classes.closeBtn}
                onClick={close}
                style={{
                  position: "absolute",
                  right: "-28px",
                  top: "55vh",
                  backgroundColor: "#fff"
                }}
              >
                <ArrowLeft />
              </Fab>
            </Box>
            <Footer 
              data_truncated={props.data.data_truncated}
              url={props.data.url}
              data={props.data}
            />
          </Box>
        ) : (
          <Short open={open} data={props.data} />
        )}
      </Container>
      </StylesProvider>
    );
}

export default App;