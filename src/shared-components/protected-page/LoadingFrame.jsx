import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import LoadingTypography from "../LoadingTypography";
import FlexBox from "@/shared-components/FlexBox";
import { PublicPageContainer } from "@/shared-pages/PublicPageContainer";
import BackgroundImage from "@/images/rm218batch4-ning-34.jpg";

export const LoadingFrame = memo(
	forwardRef((props, ref) => {
		const { title = "讀取中", ...rest } = props;

		return (
			<PublicPageContainer
				ref={ref}
				sx={{
					backgroundImage: `url(${BackgroundImage})`,
					backgroundSize: "cover",

					backgroundRepeat: "no-repeat",
					minHeight: "100vh",
				}}
				boxProps={{ alignItems: "center" }}>
				<Container maxWidth="xs">
					<FlexBox justifyContent="center">
						<LoadingTypography iconSize="lg" variant="h5">
							{title}
						</LoadingTypography>
					</FlexBox>
				</Container>
			</PublicPageContainer>
		);
	})
);

LoadingFrame.propTypes = {
	title: PropTypes.string,
};

LoadingFrame.displayName = "LoadingFrame";
