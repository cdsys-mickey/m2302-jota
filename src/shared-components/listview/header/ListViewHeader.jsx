import { memo, forwardRef } from "react";
import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";

const ListViewHeader = memo(
	forwardRef(
		({ children, visible = true, sx = [], columns = 24, ...rest }, ref) => {
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
										theme.transitions.duration
											.leavingScreen,
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
					<Grid container columns={columns}>
						{children}
					</Grid>
				</FlexBox>
			);
		}
	)
);

ListViewHeader.propTypes = {
	children: PropTypes.node,
	visible: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	columns: PropTypes.number,
};
export default ListViewHeader;
