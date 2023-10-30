import { forwardRef, memo } from "react";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";

const FrameMenuItemButton = memo(
	forwardRef((props, ref) => {
		const {
			code,
			primary,
			sx = [],
			handleClickBy,
			selected = false,
			...rest
		} = props;
		return (
			<ListItemButton
				ref={ref}
				sx={[
					{
						paddingTop: 0,
						paddingBottom: 0,
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				selected={selected}
				onClick={handleClickBy(code)}
				{...rest}>
				<FlexBox inline fullWidth alignItems="flex-start">
					<FlexBox
						pt="5px"
						pr={1}
						justifyContent="flex-end"
						sx={{
							width: "2.5rem",
						}}>
						<Typography variant="body1">{code}</Typography>
					</FlexBox>
					<FlexBox
						flex={1}
						sx={{
							borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
						}}>
						<ListItemText
							primary={primary}
							primaryTypographyProps={{
								variant: "subtitle1",
							}}
							sx={{
								// color: "text.secondary",
								color: "text.primary",
								"& *": {
									fontWeight: 500,
								},
							}}
						/>
					</FlexBox>
				</FlexBox>
			</ListItemButton>
		);
	})
);

FrameMenuItemButton.propTypes = {
	code: PropTypes.string.isRequired,
	primary: PropTypes.string.isRequired,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	handleClickBy: PropTypes.func,
	selected: PropTypes.bool,
};

FrameMenuItemButton.displayName = "FrameMenuItemButton";

export default FrameMenuItemButton;
