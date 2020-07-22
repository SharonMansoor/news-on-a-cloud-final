import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  Grid,
  Fab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from "@material-ui/icons/Add";
import AddCategory from "./AddCategory";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddArticle() {
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState();
  const { register, control, handleSubmit } = useForm();
  const [categoryAdded, setCategoryAdded] = React.useState(false);
  const [openSuccessSnackBar, setSuccessOpenSnackBar] = React.useState(false);
  const [openFailSnackBar, setFailOpenSnackBar] = React.useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpenSnackBar(false);
    setFailOpenSnackBar(false);
  };

  const onSubmit = (data) => {
    console.log(data);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('/articles', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.rowCount === 1){
            setSuccessOpenSnackBar(true);
          }else{
            setFailOpenSnackBar(true);
          }
        })
        .catch((e)=> setFailOpenSnackBar(true));
  };

  React.useEffect(() => {
    const apiUrl = `/category`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res);
        setCategoryAdded(false);
        setLoading(false);
      });
  }, [categoryAdded]);

  function handleCategoryAdded(){
    setCategoryAdded(true);
  }

  return (
    <Box px={15} py={4}>
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Add a new Article
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              name="title"
              label="Title"
              inputRef={register}
            />
          </Grid>
          <Grid item md={6} />
          <Grid item md={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              name="writer"
              label="Writer"
              inputRef={register}
            />
          </Grid>
          <Grid item md={6}>
            {loading ? (
              "Loading"
            ) : (
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="categoryLabel">Category</InputLabel>
                <Controller
                  as={
                    <Select                      
                      id="category"
                      labelId="categoryLabel"
                      label="Catrgory"
                    >
                      {categories.map((category) => (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="category"
                />
              </FormControl>
            )}
          </Grid>
          <Grid item md={12}>
            <AddCategory handleCategoryAdded={handleCategoryAdded}/>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              required
              variant="outlined"
              multiline
              rows={3}
              name="content"
              label="Content"
              inputRef={register}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              required
              variant="outlined"
              multiline
              rows={10}
              name="body"
              label="Article Body"
              inputRef={register}
            />
          </Grid>
          <Grid item md={12}>
            <Fab
              type="submit"
              color="primary"
              aria-label="add"
              style={{ float: "right" }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
      <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={openSuccessSnackBar}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert onClose={handleSnackBarClose} severity="success">
            Added article successfully
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={openFailSnackBar}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert onClose={handleSnackBarClose} severity="error">
            Somthing went wrong, Please try again
          </Alert>
        </Snackbar>
    </Box>
  );
}
