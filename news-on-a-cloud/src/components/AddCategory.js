import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AddCategory(props) {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCatergoryName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: categoryName})
    };
    fetch('/category', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    props.handleCategoryAdded();
    setOpen(false);
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} style={{float:"right"}}>
        Add Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >Add a new category</DialogTitle>
        <DialogContent>
        <TextField
              fullWidth
              required
              value={categoryName}
              name="categoryName"
              label="Name"
              onChange={e=>setCatergoryName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}