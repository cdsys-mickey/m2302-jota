import { ButtonEx } from "@/shared-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import C09ExportButtonContainer from "./C09ExportButtonContainer";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";

const C09DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, checkEditableWorking, onDelete, onPrint, onSideDrawerOpen, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						{/* <C09OutputModePickerContainer />
						<C09PrintButtonContainer /> */}
						<C09ExportButtonContainer />
					</>
				)}

				{onDelete && (
					<ButtonEx
						responsive
						startIcon={<DeleteIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ButtonEx>
				)}

				{onEdit && (
					<ButtonEx
						responsive
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}
						loading={checkEditableWorking}>
						編輯
					</ButtonEx>
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

C09DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
	onSideDrawerOpen: PropTypes.func,
};

export default C09DialogViewToolbar;
