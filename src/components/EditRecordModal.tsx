import React from 'react';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import style from '../pages/MainStyle'

interface EditRecordModalProps {
	open: boolean;
	onClose: () => void;
	onSave: () => void;
	record: any;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({ open, onClose, onSave, record, handleInputChange }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Редактировать запись
				</Typography>
				<Box component="form" sx={{ mt: 2 }}>
					<TextField
						label="Дата подписи компании"
						name="companySigRuTime"
						value={record.companySigRuTime || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
						type="datetime-local"
						InputLabelProps={{
						shrink: true,
						}}
						inputProps={{
						max: "9999-12-31T23:59"
						}}
					/>
					<TextField
						label="Имя подписи компании"
						name="companySignatureName"
						value={record.companySignatureName || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Название документа"
						name="documentName"
						value={record.documentName || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Статус документа"
						name="documentStatus"
						value={record.documentStatus || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Тип документа"
						name="documentType"
						value={record.documentType || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Номер сотрудника"
						name="employeeNumber"
						value={record.employeeNumber || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Дата подписи сотрудника"
						name="employeeSigRuTime"
						value={record.employeeSigRuTime || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
						type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "9999-12-31T23:59"
            }}
					/>
					<TextField
						label="Имя подписи сотрудника"
						name="employeeSignatureName"
						value={record.employeeSignatureName || ''}
						onChange={handleInputChange}
						fullWidth
						margin="normal"
					/>
					<Button onClick={onSave} variant="contained" sx={{ mt: 2 }}>
						Сохранить
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default EditRecordModal;
