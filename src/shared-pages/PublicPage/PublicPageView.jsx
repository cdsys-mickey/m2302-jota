import AppBanner from "@/shared-components/AppBanner";
import { FlexBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { CopyrightContainer } from "@/shared-components/CopyrightContainer";
import BasePage from "../BasePage";
import { memo } from "react";

const PublicPageView = memo(
	({ children, height, sx = [], boxProps, ...rest }) => {
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

PublicPageView.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	boxProps: PropTypes.object,
	children: PropTypes.node,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

PublicPageView.displayName = "PublicPage";

export default PublicPageView;
