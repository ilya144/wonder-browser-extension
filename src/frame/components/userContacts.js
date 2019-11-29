import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Divider,
    // Icon,
} from "@material-ui/core";
import { PhoneInTalk, Email, Telegram, Visibility } from "@material-ui/icons";
import Skype from './skype';


const UserContacts = ({ classes, Contacts, data, ...props}) => {

  return(
    <Box>
      <Typography className={classes.gridTitle}>Контакты</Typography>
      <Grid>
      { data.has_contacts.includes("phone") ? (
        <Grid container direction="row" justify="space-between">
          <PhoneInTalk className={classes.leftIcon} />
          <Typography style={{ filter: Contacts.phone ? "" : "blur(3px)" }}>
            {Contacts.phone ? Contacts.phone : "+7 (000) 123 45 09"}
          </Typography>
          <Visibility className={classes.eye} />
        </Grid>
      ) : null}

      { data.has_contacts.includes("phone") && data.has_contacts.length>1 ? (
        <Divider className={classes.divider} />
      ) : null}

      { data.has_contacts.includes("email") ? (
        <Grid container direction="row" justify="space-between">
          <Email className={classes.leftIcon} />
          <Typography
          className={classes.typoMail}
          style={{ filter: Contacts.email ? "" : "blur(3px)" }}
          >
            {Contacts.email ? Contacts.email : "client@email.com"}
          </Typography>
          <Visibility className={classes.eye} />
        </Grid>
      ) : null}

      { data.has_contacts.includes("email") && data.has_contacts.length>2 ? (
        <Divider className={classes.divider} />
      ) : null}

      { data.has_contacts.includes("telegram") ? (
        <Grid container direction="row" justify="space-between">
          <Telegram className={classes.leftIcon} />
          <Typography style={{ filter: Contacts.telegram ? "" : "blur(3px)" }}>
            {Contacts.telegram ? Contacts.telegram : "@nickname"}
          </Typography>
          <Visibility className={classes.eye} />
        </Grid>
      ) : null}

      { data.has_contacts.includes("telegram") && data.has_contacts.length>3 ? (
        <Divider className={classes.divider} />
      ) : null}

      { data.has_contacts.includes("skype") ? (
        <Grid container direction="row" justify="space-between">
          {/* <Icon className={classes.leftIcon}>
            <Skype />
          </Icon> */}
          <Skype className={classes.leftIcon}/>
          <Typography style={{ filter: Contacts.skype ? "" : "blur(3px)" }}>
            {Contacts.skype ? Contacts.skype : "skype_login"}
          </Typography>
          <Visibility className={classes.eye} />
        </Grid>
      ) : null}
      </Grid>
    </Box>
  )
}

export default UserContacts;