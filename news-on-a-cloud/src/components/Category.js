import React from "react";
import Typography from "@material-ui/core/Typography";
import ArticleCard from "./ArticleCard";
import { Box, Grid, Divider } from "@material-ui/core";

export default function Category(props) {
  return (
    <Box>
      <Typography variant="h4" color="primary">{props.name}</Typography>
      <Grid container>
        {props.articles.map((article) => (
          <Grid item lg={3} style={{ paddingBottom: "15px" }}>
            <ArticleCard article={article}/>
          </Grid>
        ))}
      </Grid>
      <Divider/>
      <br/>
    </Box>
  );
}
