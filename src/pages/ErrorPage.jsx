import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Container, Typography } from '@mui/material';
import { useCallback } from 'react';

function ErrorPage() {

	const handleBackHome = useCallback(() => {
		window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/`; // 或使用 react-router 的 useNavigate 回到主頁
	}, []);

	return (
		<Container style={{ textAlign: 'center', marginTop: '10%' }}>
			<ErrorOutlineIcon style={{ fontSize: '100px', color: '#f44336' }} />
			<Typography variant="h4" style={{ margin: '20px 0' }}>
				系統發生例外狀況
			</Typography>
			<Typography variant="body1" style={{ marginBottom: '20px' }}>
				很抱歉系統出現了未預期的例外狀況，您可以稍後再試或是聯絡我們.
			</Typography>
			<Button variant="contained" color="primary" onClick={handleBackHome}>
				回到首頁
			</Button>
		</Container>
	);
}

export default ErrorPage;
