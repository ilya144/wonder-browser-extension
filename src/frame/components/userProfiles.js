/* global chrome */
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Link,
  Avatar,
} from "@material-ui/core";

const UserProfiles = ({ data, classes, ...props }) => {
  if (data.empty) return null;
  
  return(
    <Box>
      <Typography className={classes.gridTitle}>Профили</Typography>
      <Grid container direction="row" justify="flex-start" flexWrap="wrap">
        {
        data.data_truncated===undefined ? 
        Object.keys(data.linkmap).map(key => (
          data.linkmap[key].map(resource => (
          <Link 
            href={resource}
            target="_blank"
          >
            <Avatar
              src={chrome.extension.getURL("img/service_icons/") + key + ".png"}
              className={classes.resourceIcon}
            />
          </Link>
          ))
        )) : data.has_links.map(elem => (
          <Avatar
            src={chrome.extension.getURL("img/service_icons/") + elem + ".png"}
            className={classes.resourceIcon}
          />
        ))
        }
      </Grid>
    </Box>
  )
}

export default UserProfiles;