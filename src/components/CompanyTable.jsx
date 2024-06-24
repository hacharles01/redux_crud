import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addData, deleteData, fetchData, updateData } from '../actions/action';

function CompanyTable() {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'address', name: 'Address' },
        { id: 'type', name: 'Company Type' },
        { id: 'action', name: 'Action' },
    ];

    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.company);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [popuptitle, setPopUpTitle] = useState('');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    // Log data to console
    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if data is an array before rendering
    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return <div>Data is not available</div>;
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setType('Public');
    };
    
    const handleClose = () => {
        setOpen(false);
        // Clear form fields when dialog is closed for adding new data
        if (!popuptitle) {
            clearForm();
        }
    };
    
    const handleOpen = (company) => {
        if (company) {
            // Set dialog title to 'Update Data Please'
            setPopUpTitle(company);
            // Set form fields with data of selected company
            setId(company.id);
            setName(company.name);
            setEmail(company.email);
            setPhone(company.phone);
            setAddress(company.address);
            setType(company.type);
        } else {
            // Clear dialog title and form fields for adding new data
            setPopUpTitle('');
            clearForm();
        }
        setOpen(true);
    };
    

    const handleAdd=()=>{
 setOpen(true);
 clearForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Extract data from form fields
        const newData = { name, email, phone, address, type };
        if (popuptitle) {
            newData.id = popuptitle.id;
            dispatch(updateData(newData))
                .then(() => {
                    toast.success("Data Updated Successfully!!");
                    setOpen(false);
                })
                .catch((error) => {
                    toast.error("Failed To Update Data");
                })
        } else {
            // Dispatch action to add new data
            dispatch(addData(newData))
                .then(() => {
                    toast.success("Data Added Successfully!!!");
                    setOpen(false); // Close the dialog
                })
                .catch((error) => {
                    toast.error("Failed To Add Data");
                });
        };

    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this data?")
        if (isConfirmed) {
            dispatch(deleteData(id))
                .then(() => {
                    toast.success("Data Deleted Successfully!!!"); // Corrected typo
                })
                .catch((error) => {
                    toast.error("Failed To Delete Data");
                })
        }
    };

    return (
        <div>
            <h1>Welcome To My Site</h1>
            <Paper>
                <Button variant='contained' onClick={handleAdd}>Add New(+)</Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} style={{ color: 'white' }}>
                                        {column.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.id}</TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.email}</TableCell>
                                    <TableCell>{company.phone}</TableCell>
                                    <TableCell>{company.address}</TableCell>
                                    <TableCell>{company.type}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="info" onClick={() => handleOpen(company)} >Read</Button>
                                        <Button variant="contained" color="primary"  onClick={() => handleOpen(company)} style={{ margin: '0 5px' }}>Edit</Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(company.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>{popuptitle ? ' Update Data Please' : 'ADD Data Please'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} sx={{ margin: 2 }}>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" />
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                            <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone" />
                            <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Address" />
                            <RadioGroup value={type} onChange={(e) => setType(e.target.value)} row>
                                <FormControlLabel value="Public" control={<Radio />} label="Public" />
                                <FormControlLabel value="Private" control={<Radio />} label="Private" />
                                <FormControlLabel value="Government" control={<Radio />} label="Government" />
                            </RadioGroup>
                            <Button variant='contained' type='submit'>Submit</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

export default CompanyTable;
