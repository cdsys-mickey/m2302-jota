import { AlertTitle, Box, Container } from "@mui/material";
// import BackgroundImage from "images/v960-ning-17-1920.png";

import { PublicPageContainer } from "./PublicPageContainer";
import AlertEx from "@/shared-components/AlertEx";

const PublicInfoPage = ({
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
		<PublicPageContainer
			sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
			boxProps={{}}
			{...rest}>
			<Container maxWidth="sm" {...containerProps}>
				<Box mb={"15vh"}>
					<AlertEx
						severity={severity}
						{...alertProps}
						sx={{
							boxShadow: `
								1px 1px 8px rgb(0 0 0 / 9%)
								, -2px 0px 5px rgb(0 0 0 / 0%)
							`,
						}}>
						<AlertTitle>{title}</AlertTitle>
						{message}
					</AlertEx>
				</Box>
			</Container>
		</PublicPageContainer>
	);
};

export default PublicInfoPage;
