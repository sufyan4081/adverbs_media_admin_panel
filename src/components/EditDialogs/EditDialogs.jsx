import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import AddBlogForm from "../../scenes/addBlog/AddBlogForm";
import AddVlogForm from "../../scenes/addVlog/AddVlogForm";
import AddCertificateForm from "../../scenes/addCertificate/AddCertificateForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" ref={ref} {...props}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {props.children}
      </div>
    </Slide>
  );
});

// Map table names to corresponding form components
const formComponents = {
  Blog: AddBlogForm,
  Vlog: AddVlogForm,
  Certificate: AddCertificateForm,
};

export default function EditDialogs({
  open,
  onClose,
  formData,
  title,
  tableName,
  subscriptionDetails,
}) {
  // Get the corresponding form component based on the tableName
  const FormComponent = formComponents[tableName];
  React.useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <Dialog
        fullWidth={false}
        maxWidth="md"
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        data-aos="fade-left"
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#20209f" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, fontSize: "1.5rem" }}
              variant="h6"
              component="div"
            >
              Edit {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ margin: "20px" }} data-aos="fade-left">
          {FormComponent && (
            <FormComponent
              formData={formData}
              subscriptionDetails={subscriptionDetails && subscriptionDetails}
            />
          )}
        </Box>
      </Dialog>
    </div>
  );
}
