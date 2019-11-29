import React, { Fragment } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Grid,
} from '@material-ui/core'


const UserAvatar = ({ data, classes, ...props }) => {
  const normalizeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  }

  return(
    <Box display="flex" alignItems="center" m="10px" height="64px">
      <Avatar
        className={classes.userAvatar}
        src={data.empty ? "" : data.main_avatar}
      />
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        className={classes.userGrid}
      >
        {
          data.empty ? (
            <Typography variant="h6">
                Пользователь не найден
            </Typography>
          ) : (
            <Fragment>
              <Typography variant="h6">
                {
                  data.data_truncated===undefined ?
                  (
                    normalizeName(data.first_name)+" "+normalizeName(data.last_name)
                  ) : (
                    data.display_name
                  )
                }
              </Typography>
              <Typography 
                  className={classes.gridText} 
                  style={{
                      filter: data.data_truncated===undefined ? "none" : "blur(3px)"
                  }}
              >
                  {data.city+", "+data.country}
              </Typography>
            </Fragment>
          )
        }
      </Grid>
    </Box>
  )
}

export default UserAvatar;