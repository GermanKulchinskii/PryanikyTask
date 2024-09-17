import { ChangeEvent, useEffect, useState } from "react";
import DocsService from "../API/DocsService";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Button, Snackbar, Alert, CircularProgress, Backdrop } from "@mui/material";
import { useAuth } from "../Context/useAuth";
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EditRecordModal from '../components/EditRecordModal';
import NewRecordModal from "../components/NewRecordModal";
import getColumns, { convertToISO, initialRecord, RecordType, validateFields } from "../helpers/TableHelpers";
import { formatDate, formatForInput } from "../helpers/TableHelpers";

const MainPage = () => {
	const [tableData, setTableData] = useState<RecordType[]>([]);
	const paginationModel = { page: 0, pageSize: 5 };
	const { isLoggedIn, logout } = useAuth();
	const [addModal, setAddModal] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [selectedRow, setSelectedRow] = useState<RecordType>(initialRecord);
	const [newRecord, setNewRecord] = useState<RecordType>(initialRecord);
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		isLoggedIn();

		const getData = async () => {
			setLoading(true);
			try {
				const resp = await DocsService.getDocs();
				if (resp.data?.data) {
					const formattedData = resp.data.data.map((record: RecordType) => ({
						...record,
						companySigRuTime: formatDate(record.companySigDate),
						employeeSigRuTime: formatDate(record.employeeSigDate)
					}));
					setTableData(formattedData);
				}
			} catch (error) {
				setSnackbarMessage("Произошла ошибка. Попробуйте позже.");
				setSnackbarOpen(true);
			} finally {
				setLoading(false);
			};
		};
		getData();
	}, []);

	const handleLogout = () => {
		logout();
	};

	const handleDelete = async () => {
		setLoading(true);
		try {
			await DocsService.deleteRecord(selectedRow.id);
			setTableData(tableData!.filter(row => row.id !== selectedRow.id));
			handleDeleteClose();
		} catch (error) {
			setSnackbarMessage("Произошла ошибка. Попробуйте позже.");
			setSnackbarOpen(true);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (row: any) => {
		setSelectedRow({
			...row,
			companySigRuTime: formatForInput(row.companySigDate),
			employeeSigRuTime: formatForInput(row.employeeSigDate)
		});
		setEditModal(true);
	};

	const handleEditClose = () => setEditModal(false);

	const handleEditSave = async () => {
		setLoading(true);
		try {
			if (!validateFields(selectedRow, setSnackbarMessage, setSnackbarOpen)) return;
			const { companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSignatureName } = selectedRow;
			const updatedISORecord = {
				companySignatureName,
				documentName,
				documentStatus,
				documentType,
				employeeNumber,
				employeeSignatureName,
				companySigDate: convertToISO(selectedRow.companySigRuTime),
				employeeSigDate: convertToISO(selectedRow.employeeSigRuTime),
			};
			const response = await DocsService.setRecord(selectedRow.id, updatedISORecord);
			const updatedFullRecord = {
				...response.data.data,
				companySigRuTime: formatDate(response.data.data.companySigDate),
				employeeSigRuTime: formatDate(response.data.data.employeeSigDate)
			};
			setTableData(tableData!.map(row => (row.id === selectedRow.id ? updatedFullRecord : row)));
			handleEditClose();
		} catch (error) {
			setSnackbarMessage("Произошла ошибка. Попробуйте позже.");
			setSnackbarOpen(true);
		} finally {
			setLoading(false);
		};
	};

	const handleAddModal = () => setAddModal(true);
	const handleAddClose = () => setAddModal(false);

	const handleDeleteModal = (row: RecordType) => {
		setSelectedRow(row);
		setDeleteModal(true);
	};

	const handleDeleteClose = () => setDeleteModal(false);

	const handleAdd = async () => {
		setLoading(true);
		try {
			if (!validateFields(newRecord, setSnackbarMessage, setSnackbarOpen)) return;
			const { companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSignatureName } = newRecord;
			const newISORecord = {
				companySignatureName,
				documentName,
				documentStatus,
				documentType,
				employeeNumber,
				employeeSignatureName,
				companySigDate: convertToISO(newRecord.companySigRuTime),
				employeeSigDate: convertToISO(newRecord.employeeSigRuTime),
			};
			const response = await DocsService.postRecord(newISORecord);
			const formattedRecord = {
				...response.data.data,
				companySigRuTime: formatDate(response.data.data.companySigDate),
				employeeSigRuTime: formatDate(response.data.data.employeeSigDate)
			};
			setTableData([...(tableData ?? []), { id: (tableData?.length ?? 0) + 1, ...formattedRecord }]);
			handleAddClose();
		} catch (error) {
			setSnackbarMessage("Произошла ошибка. Попробуйте позже.");
			setSnackbarOpen(true);
		} finally {
			setLoading(false);
		};
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name !== 'companySigRuTime' && name !== 'employeeSigRuTime' && value.length > 30) {
			setSnackbarMessage('Длина ввода не должна превышать 30 символов');
			setSnackbarOpen(true);
			return;
		};

		setNewRecord({ ...newRecord, [name]: value });
	};

	const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name !== 'companySigRuTime' && name !== 'employeeSigRuTime' && value.length > 30) {
			setSnackbarMessage('Длина ввода не должна превышать 30 символов');
			setSnackbarOpen(true);
			return;
		};

		setSelectedRow({ ...selectedRow, [name]: value });
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div>
			<Paper style={{ height: "100%", width: '100%' }}>
				<div className="flex gap-10">
					<Button onClick={handleAddModal}>Добавить запись</Button>
					<Button onClick={handleLogout}>Выйти</Button>
				</div>
				<DataGrid
					rows={tableData}
					columns={getColumns(handleEdit, handleDeleteModal)}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10, 20]}
					sx={{ border: 0 }}
				/>
			</Paper>
			<NewRecordModal
				open={addModal}
				onClose={handleAddClose}
				onSave={handleAdd}
				record={newRecord}
				handleInputChange={handleInputChange}
			/>
			<ConfirmDeleteModal
				open={deleteModal}
				onClose={handleDeleteClose}
				onConfirm={handleDelete}
			/>
			<EditRecordModal
				open={editModal}
				onClose={handleEditClose}
				onSave={handleEditSave}
				record={selectedRow}
				handleInputChange={handleEditInputChange}
			/>
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default MainPage;
