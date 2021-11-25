import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Addcar(props) {
  const [open, setOpen] = useState(false);
  const [car1, setCar1] = useState({brand: '', model: '', color: '', year: '', fuel: '', price: ''});

  const handleClickOpen = () => {
    console.log(props.car)
    if(props.car != null){
    setCar1({brand: props.car.brand, model: props.car.model, color: props.car.color,
      fuel: props.car.fuel, year: props.car.year, price: props.car.price })
    }
    setOpen(true);
  }

  const handleClose = () => {
    props.addCar(car1);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCar1({...car1, [event.target.name]: event.target.value});
  }

  return(
    <div>
      {props.car != null && <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Quick add similar
      </Button>}

      {props.car == null && <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add car
      </Button>}

      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            name="brand"
            value={car1.brand}
            onChange={inputChanged}
            label="Brand"
            fullWidth
          />
          <TextField
            margin="dense"
            id="model"
            name="model"
            value={car1.model}
            onChange={inputChanged}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            name="color"
            value={car1.color}
            onChange={inputChanged}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            id="fuel"
            name="fuel"
            value={car1.fuel}
            onChange={inputChanged}
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            id="year"
            name="year"
            value={car1.year}
            onChange={inputChanged}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            value={car1.price}
            onChange={inputChanged}
            label="Price (€)"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>    
    </div>
  )
}