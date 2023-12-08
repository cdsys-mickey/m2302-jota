import React from "react";
import { Container, AlertTitle } from "@mui/material";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";
import { memo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const NoDataBox = memo(
	forwardRef((props, ref) => {
		const {
			children,
			severity = "warning",
			title = "這個檢視目前沒有資料",
			...rest
		} = props;
		return (
			<Container maxWidth="xs" ref={ref}>
				<FlexBox justifyContent="center" {...rest}>
					<AlertEx severity={severity} transparent>
						<AlertTitle>{title}</AlertTitle>
						{children}
					</AlertEx>
				</FlexBox>
			</Container>
		);
	})
);
NoDataBox.propTypes = {
	children: PropTypes.node,
	severity: PropTypes.string,
	title: PropTypes.string,
};
export default NoDataBox;
