import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 330,
    minWidth: 330
  },
  media: {
    height: 140,
  },
});

export default function ArticleCard(props) {
  const classes = useStyles();

  return (
    <Link to={"/" + props.article.id} style={{ textDecoration: "none" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={"/articleImg/" + props.article.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.article.content}
            </Typography>
            <Divider style={{ marginTop: "5px" }} />

            <Typography
              variant="caption"
              color="textSecondary"
              style={{ display: "flex", marginTop: "5px" }}
            >
              <AccessTime
                fontSize="small"
                color="disabled"
                style={{ marginRight: "5px" }}
              />
              {props.article.writer + ", " + (new Date(props.article.time)).toLocaleDateString('en-GB')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
