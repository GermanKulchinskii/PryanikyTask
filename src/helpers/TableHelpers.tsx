import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const getColumns = (handleEdit: (row: any) => void, handleDeleteModal: (row: any) => void): GridColDef[] => [
	{ field: 'companySigRuTime', headerName: 'Дата подписи компании', width: 150 },
	{ field: 'companySignatureName', headerName: 'Подпись компании', width: 140 },
	{ field: 'documentName', headerName: 'Название документа', width: 150 },
	{ field: 'documentStatus', headerName: 'Статус документа', width: 150 },
	{ field: 'documentType', headerName: 'Тип документа', width: 150 },
	{ field: 'employeeNumber', headerName: '№ сотрудника', width: 120 },
	{ field: 'employeeSigRuTime', headerName: 'Дата подписи сотрудника', width: 150 },
	{ field: 'employeeSignatureName', headerName: 'Подпись сотрудника', width: 150 },
	{
		field: 'actions',
		headerName: 'Действия',
		width: 220,
		renderCell: (params: GridRenderCellParams) => (
			<div>
				<Button onClick={() => handleEdit(params.row)}>Редактировать</Button>
				<Button onClick={() => handleDeleteModal(params.row)}>Удалить</Button>
			</div>
		),
	},
];

export type RecordType = {
	companySigDate: string;
	companySigRuTime: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSigRuTime: string;
	employeeSignatureName: string;
	id: string;
}

export const initialRecord: RecordType = {
	companySigDate: '',
	companySigRuTime: '',
	companySignatureName: '',
	documentName: '',
	documentStatus: '',
	documentType: '',
	employeeNumber: '',
	employeeSigDate: '',
	employeeSigRuTime: '',
	employeeSignatureName: '',
	id: '',
};

export const formatDate = (isoString: string): string => {
	const isoDate = new Date(isoString);
	const day = String(isoDate.getUTCDate()).padStart(2, '0');
	const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
	const year = isoDate.getUTCFullYear();
	const hours = String(isoDate.getUTCHours()).padStart(2, '0');
	const minutes = String(isoDate.getUTCMinutes()).padStart(2, '0');
	return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const formatForInput = (isoString: string): string => {
	const isoDate = new Date(isoString);
	const year = isoDate.getUTCFullYear();
	const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
	const day = String(isoDate.getUTCDate()).padStart(2, '0');
	const hours = String(isoDate.getUTCHours()).padStart(2, '0');
	const minutes = String(isoDate.getUTCMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
  

export const convertToISO = (dateTime: string): string => {
	const [datePart, timePart] = dateTime.split('T');
	const [year, month, day] = datePart.split('-').map(Number);
	const [hours, minutes] = timePart.split(':').map(Number);
	const isoDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
	return isoDate.toISOString();
};  



export const validateFields = (record: RecordType, setSnackbarMessage: (message: string) => void, setSnackbarOpen: (open: boolean) => void): boolean => {
	const minDate = new Date('1991-01-01T00:00');
	const maxDate = new Date();
	maxDate.setDate(maxDate.getDate() + 1);
	const companySigDate = new Date(record.companySigRuTime);
	const employeeSigDate = new Date(record.employeeSigRuTime);
  
	if (companySigDate < minDate || companySigDate > maxDate || employeeSigDate < minDate || employeeSigDate > maxDate) {
	  setSnackbarMessage("Дата должна быть в диапазоне от 1991 года до завтрашнего дня.");
	  setSnackbarOpen(true);
	  return false;
	}
  
	if (!record.companySignatureName || !record.documentName || !record.documentStatus || !record.documentType || !record.employeeNumber || !record.employeeSignatureName) {
	  setSnackbarMessage("Все поля должны быть заполнены.");
	  setSnackbarOpen(true);
	  return false;
	}
	return true;
  };
  

export default getColumns;