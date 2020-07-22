import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src="/articleImg/wi-fi-512.png" alt="." style={{height:"90px"}}/>
          <Typography variant="h3" className={classes.title} style={{marginLeft: '10px', marginTop:'30px'}}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              News on a Cloud
            </Link>
          </Typography>

          <Link to="/admin" style={{ float: "right" }}>
            <Tooltip title="admin">
              <IconButton color="default" size="medium">
                <PersonIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
