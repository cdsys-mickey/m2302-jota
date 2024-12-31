import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { C02OutputModePickerContainer } from "./C02OutputModePickerContainer";
import C02PrintButtonContainer from "./C02PrintButtonContainer";
import { C02ReviewButtonContainer } from "./C02ReviewButtonContainer";
import { IconButton, Tooltip } from "@mui/material";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const C02DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onSideDrawerOpen, onReject, onPrint, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<C02OutputModePickerContainer />
						<C02PrintButtonContainer />
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
