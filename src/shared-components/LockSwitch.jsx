import { memo } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { green, grey, pink, red } from "@mui/material/colors";
import FlexBox from "./FlexBox";
import { Box, Typography } from "@mui/material";

const LockSwitch = memo((props) => {
	const {
		sx = [],
		lockedLabel = "鎖定",
		unlockedLabel = "解鎖",
		locked,
		...rest
	} = props;
	return (
		<Box
			className="button"
			sx={[
				(theme) => ({
					"& .react-switch-bg": {
						border: "1px solid rgb(0,0,0,0.1)",
						boxShadow: "-3px 3px 3px -1px rgb(0,0,0,0.2) inset",
						transition: theme.transitions.create(
							["box-shadow", "background-color"],
							{
								easing: theme.transitions.easing.sharp,
								duration:
									theme.transitions.duration.leavingScreen,
							}
						),
						// transition:
						// 	"box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
					},
					"&:hover .react-switch-bg": {
						boxShadow: "0px 4x 6px 0px rgb(0,0,0,0.4) inset",
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			<Switch
				checked={!locked}
				borderRadius={6}
				height={32}
				width={70}
				boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
				activeBoxShadow="0px 0px 1px 3px rgba(0, 0, 0, 0.2)"
				// 鎖定
				offColor={red[100]}
				offHandleColor={red[600]}
				uncheckedHandleIcon={
					<FlexBox
						sx={{
							height: "30px",
							width: "30px",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<LockIcon fontSize="small" htmlColor="#fff" />
					</FlexBox>
				}
				uncheckedIcon={
					<FlexBox
						sx={{
							height: "30px",
							width: "42px",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Typography
							color="text.secondary"
							variant="body2"
							sx={{ fontWeight: 600 }}>
							{lockedLabel}
						</Typography>
					</FlexBox>
				}
				// 解鎖
				onColor={green[50]}
				onHandleColor={green["A700"]}
				checkedIcon={
					<FlexBox
						sx={{
							height: "30px",
							width: "42px",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Typography
							color="text.secondary"
							variant="body2"
							sx={{
								fontWeight: 600,
							}}>
							{unlockedLabel}
						</Typography>
					</FlexBox>
				}
				checkedHandleIcon={
					<FlexBox
						sx={{
							height: "30px",
							width: "30px",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<LockOpenIcon fontSize="small" htmlColor="#fff" />
					</FlexBox>
				}
				{...rest}
			/>
		</Box>
	);
});

LockSwitch.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	lockedLabel: PropTypes.string,
	unlockedLabel: PropTypes.string,
	locked: PropTypes.bool,
};

LockSwitch.displayName = "LockSwitch";
export default LockSwitch;
