import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import AppBanner from "@/shared-components/AppBanner";
import FlexBox from "@/shared-components/FlexBox";
import BasePage from "./BasePage";
import Copyright from "@/shared-components/Copyright";
import { CopyrightContainer } from "../shared-components/CopyrightContainer";

const PublicPage = ({
	children,
	height,
	title,
	sx = [],
	boxProps,
	...rest
}) => {
	return (
		<BasePage sx={[...(Array.isArray(sx) ? sx : [sx])]} {...rest}>
			<Box pt={2} px={2}>
				<AppBanner size="sm" />
				<FlexBox
					// alignItems="center"
					justifyContent="center"
					sx={{
						minHeight: height - 50,
					}}
					{...boxProps}>
					{children}
				</FlexBox>
				<FlexBox fullWidth mt={1} justifyContent="flex-end">
					<CopyrightContainer />
				</FlexBox>
			</Box>
		</BasePage>
	);
};

PublicPage.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

export default React.memo(PublicPage);
