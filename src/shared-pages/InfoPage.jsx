import { AlertTitle, Box, Container } from "@mui/material";
// import BackgroundImage from "images/v960-ning-17-1920.png";

import { PublicPageContainer } from "./PublicPageContainer";
import AlertEx from "@/shared-components/AlertEx";
import FlexContainer from "../shared-components/FlexContainer";

const InfoPage = ({
	dense,
	title,
	message,
	severity = "info",
	alertProps,
	containerProps,
	sx = [],
	...rest
}) => {
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
};

export default InfoPage;
