import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const getColumns = (handleEdit: (row: any) => void, handleDeleteModal: (row: any) => void): GridColDef[] => [
	{ field: 'companySigRuTime', headerName: 'Дата подписи компании', width: 150 },
	{ field: 'companySignatureName', headerName: 'Имя подписи компании', width: 170 },
	{ field: 'documentName', headerName: 'Название документа', width: 150 },
	{ field: 'documentStatus', headerName: 'Статус документа', width: 150 },
	{ field: 'documentType', headerName: 'Тип документа', width: 150 },
	{ field: 'employeeNumber', headerName: '№ сотрудника', width: 120 },
	{ field: 'employeeSigRuTime', headerName: 'Дата подписи сотрудника', width: 150 },
	{ field: 'employeeSignatureName', headerName: 'Имя подписи сотрудника', width: 150 },
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

export const formatDate = (isoString: string) => {
	const isoDate = new Date(isoString);
	const ruDate = isoDate.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const ruTime = isoDate.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC'
	});
	return `${ruDate} ${ruTime}`;
}

export const convertToISO = (dateTime: string): string => {
	const [datePart, timePart] = dateTime.split(' ');
	const [day, month, year] = datePart.split('.').map(Number);
	const [hours, minutes] = timePart.split(':').map(Number);
	const isoDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
	return isoDate.toISOString();
};

export const validateFields = (record: RecordType, setSnackbarMessage: (message: string) => void, setSnackbarOpen: (open: boolean) => void): boolean => {
	const dateRegex = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;
	if (!record.companySigRuTime.match(dateRegex) || !record.employeeSigRuTime.match(dateRegex)) {
		setSnackbarMessage("Неверный формат даты. Используйте формат: 12.12.2012 13:23");
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