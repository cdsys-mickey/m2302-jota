import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { C05OutputModePickerContainer } from "./C05OutputModePickerContainer";
import C05PrintButtonContainer from "./C05PrintButtonContainer";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";

const C05DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, checkEditableWorking, onDelete, onPrint, onSideDrawerOpen, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<C05OutputModePickerContainer />
						<C05PrintButtonContainer />
					</>
				)}

				{onDelete && (
					<ButtonWrapper
						responsive
						startIcon={<DeleteIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ButtonWrapper>
				)}

				{onEdit && (
					<ButtonWrapper
						responsive
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}
						loading={checkEditableWorking}>
						編輯
					</ButtonWrapper>
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

C05DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
};

export default C05DialogViewToolbar;
