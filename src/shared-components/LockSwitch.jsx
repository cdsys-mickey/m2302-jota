import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import Switch from "react-switch";
import { useToggle } from "../shared-hooks/useToggle";
import { FlexBox } from "shared-components";
import MuiStyles from "@/shared-modules/MuiStyles";

const ICON_WIDTH = 30;
const BOX_OFFSET = 48;
const MIN_WIDTH = 70;

const LockSwitch = memo((props) => {
	const {
		sx = [],
		lockedLabel = "鎖定",
		unlockedLabel = "解鎖",
		locked,
		width = 70,
		onChange,
		disableShadow = false,
		disableBoxShadow = false,
		...rest
	} = props;

	const [_locked, _toggleLocked] = useToggle(locked);

	const innerLocked = useMemo(() => {
		return onChange ? locked : _locked;
	}, [_locked, locked, onChange]);

	const handleChange = useMemo(() => {
		return onChange ? onChange : _toggleLocked;
	}, [onChange, _toggleLocked]);

	const _width = useMemo(() => {
		if (!width || width < MIN_WIDTH) {
			console.warn(`已強制使用最小寬度 ${MIN_WIDTH}`);
			return MIN_WIDTH;
		}
		return width;
	}, [width])

	// 鎖定文字框
	const lockedMarginLeft = useMemo(() => {
		// return width > 70 ? (0 - width + 25) / 2 : 0;
		return _width > MIN_WIDTH ? 0 - (_width - ICON_WIDTH - BOX_OFFSET) : 0;
	}, [_width])

	return (
		<Box
			className="button"
			sx={[
				(theme) => ({
					"& .react-switch-bg": {
						border: "1px solid rgb(0,0,0,0.1)",
						...(!disableBoxShadow && ({
							// boxShadow: "-3px 3px 3px -1px rgb(0,0,0,0.2) inset",
							boxShadow: MuiStyles.IN_BOX_SHADOW,
						})),
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
					"& .locked-label": {
						width: `${width - ICON_WIDTH}px`,
					}
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			<Switch
				checked={!innerLocked}
				borderRadius={6}
				height={32}
				width={_width}
				{...!disableShadow && ({
					// boxShadow: "-2px 0 02px rgba(0, 0, 0, 0.3), 2px 0 2px rgba(0, 0, 0, 0.3)"
					boxShadow: MuiStyles.OUT_BOX_SHADOW_H
				})}
				activeBoxShadow="0px 0px 1px 3px rgba(0, 0, 0, 0.2)"
				// 鎖定
				offColor={red[100]}
				offHandleColor={red[600]}
				uncheckedHandleIcon={
					// 鎖定把手
					<FlexBox
						className="locked-handle"
						sx={{
							height: "30px",
							width: `${ICON_WIDTH}px`,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<LockIcon fontSize="small" htmlColor="#fff" />
					</FlexBox>
				}
				uncheckedIcon={
					// 鎖定文字框
					<FlexBox
						className="locked-label"
						sx={{
							height: "30px",
							// width: `${width - ICON_WIDTH}px`,
							alignItems: "center",
							justifyContent: "center",
							marginLeft: `${lockedMarginLeft}px`
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
					// 解鎖文字框
					<FlexBox
						className="unlocked-label"
						sx={{
							height: "30px",
							width: `${width - ICON_WIDTH}px`,
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
					// 解鎖把手
					<FlexBox
						className="unlocked-handle"
						sx={{
							height: "30px",
							width: `${ICON_WIDTH}px`,
							alignItems: "center",
							justifyContent: "center",
							// paddingLeft: "60px"
							// right: "40px"
						}}>
						<LockOpenIcon fontSize="small" htmlColor="#fff" />
					</FlexBox>
				}
				onChange={handleChange}
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
	disableShadow: PropTypes.bool,
	disableBoxShadow: PropTypes.bool,
	onChange: PropTypes.func,
	width: PropTypes.number
};

LockSwitch.displayName = "LockSwitch";
export default LockSwitch;
