import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Editcar from './Editcar';
import axios from 'axios';


//lähes sama kun esimerkki, + axios ja omaa ymmärtämistä selkeyttävä logiikka + kommentit
export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');


  const url="https://carstockrest.herokuapp.com"

  useEffect(() => {
    getCars();
  }, [])

  const getCars = () => {
    axios.get(url+"/cars")
    .then(response => response.data)
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(link)
      .then(_ => getCars())
      .then(_ => {
        setMsg('Car deleted');
        setOpen(true);
      })
      .catch(err => console.error(err))
    }
  }

  const addCar = (car1) => {
    axios.post(url+'/cars',{
      //voi ehkä tehdä data.body: JSON.stringify(car1)
        brand: car1.brand,  
        model: car1.model,  
        color: car1.color,  
        fuel: car1.fuel,  
        year: car1.year,    
        price: car1.price 
      }
    )  
    .then(_ => getCars())
    .then(_ => {
      setMsg('New car added');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }

  const updateCar = (link, car1) => {
    axios.put(link, {
      brand: car1.brand,  
      model: car1.model,  
      color: car1.color,  
      fuel: car1.fuel,  
      year: car1.year,    
      price: car1.price 
    })
    .then(_ => getCars())
    .then(_ => {
      setMsg('Car updated');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
    {
      Header: 'Brand',
      accessor: 'brand' // accessor is the "key" in the data
    },
    {
      Header: 'Model',
      accessor: 'model' // accessor is the "key" in the data
    },    
    {
      Header: 'Color',
      accessor: 'color'  // accessor is the "key" in the data
    }, 
    {
      Header: 'Year',
      accessor: 'year'  // accessor is the "key" in the data
    },    
    {
      Header: 'Fuel',
      accessor: 'fuel'  // accessor is the "key" in the data
    },
    {
      Header: 'Price (€)',
      accessor: 'price'  // accessor is the "key" in the data
    },
    {
      //ottaa row.original saa siitä infot rivin car objectista
      Cell: row => (<Editcar car={row.original} updateCar={updateCar} />)
    },
    {
      accessor: '_links.self.href',  // accessor is the "key" in the data
      filterable: false,
      sortable: false,
      minWidth: 90,
      //tässä row.value vittaa "accessor" valueen mikä on auton self url
      Cell: row => (<Button color="secondary" size="small" onClick={() => deleteCar(row.value)}>Delete Car: {row.value.slice(-1)}</Button>)
    },{
      
      filterable: false,
      sortable: false,
      minWidth: 90,

      Cell: row => (<Addcar car={row.original} addCar={addCar}> add similar</Addcar>)
    }
  ]

  return(
    <div>
      <Addcar addCar={addCar}/>
      {/* https://www.npmjs.com/package/react-table-v6 */}
      <ReactTable filterable={true} defaultPageSize={15} 
        data={cars} columns={columns} />
      <Snackbar open={open} autoHideDuration={3000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}