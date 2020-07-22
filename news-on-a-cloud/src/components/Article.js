import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import AccessTime from "@material-ui/icons/AccessTime";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.6)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
      paddingRight: 0,
    },
  },
}));

export default function Article(props) {
  const classes = useStyles();
  const articleID = props.match.params.id;
  const [loading, setLoading] = React.useState(true);
  const [article, setArticle] = React.useState();

  React.useEffect(() => {
    const apiUrl = `http://localhost:8080/articles/${articleID}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setArticle(res[0]);
        setLoading(false)
      });
  }, []);

  return (
    <Box>
      {loading? "Loading" : (<>
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(articleImg/${article.img})`,
          minHeight: "300px",
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={"articleImg/" + article.img}
            alt={articleID}
          />
        }
        <div className={classes.overlay} />
        <Grid container style={{ position: "absolute", bottom: "0" }}>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {article.title}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Box p={4}>
        <Grid container>
          <Grid item lg={12}>
            <Typography variant="h6" paragraph>
              {article.content}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ display: "flex", marginRight: "15px" }}
            >
              <AccessTime
                fontSize="small"
                color="disabled"
                style={{ marginRight: "5px" }}
              />
              {(new Date(article.time)).toLocaleDateString('en-GB')}
            </Typography>
          </Grid>
          <Grid item >
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ display: "flex", marginRight: "15px"}}
            >
              <CreateIcon
                fontSize="small"
                color="disabled"
                style={{ marginRight: "5px" }}
              />
              {article.writer}
            </Typography>
          </Grid>
          <Grid item >
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ display: "flex",  marginRight: "15px" }}
            >
              <VisibilityIcon
                fontSize="small"
                color="disabled"
                style={{ marginRight: "5px" }}
              />
              {article.views}
            </Typography>
          </Grid>
          <Grid item lg={12} style={{marginTop: "15px"}}>
            <Typography variant="body1">{article.body}</Typography>
          </Grid>
        </Grid>
      </Box></>)}
    </Box>
  );
}

Article.propTypes = {
  article: PropTypes.object,
};
