import { ConfigContext } from 'shared-components/config';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Container, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';

function ErrorPage() {
	// const config = useContext(ConfigContext);

	const handleBackHome = useCallback(() => {
		window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/`;
	}, []);

	return (
		<Container style={{ textAlign: 'center', marginTop: '10%' }}>
			<ErrorOutlineIcon style={{ fontSize: '100px', color: '#f44336' }} />
			<Typography variant="h4" style={{ margin: '20px 0' }}>
				系統發生例外狀況
			</Typography>
			<Typography variant="body1" style={{ marginBottom: '20px' }}>
				很抱歉系統出現了未預期的例外狀況，請先嘗試重新整理網頁(Ctrl + F5)或稍後再試.
			</Typography>
			<Button variant="contained" color="primary" onClick={handleBackHome}>
				回到首頁
			</Button>
		</Container>
	);
}

export default ErrorPage;
