import React from "react";
import { Container, Box, AlertTitle } from "@mui/material";
import AlertEx from "@/shared-components/AlertEx";
import { FlexBox } from "@/shared-components";

const ItemListViewInit = ({
	children,
	text = "請先點選您要顯示的項目",
	...rest
}) => {
	return (
		<Container maxWidth="xs">
			<FlexBox pt="50%" justifyContent="center">
				<AlertEx severity="info" transparent>
					<AlertTitle>{text}</AlertTitle>
				</AlertEx>
			</FlexBox>
		</Container>
	);
};

export default React.memo(ItemListViewInit);
