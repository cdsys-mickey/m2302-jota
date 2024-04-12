import React, { Fragment } from "react";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const C04DialogTitleViewButtons = React.forwardRef((props, ref) => {
	const { children, onEdit, onDelete, ...rest } = props;
	return (
		<Fragment ref={ref} {...rest}>
			<ResponsiveButton
				startIcon={<EditIcon />}
				color="neutral"
				onClick={onEdit}
				useIconButton>
				編輯
			</ResponsiveButton>
			<ResponsiveButton
				startIcon={<DeleteIcon />}
				color="secondary"
				useIconButton>
				刪除
			</ResponsiveButton>
		</Fragment>
	);
});

export default React.memo(C04DialogTitleViewButtons);
