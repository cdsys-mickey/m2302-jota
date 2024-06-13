import RepeatIcon from "@mui/icons-material/Repeat";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexBox from "@/shared-components/FlexBox";

const DeptSwitchMenuItem = memo((props) => {
	const { title, bgcolor, sx = [], ...rest } = props;
	return (
		<>
			<FlexBox
				fullWidth
				py={1}
				px={3}
				sx={[
					(theme) => ({
						bgcolor: bgcolor,
						borderTopLeftRadius: theme.spacing(0.5),
						borderTopRightRadius: theme.spacing(0.5),
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}>
				{/* {title} */}
				<Typography
					variant="body1"
					// color="text.secondary"
					// color={theme.palette.getContrastText}
					sx={(theme) => ({
						fontWeight: 600,
						fontSize: "1.1rem",
						mr: 1,
						color: theme.palette.getContrastText(bgcolor),
					})}>
					{title}
				</Typography>
			</FlexBox>
			<MenuItem
				sx={[
					(theme) => ({
						marginTop: theme.spacing(1),
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<ListItemIcon>
					<RepeatIcon fontSize="small" />
				</ListItemIcon>
				{/* {title} */}
				切換門市
			</MenuItem>
		</>
	);
});

DeptSwitchMenuItem.propTypes = {
	bgcolor: PropTypes.string,
	title: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

DeptSwitchMenuItem.displayName = "DeptSwitchMenuItem";
export default DeptSwitchMenuItem;
