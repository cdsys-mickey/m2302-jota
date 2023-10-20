import { Container } from "@mui/material";

import LoadingTypography from "@/shared-components/LoadingTypography";

const Loading = ({ prompt = "讀取中" }) => {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "calc(10px + 2vmin)",
				color: "white",
			}}
			component="div">
			<div>
				<LoadingTypography variant="h5" color="textSecondary">
					{prompt}
				</LoadingTypography>
			</div>
		</Container>
	);
};

export default Loading;
