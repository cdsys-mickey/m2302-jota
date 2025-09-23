import React from "react";
import { Container, AlertTitle, Box } from "@mui/material";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";
import { memo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import AlertTitleEx from "./AlertTitleEx";

const NoDataBox = memo(
	forwardRef((props, ref) => {
		const {
			children,
			height,
			severity = "warning",
			title = "目前沒有資料，請確認篩選條件是否正確。",
			size,
			...rest
		} = props;
		return (
			<Container maxWidth="xs" ref={ref}>
				<FlexBox
					justifyContent="center"
					alignItems="center"
					height={height}
					sx={[
						(theme) => ({
							transition: theme.transitions.create("height", {
								easing: theme.transitions.easing.sharp,
								duration:
									theme.transitions.duration.enteringScreen,
							}),
						}),
					]}
					{...rest}>
					<Box mb="30%">
						<AlertEx severity={severity} transparent size={size}>
							<AlertTitleEx size={size}>{title}</AlertTitleEx>
							{children}
						</AlertEx>
					</Box>
				</FlexBox>
			</Container>
		);
	})
);
NoDataBox.propTypes = {
	height: PropTypes.number,
	children: PropTypes.node,
	severity: PropTypes.string,
	title: PropTypes.string,
	size: PropTypes.oneOf(["small", "medium", "large"]),
};
export default NoDataBox;
