import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A01DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, editLabel, ...rest } = props;
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
					<ResponsiveButton
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}>
						{editLabel}
					</ResponsiveButton>
				)}
			</Fragment>
		);
	})
);

A01DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onReview: PropTypes.func,
	editLabel: PropTypes.string.isRequired,
};

export default A01DialogViewToolbar;
