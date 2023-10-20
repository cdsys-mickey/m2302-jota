import { CircularProgress, Link } from "@mui/material";
import React from "react";
import FlexBox from "./FlexBox";

const LoadingLink = React.forwardRef(
	({ children, loading = false, disabled = false, ...rest }, ref) => {
		return (
			<FlexBox inline alignItems="center">
				<Link ref={ref} disabled={disabled || loading} {...rest}>
					{children}
				</Link>
				<FlexBox ml={1}>
					<CircularProgress
						sx={[
							(theme) => ({
								opacity: 0,
								transition: theme.transitions.create(
									"opacity",
									{
										easing: theme.transitions.easing.sharp,
										duration:
											theme.transitions.duration
												.enteringScreen,
									}
								),
								...(loading && {
									opacity: 1,
								}),
							}),
						]}
						size={16}
					/>
				</FlexBox>
			</FlexBox>
		);
	}
);

export default React.memo(LoadingLink);
