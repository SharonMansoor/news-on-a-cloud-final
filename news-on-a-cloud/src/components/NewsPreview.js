import React from "react";
import Category from "./Category";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function NewsPreview() {
  const [appState, setAppState] = React.useState({
    loading: true,
    articles: null,
  });
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState(null);
  const [newsDispalyed, setNewsDisplayed] = React.useState(appState.articles);

  React.useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `/articles`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        const result = res.reduce((r, a) => {
          r[a.category] = [...(r[a.category] || []), a];
          return r;
        }, {});
        console.log(result);
        setNewsDisplayed(result);
        setAppState({ loading: false, articles: result });
      });
  }, []);

  React.useEffect(() => {
    let result = {};
    if (categoryFilter !== "") {
      result[categoryFilter] = appState.articles[categoryFilter];
    } else {
      result = appState.articles;
    }
    setNewsDisplayed(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, dateFilter]);

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <Box px={4}>
        {appState.loading ? (
          "loading"
        ) : (
          <>
            <Grid
              container
              justify="flex-end"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item md={2}>
                <FormControl fullWidth style={{ marginBottom: "8px" }}>
                  <InputLabel id="filterCategory">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="filterCategory"
                    value={categoryFilter}
                    onChange={(event) => {
                      setCategoryFilter(event.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {Object.keys(appState.articles).map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Date"
                    value={dateFilter}
                    onChange={(date) => {
                      setDateFilter(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            {Object.keys(newsDispalyed).map((category) => (
              <Category
                name={category}
                articles={
                  dateFilter
                    ? newsDispalyed[category].filter((article) => {
                        var articleDate = new Date(article.time);
                        return (
                          articleDate.getFullYear() ===
                            dateFilter.getFullYear() &&
                          articleDate.getMonth() === dateFilter.getMonth() &&
                          articleDate.getDate() === dateFilter.getDate()
                        );
                      })
                    : newsDispalyed[category]
                }
              />
            ))}
          </>
        )}
      </Box>
    </div>
  );
}
