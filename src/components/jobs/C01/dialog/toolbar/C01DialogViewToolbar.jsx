import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { C01OutputModePickerContainer } from "./C01OutputModePickerContainer";
import C01PrintButtonContainer from "./C01PrintButtonContainer";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const C01DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onTransform, onPrint, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<C01OutputModePickerContainer />
						<C01PrintButtonContainer />
					</>
				)}

				{onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ResponsiveButton>
				)}

				{onTransform && (
					<ResponsiveButton
						startIcon={<CheckCircleOutlineIcon />}
						color="success"
						onClick={onTransform}>
						形成採購單
					</ResponsiveButton>
				)}

				{onEdit && (
					<ResponsiveButton
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}>
						編輯
					</ResponsiveButton>
				)}
				<Tooltip title="詳細資訊">
					<IconButton onClick={onSideDrawerOpen} size="small">
						<HelpOutlineIcon />
					</IconButton>
				</Tooltip>
			</Fragment>
		);
	})
);

C01DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onTransform: PropTypes.func,
	onReject: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default C01DialogViewToolbar;
