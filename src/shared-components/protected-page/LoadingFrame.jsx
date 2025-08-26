import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import LoadingTypography from "../LoadingTypography";
import FlexBox from "@/shared-components/FlexBox";
import BackgroundImage from "@/images/rm218batch4-ning-34_2.jpg";
import { PublicPage } from "@/shared-pages";

export const LoadingFrame = memo(
	forwardRef((props, ref) => {
		const { title = "讀取中", ...rest } = props;

		return (
			<PublicPage
				ref={ref}
				sx={{
					backgroundImage: `url(${BackgroundImage})`,
					backgroundSize: "cover",

					backgroundRepeat: "no-repeat",
					minHeight: "100vh",
				}}
				boxProps={{ alignItems: "center" }}
				{...rest}>
				<Container maxWidth="xs">
					<FlexBox justifyContent="center">
						<LoadingTypography iconSize="lg" variant="h5">
							{title}
						</LoadingTypography>
					</FlexBox>
				</Container>
			</PublicPage>
		);
	})
);

LoadingFrame.propTypes = {
	title: PropTypes.string,
};

LoadingFrame.displayName = "LoadingFrame";
