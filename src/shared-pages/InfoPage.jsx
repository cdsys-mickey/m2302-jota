import { AlertTitle, Box } from "@mui/material";
// import BackgroundImage from "images/v960-ning-17-1920.png";

import AlertEx from "@/shared-components/AlertEx";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexContainer from "../shared-components/FlexContainer";

const InfoPage = memo(
	({ title, message, severity = "info", alertProps, containerProps }) => {
		return (
			<FlexContainer
				maxWidth="sm"
				alignItems="center"
				justifyContent="center"
				fullHeight
				{...containerProps}>
				<Box>
					<AlertEx
						severity={severity}
						{...alertProps}
						sx={{
							boxShadow: `
								1px 1px 8px rgb(0 0 0 / 9%)
								, -2px 0px 5px rgb(0 0 0 / 0%)
							`,
							paddingLeft: 4,
							paddingRight: 6,
						}}>
						<AlertTitle>{title}</AlertTitle>
						{message}
					</AlertEx>
				</Box>
			</FlexContainer>
		);
	}
);
InfoPage.displayName = "InfoPage";
InfoPage.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	severity: PropTypes.string,
	alertProps: PropTypes.object,
	containerProps: PropTypes.object,
};
export default InfoPage;
