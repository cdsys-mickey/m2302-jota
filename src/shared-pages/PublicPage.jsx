import AppBanner from "@/shared-components/AppBanner";
import FlexBox from "@/shared-components/FlexBox";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { CopyrightContainer } from "../shared-components/CopyrightContainer";
import BasePage from "./BasePage";

const PublicPage = memo(
	({ children, height, title, sx = [], boxProps, ...rest }) => {
		return (
			<BasePage sx={[...(Array.isArray(sx) ? sx : [sx])]} {...rest}>
				<Box pt={2} px={2}>
					<AppBanner size="md" />
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
	}
);

PublicPage.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

PublicPage.displayName = "PublicPage";

export default PublicPage;
