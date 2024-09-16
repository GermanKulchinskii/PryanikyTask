import { CircularProgress, Box, Typography } from '@mui/material';

const Loader: React.FC = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			flexDirection="column"
		>
			<CircularProgress />
			<Typography variant="h6" sx={{ mt: 2 }}>
				Загрузка...
			</Typography>
		</Box>
	);
};

export default Loader;
