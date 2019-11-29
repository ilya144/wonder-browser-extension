import { makeStyles } from "@material-ui/core/styles";


const UserStyles = makeStyles(theme => ({
  userAvatar: {
    width: 60,
    height: 60
  },
  userGrid: {
    marginLeft: "20px",
    height: "100%",
    flexWrap: "nowrap"
  },
  divider: {
    margin: "10px 0"
  },
  gridText: {
    fontSize: "0.91em"
  },
  gridTitle: {
    color: "#000000", // color: "#47a5fd",
    fontWeight: 460,
    marginBottom: "10px",
    marginTop: "15px",
    textAlign: "start"
  },
  eye: {
    color: "#fff" // color: "#8f2bca",
  },
  leftIcon: {
    color: "#727272"
  },
  typoMail: {
    textDecoration: "underline"
  },
  resourceIcon: {
    width: "25px",
    height: "25px",
    margin: "8px",
    "&:hover, &:focus": {
      cursor: "pointer"
    }
  },
  contactsBtn: {
    marginTop: "10px"
  }
}));

export default UserStyles;