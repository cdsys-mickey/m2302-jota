import { List, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { forwardRef } from "react";

const ListEx = styled(
	forwardRef((props, ref) => {
		const { children, ...other } = props;
		return (
			<List ref={ref} {...other}>
				{children}
			</List>
		);
	})
)(({ theme }) => ({}));

export default ListEx;
