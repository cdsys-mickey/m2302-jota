import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A17FormViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
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

A17FormViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

export default A17FormViewButtons;
