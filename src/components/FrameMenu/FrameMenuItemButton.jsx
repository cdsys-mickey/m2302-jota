import { forwardRef, memo } from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { FlexBox } from "@/shared-components";
import PropTypes from "prop-types";
import MuiStyles from "@/shared-modules/MuiStyles";

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
			dense = false,
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
						pt={dense ? "0px" : "5px"}
						pr={1}
						justifyContent="flex-end"
						sx={{
							width: "2.5rem",
						}}>
						<Typography
							sx={{
								...(dense && {
									fontSize: "14px"
								})
							}}
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
								fontSize: dense ? 14 : 16,
							}}
							sx={[
								{
									color: disabled
										? "text.secondary"
										: "text.primary",
									"& .MuiTypography-root": {
										fontWeight: selected ? 800 : 400,
									},
									...(dense && {
										marginTop: 0,
										marginBottom: 0,
									})
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
	dense: PropTypes.bool,
};

FrameMenuItemButton.displayName = "FrameMenuItemButton";

export default FrameMenuItemButton;
