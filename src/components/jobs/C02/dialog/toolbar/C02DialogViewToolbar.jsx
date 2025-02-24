import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import C02ExportButtonContainer from "./C02ExportButtonContainer";
import { C02ReviewButtonContainer } from "./C02ReviewButtonContainer";

const C02DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onSideDrawerOpen, onReject, onPrint, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					// <>
					// 	<C02OutputModePickerContainer />
					// 	<C02PrintButtonContainer />
					// </>
					<C02ExportButtonContainer />
				)}

				{onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ResponsiveButton>
				)}

				{/* {onReview && (
					<ResponsiveButton
						startIcon={<CheckCircleOutlineIcon />}
						color="success"
						onClick={onReview}>
						覆核
					</ResponsiveButton>
				)} */}
				<C02ReviewButtonContainer />
				{onReject && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="warning"
						onClick={onReject}>
						解除覆核
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

C02DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onReview: PropTypes.func,
	onReject: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default C02DialogViewToolbar;
