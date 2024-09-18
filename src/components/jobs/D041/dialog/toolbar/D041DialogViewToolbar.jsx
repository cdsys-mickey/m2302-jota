import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { D041OutputModePickerContainer } from "./D041OutputModePickerContainer";
import D041PrintButtonContainer from "./D041PrintButtonContainer";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";

const D041DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onPrint, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<D041OutputModePickerContainer />
						<D041PrintButtonContainer />
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
						onClick={onEdit}>
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

D041DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
};

export default D041DialogViewToolbar;
