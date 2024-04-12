import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A20DialogViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, ...rest } = props;
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

A20DialogViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

export default A20DialogViewButtons;
