import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button, ButtonGroup, Fab, Modal, Box } from '@mui/material/'
import { Add } from '@mui/icons-material'
import { Container } from '@mui/system';

export default function DataTable(props) {
    const [rows, setRows] = useState([]); // initiallize as emtpy
    const [input, setInput] = useState(""); // initiallize as empty
    const [page, setPage] = useState(0);  // always start at the first page
    const [rowsPerPage, setRowsPerPage] = useState(5); // initial number of values to display on table

    //Modal Variables
    const [open, setOpen] = useState(false);
    const [dict, setDict] = useState({});
    const handleOpen = (idx) => { setOpen(true); if(idx === -1 ) {return setDict({})}; setIdx(idx) ;setDict(rows[idx]); console.log(dict, rows[idx])};
    const handleClose = () => setOpen(false);
    const [idx, setIdx] = useState(-1);
    useEffect(()=> {if (open === false) {setDict({});}; console.log(open)}, [open])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Data fetch
    var data = async () => {
        const temp = await fetch(props.pop).then((response) => response.json()).then((data) => data);
        console.log('debug: ', temp);
        return temp;
    }

    useEffect(() => {
        var init = async () => {
            setRows(await data());
        }
        init();
    }, [])

    // Filter Helpers
    const requestSearch = async (inputSearch) => {
        const filteredRows = (await data()).filter((row) => {
            console.log(row);
            return row.price_per_day.toString().toLowerCase() === (inputSearch.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setInput("");
        requestSearch(input);
    };

    // Pagination Helpers
    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = async (dict) => {
        console.log(props.add + '?' + new URLSearchParams(dict));
        await fetch(props.add + '?' + new URLSearchParams(dict), {
            method: "POST"
        })
        
    }

    const handleEdit = async (dict) => {
        await fetch(props.edit + dict[0].property_id + '?' + new URLSearchParams(dict), {
            method: "PUT"
        })
    }
    function AddModal() {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} align="center">
                    {rows.length > 0 ? Object.keys(rows[0]).map((col) => (
                        <div align="row">
                            <TextField
                                label={col}
                                placeholder='Enter...'
                                variant='outlined'
                                onChange={(e) => {
                                    setDict({...dict, [col]: e.target.value});
                                }}
                            />
                        </div>
                    )) : null}
                    <ButtonGroup>
                        <Button variant="contained" color="primary" type="submit" onClick={async()=>{await handleSubmit(dict); setRows(await data());}}>Submit</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>

                    </ButtonGroup>

                </Box>
            </Modal>
        )
    }

    function EditModal({idx}) {
        console.log(idx, rows)
        if (idx === -1 || idx >= rows.length) {
            return null
        }
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} align="center">
                    {rows.length > 0 ? Object.keys(rows[0]).map((col) => (
                        <div align="row">
                            <TextField
                                label={col}
                                value={dict[col]?.toString()}
                                variant='outlined'
                                onChange={(e) => {
                                    console.log("poop");
                                    setDict({...dict, [col]: e.target.value});
                                }}
                            />
                        </div>
                    )) : null}
                    <ButtonGroup>
                        <Button variant="contained" color="primary" type="submit" onClick={async()=>{await handleEdit(dict); setRows(await data());}}>Submit</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>

                    </ButtonGroup>

                </Box>
            </Modal>
        )
    }
    return (
        <>
            <Container maxWidth="xl">
                <Paper>
                    <div align="center">
                        <TextField
                            placeholder='Search'
                            variant='outlined'
                            onChange={async (e) => {e.target.value != "" ? requestSearch(e.target.value) : cancelSearch()}}
                        />
                        <Fab color="primary" aria-label='add'> <Add onClick={() => {handleOpen(-1)}} /> </Fab>
                        {AddModal()}
                    </div>
                    <TableContainer>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {rows.length > 0 ? Object.keys(rows[0]).map((col) => (
                                        <TableCell align='center'>{col}</TableCell>
                                    )) : null}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell align="center">{row.property_id} </TableCell>
                                        <TableCell align="center">{row.city}  </TableCell>
                                        <TableCell align="center">{row.price_per_day}  </TableCell>
                                        <TableCell align="center">{row.next_available_day} </TableCell>
                                        <TableCell align="center">{row.numerical_rating == null ? 0 : row.numerical_rating}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup size="medium" variant="outlined">
                                                <Button onClick={() => {handleOpen(idx)}}>Edit</Button>
                                                <Button color="error" onClick={() => console.log("delete poop")}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
            <EditModal idx={idx}></EditModal>
        </>
    );
}