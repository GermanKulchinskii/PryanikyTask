import { useEffect, useState } from "react";
import DocsService from "../API/DocsService";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Button } from "@mui/material";

const MainPage = () => {
    const [tableData, setTableData] = useState([]);
    const paginationModel = { page: 0, pageSize: 5 };
    
    useEffect(() => {
        const getData = async () => {
            const resp = await DocsService.getDocs();
            if (resp.data?.data) {
                setTableData(resp.data.data);
            }
        };

        getData();
    }, []);

    const handleDelete = () => {
        console.log(1);
        // Логика удаления записи
    };

    const handleEdit = () => {
        console.log(2);
        // Логика редактирования записи
    };

    const handleAdd = () => {
        console.log(3);
        // Логика добавления новой записи
    };

    const columns = [
        { field: 'companySigDate', headerName: 'Company Sig Date', width: 150 },
        { field: 'companySignatureName', headerName: 'Company Signature Name', width: 200 },
        { field: 'documentName', headerName: 'Document Name', width: 150 },
        { field: 'documentStatus', headerName: 'Document Status', width: 150 },
        { field: 'documentType', headerName: 'Document Type', width: 150 },
        { field: 'employeeNumber', headerName: 'Employee Number', width: 120 },
        { field: 'employeeSigDate', headerName: 'Employee Sig Date', width: 150 },
        { field: 'employeeSignatureName', headerName: 'Employee Signature Name', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: () => (
                <div>
                    <Button onClick={() => handleEdit()}>Edit</Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <Button onClick={handleAdd}>Add New Record</Button>
            <DataGrid 
                rows={tableData} 
                columns={columns} 
                initialState={{ pagination: { paginationModel } }} 
                pageSizeOptions={[5, 10]} 
                sx={{ border: 0 }} 
                // checkboxSelection 
                // disableMultipleRowSelection={true}
                // disableSelectionOnClick 
            />
        </Paper>
    );
};

export default MainPage;
