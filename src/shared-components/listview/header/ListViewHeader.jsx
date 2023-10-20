import React from "react";
import FlexBox from "@/shared-components/FlexBox";

const ListViewHeader = React.forwardRef(
	({ children, visible = true, sx = [], ...rest }, ref) => {
		return (
			<FlexBox
				// px={1}
				fullWidth
				ref={ref}
				sx={[
					(theme) => ({
						border: "1px solid rgba(0, 0, 0, 0.12)",
						borderBottom: 0,
						backgroundColor: "rgb(0 0 0 / 40%)",
						color: "#fff",
						borderTopLeftRadius: "4px",
						borderTopRightRadius: "4px",
						paddingRight: "16px",
						// opacity: 0,
						transition: theme.transitions.create(
							"backgroundColor",
							{
								easing: theme.transitions.easing.sharp,
								duration:
									theme.transitions.duration.leavingScreen,
							}
						),
						...(!visible && {
							backgroundColor: "#fff",
						}),
						"& *": {
							fontWeight: 600,
							whiteSpace: "noWrap",
						},
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{children}
			</FlexBox>
		);
	}
);

export default React.memo(ListViewHeader);
