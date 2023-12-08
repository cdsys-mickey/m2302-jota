import React, { forwardRef } from "react";
import { Button, styled } from "@mui/material";
import PropTypes from "prop-types";

const ButtonEx = styled((props) => {
	const { children, ...other } = props;
	return (
		<Button size="small" {...other}>
			{children}
		</Button>
	);
})(({ theme }) => ({}));

ButtonEx.propTypes = {
	children: PropTypes.node,
};
ButtonEx.displayName = "ButtonEx";

export default ButtonEx;
