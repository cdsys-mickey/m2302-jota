import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A06DialogTitleViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onDelete && (
					<ResponsiveButton
						startIcon={<DeleteIcon />}
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
						審核
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

A06DialogTitleViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onReview: PropTypes.func,
	onDelete: PropTypes.func,
};

export default A06DialogTitleViewButtons;
