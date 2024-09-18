import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { D06OutputModePickerContainer } from "./D06OutputModePickerContainer";
import D06PrintButtonContainer from "./D06PrintButtonContainer";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";

const D06DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, checkEditableWorking, onDelete, onPrint, onSideDrawerOpen, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<D06OutputModePickerContainer />
						<D06PrintButtonContainer />
					</>
				)}

				{onDelete && (
					<ButtonWrapper
						responsive
						startIcon={<DeleteOutlinedIcon />}
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

D06DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
};

export default D06DialogViewToolbar;

