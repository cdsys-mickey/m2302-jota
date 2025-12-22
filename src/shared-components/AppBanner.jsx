import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { FlexBox } from "@/shared-components";

const AppBanner = memo(({ size = "lg", children, ...rest }) => {
	const typographyVariant = useMemo(() => {
		switch (size) {
			case "md":
				return "h4";
			case "sm":
				return "h5";
			case "lg":
			default:
				return "h3";
		}
	}, [size]);

	const imgHeight = useMemo(() => {
		switch (size) {
			case "md":
				return 60;
			default:
				return 32;
		}
	}, [size]);

	return (
		<FlexBox inline alignItems="center" sx={{ position: "absolute" }}>
			<FlexBox>
				<img
					height={imgHeight}
					// src={`${import.meta.env.VITE_PUBLIC_URL}/logo192.png`}
					src={`${import.meta.env.VITE_PUBLIC_URL}/banner.png`}
					// src={`${config.PUBLIC_URL}banner.png`}
					alt="logo"
				/>
			</FlexBox>
			{/* <FlexBox pl={1}>
				<Typography
					variant={typographyVariant}
					sx={(theme) => ({
						color: theme.palette.text.secondary,
						fontWeight: 600,
					})}>
					{children || import.meta.env.VITE_APP_TITLE}
				</Typography>
			</FlexBox> */}
		</FlexBox>
	);
});
AppBanner.propTypes = {
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	children: PropTypes.string,
};
AppBanner.displayName = "AppBanner";
export default AppBanner;
