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
    const [nextId, setNextId] = useState(1); // Initialize the next ID to 1

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    useEffect(() => {
        if (data && data.length > 0) {
            // Find the maximum ID in the data array
            const maxId = Math.max(...data.map(item => parseInt(item.id)));
            // Set the next ID to be used for new entries
            setNextId(maxId + 1);
        }
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
        if (!popuptitle) {
            clearForm();
        }
    };

    const handleOpen = (company) => {
        if (company) {
            setPopUpTitle(company);
            setId(company.id);
            setName(company.name);
            setEmail(company.email);
            setPhone(company.phone);
            setAddress(company.address);
            setType(company.type);
        } else {
            setPopUpTitle('');
            clearForm();
            // If it's an edit action, modify the title accordingly
            setPopUpTitle('Update Data Please');
        }
        setOpen(true);
    };

    const handleAdd = () => {
        setOpen(true);
        clearForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { id: nextId, name, email, phone, address, type };
        if (popuptitle) {
            newData.id = popuptitle.id;
            dispatch(updateData(newData))
                .then(() => {
                    toast.success("Data Updated Successfully!!");
                    setOpen(false);
                })
                .catch((error) => {
                    console.error("Error updating data:", error);
                    toast.error("Failed To Update Data: " + error.message);
                })
        } else {
            dispatch(addData(newData))
                .then(() => {
                    toast.success("Data Added Successfully!!!");
                    setOpen(false);
                    setNextId(prevId => prevId + 1);
                })
                .catch((error) => {
                    console.error("Error adding data:", error);
                    toast.error("Failed To Add Data: " + error.message);
                });
        }
    };
    
    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this data?")
        if (isConfirmed) {
            dispatch(deleteData(id))
                .then(() => {
                    toast.success("Data Deleted Successfully!!!");
                })
                .catch((error) => {
                    console.error("Error deleting data:", error);
                    toast.error("Failed To Delete Data: " + error.message);
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
                                        <Button variant="contained" color="primary" onClick={() => handleOpen(company)} >Read</Button>
                                        <Button variant="contained" color="primary" onClick={() => handleOpen(company)} style={{ margin: '0 5px' }}>Edit</Button>
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
