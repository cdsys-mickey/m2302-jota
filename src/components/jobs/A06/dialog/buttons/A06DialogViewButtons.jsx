import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A06DialogViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, ...rest } = props;
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
			</Fragment>
		);
	})
);

A06DialogViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onReview: PropTypes.func,
	onDelete: PropTypes.func,
};

export default A06DialogViewButtons;
