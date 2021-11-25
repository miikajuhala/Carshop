import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({brand: '', model: '', color: '', year: '', fuel: '', price: ''});

  const handleClickOpen = () => {
    console.log(props.car);
    //laittaa car olioo olemassa olevan auton infot ja lähetää ne + muokatut
    setCar({brand: props.car.brand, model: props.car.model, color: props.car.color,
            fuel: props.car.fuel, year: props.car.year, price: props.car.price });
    setOpen(true);
  }

  const handleClose = () => {
    //lähettää propsi auton self linkin millä päivittää + infot päivityksestä
    props.updateCar(props.car._links.self.href, car);
    setOpen(false);
  }

  const handleCancel = () => {
    //jos ei paineta save niin sulkee vaan popupin
    setOpen(false);
  }

  const inputChanged = (event) => {
    //laittaa siihen attribuuttiin infon mitä muokataan
    setCar({...car, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit existing car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            name="brand"
            value={car.brand}
            onChange={inputChanged}
            label="Brand"
            fullWidth
          />
          <TextField
            margin="dense"
            id="model"
            name="model"
            value={car.model}
            onChange={inputChanged}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            name="color"
            value={car.color}
            onChange={inputChanged}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            id="fuel"
            name="fuel"
            value={car.fuel}
            onChange={inputChanged}
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            id="year"
            name="year"
            value={car.year}
            onChange={inputChanged}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            value={car.price}
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