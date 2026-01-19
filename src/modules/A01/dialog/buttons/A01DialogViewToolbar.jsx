import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";
import { ButtonEx, TooltipEx } from "shared-components";
import { TooltipWrapper } from "shared-components";

const A01DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, editLabel, onSideDrawerOpen,
			notEditable, notEditableTitle,
			notDeletable, notDeletableTitle,
			...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onDelete && (
					<TooltipWrapper title={notDeletableTitle} disabled={notDeletable}>
						<ResponsiveButton
							startIcon={<HighlightOffIcon />}
							color="secondary"
							onClick={onDelete}
							disabled={notDeletable}>
							刪除
						</ResponsiveButton>
					</TooltipWrapper>
				)}

				{/* <ResponsiveButton
					startIcon={<ContentCopyIcon />}
					color="neutral">
					複製
				</ResponsiveButton> */}
				{onReview && (
					<ResponsiveButton
						startIcon={<CheckCircleOutlineIcon />}
						color="warning"
						onClick={onReview}>
						覆核
					</ResponsiveButton>
				)}

				{onEdit && (
					<TooltipWrapper title={notEditableTitle} disabled={notEditable}>
						<ButtonEx
							responsive
							startIcon={<EditOutlinedIcon />}
							color="primary"
							onClick={onEdit}
							disabled={notEditable}>
							{editLabel}
						</ButtonEx>
					</TooltipWrapper>
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

A01DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onReview: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	editLabel: PropTypes.string.isRequired,
	notEditable: PropTypes.bool,
	notEditableTitle: PropTypes.string,
	notDeletable: PropTypes.bool,
	notDeletableTitle: PropTypes.string
};

export default A01DialogViewToolbar;
