/* global chrome */
import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import UserAvatar from './userAvatar';
import UserContacts from './userContacts';
import UserProfiles from './userProfiles';
import UserStyles from './userStyles';


const User = ({ data, ...props }) => {
  const classes = UserStyles();

  const [Contacts, setContacts] = useState(
    data.has_contacts.reduce((obj, elem) => Object.assign({}, { [elem]: null }, obj), {})
  );
  const [ContactsBtn, setContactsBtn] = useState(true);

  const fetchContacts = (id) => {
    chrome.runtime.sendMessage({
      "type": "contacts",
      "id": id
    }, (response) => {
      const json_data = response.contacts ? response.contacts : null;
      if (json_data){
        setContacts(
          data.has_contacts.reduce((obj, elem) => Object.assign(
            {}, 
            { [elem]: json_data[elem] ? json_data[elem][0] : null }, obj
            ), {})
        );
      }
    });
  }

  return (
    <Box p="12px">
      <UserAvatar 
        classes={classes}
        data={data}
      />
      {
        data.status==="unauthorized" ? (
          <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" justifyContent="center">
                  <Typography style={{color: "#000000"}}>Вы не авторизированы</Typography>
                  <PriorityHighIcon style={{color: "red"}} />
              </Box>
              <Button color="primary" target="_blank" href="https://wondersourcing.ru/users/sign_in" style={{color: "#3f51b5!important"}} >
                  Войти
              </Button>
          </Box>
        ) : null
      }
      <UserContacts 
        classes={classes}
        Contacts={Contacts}
        data={data}
      />
      {
        data.data_truncated===undefined ? (
          <Button 
            variant="outlined"
            className={classes.contactsBtn}
            style={ContactsBtn ? {display: "block"} : {display: "none"}}
            onClick={() => {
              fetchContacts(data.id);
              setContactsBtn(false);
            }}
          >
            Показать контакты
          </Button>
        ) : null
      }
      <UserProfiles 
        data={data}
        classes={classes}
      />
    </Box>
  );
};

export default User;