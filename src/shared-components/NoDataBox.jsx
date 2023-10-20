import React from "react";
import { Container, AlertTitle } from "@mui/material";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";

const NoDataBox = ({
	children,
	severity = "warning",
	title = "這個檢視目前沒有資料",
	...rest
}) => {
	return (
		<Container maxWidth="xs">
			<FlexBox justifyContent="center" {...rest}>
				<AlertEx severity={severity} transparent>
					<AlertTitle>{title}</AlertTitle>
					{children}
				</AlertEx>
			</FlexBox>
		</Container>
	);
};

export default React.memo(NoDataBox);
