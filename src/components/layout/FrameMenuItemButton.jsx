import { forwardRef, memo } from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const FrameMenuItemButton = memo(
	forwardRef((props, ref) => {
		const {
			// code,
			// primary,
			disabled,
			value,
			sx = [],
			onClick,
			selected = false,
			...rest
		} = props;
		return (
			<ListItemButton
				ref={ref}
				sx={[
					(theme) => ({
						paddingTop: 0,
						paddingBottom: 0,
					}),

					...(Array.isArray(sx) ? sx : [sx]),
				]}
				selected={selected}
				onClick={e => onClick(e, value)}
				disabled={disabled}
				{...rest}>
				<FlexBox inline fullWidth alignItems="flex-start">
					<FlexBox
						pt="5px"
						pr={1}
						justifyContent="flex-end"
						sx={{
							width: "2.5rem",
						}}>
						<Typography
							// variant={selected ? "body1" : "body2"}
							fontWeight={selected ? 700 : 200}>
							{value.JobID}
						</Typography>
					</FlexBox>
					<FlexBox
						flex={1}
						sx={[
							{
								borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
							},

						]}>
						<ListItemText
							primary={value.JobName}
							primaryTypographyProps={{
								// variant: selected ? "body1" : "body2",
								fontSize: 16,
							}}
							sx={[
								{
									color: disabled
										? "text.secondary"
										: "text.primary",
									"& .MuiTypography-root": {
										fontWeight: selected ? 800 : 400,
									},
								},
								MuiStyles.ELLIPSIS,
							]}
						/>
					</FlexBox>
				</FlexBox>
			</ListItemButton>
		);
	})
);

FrameMenuItemButton.propTypes = {
	value: PropTypes.object.isRequired,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	selected: PropTypes.bool,
};

FrameMenuItemButton.displayName = "FrameMenuItemButton";

export default FrameMenuItemButton;
