import { ConfigContext } from "shared-components/config";
import { Grid, IconButton, Link, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import { FlexBox } from "shared-components";

const Copyright = ({ version, newVersion, loading, apiVersion, handleCopyVersion, handleCopyApiVersion, connState }) => {
	const config = useContext(ConfigContext);

	return (
		<FlexBox inline>
			<FlexBox alignItems="flex-end">
				<Typography variant="subtitle2" color="textSecondary" align="center">
					copyright©cdsys,
				</Typography>
			</FlexBox>
			<FlexBox alignItems="flex-end">
				<Typography variant="subtitle2" color="textSecondary" align="center">
					APP: {version}{config.PROFILE
						? `[${config.PROFILE}]`
						: "[no profile]"
					}
				</Typography>
				{/* <Typography variant="subtitle2" color="textSecondary" align="center"> */}
				{/* <Link component="button" variant="subtitle2" onClick={handleCopyVersion} sx={{
				color: "text.secondary",
				textDecoration: 'none', // 可選：移除底線
				'&:hover': {
					textDecoration: 'underline', // 可選：滑鼠懸停時顯示底線
				},
			}}>
				{version || "(N/A)"}
			</Link> */}
				{newVersion && (
					<Tooltip title={`發現新版號 ${newVersion}`} arrow slotProps={{
						popper: {
							modifiers: [
								{
									name: 'offset',
									options: {
										offset: [0, -8],
									},
								},
							],
						}
					}}>
						<FiberNewOutlinedIcon fontSize="large" color="secondary"
							viewBox="0 6 24 13"
							sx={{
								// top: "-6px",
								// position: "relative"
								height: "25px"
							}} />
					</Tooltip>
				)}

				<Tooltip title="複製前端版號" arrow slotProps={{
					popper: {
						modifiers: [
							{
								name: 'offset',
								options: {
									offset: [0, -8], // 上下距離 -8px（越小越靠近），左右 0
								},
							},
						],
					}
				}}>
					<IconButton onClick={handleCopyVersion} disableFocusRipple disableRipple sx={{
						padding: 0,
						marginLeft: 0.5,
						marginRight: 1
					}}>
						<ContentCopyIcon fontSize="small" sx={{
							width: 14
						}} />
					</IconButton>
				</Tooltip>
			</FlexBox>
			<FlexBox alignItems="flex-end">
				{/* 後端 */}
				{/* </Typography> */}
				<Typography variant="subtitle2" color="textSecondary" align="center">
					{`API: ${apiVersion || (loading ? "(系統啟動中...)" : "(N/A)")}`}
					[{connState}]
				</Typography>
				<Tooltip title="複製API版號" arrow slotProps={{
					popper: {
						modifiers: [
							{
								name: 'offset',
								options: {
									offset: [0, -8], // 上下距離 -8px（越小越靠近），左右 0
								},
							},
						],
					}
				}}>
					<IconButton onClick={handleCopyApiVersion} disableFocusRipple disableRipple sx={{
						padding: 0,
						marginLeft: 0.5,
						marginRight: 1
					}}>
						<ContentCopyIcon fontSize="small" sx={{
							width: 14
						}} />
					</IconButton>
				</Tooltip>
			</FlexBox>
		</FlexBox>
	);
};

Copyright.propTypes = {
	version: PropTypes.string,
	newVersion: PropTypes.string,
	loading: PropTypes.bool,
	apiVersion: PropTypes.string,
	handleCopyVersion: PropTypes.func,
	handleCopyApiVersion: PropTypes.func,
	connState: PropTypes.string
};

export default Copyright;
