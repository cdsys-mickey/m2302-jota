import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";


const A06DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ResponsiveButton>
				)}

				{onReview && (
					<ResponsiveButton
						startIcon={<CheckCircleOutlineIcon />}
						color="warning"
						onClick={onReview}>
						轉正式客戶
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

A06DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onReview: PropTypes.func,
	onDelete: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default A06DialogViewToolbar;
