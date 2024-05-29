import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { C07OutputModePickerContainer } from "./C07OutputModePickerContainer";
import C07PrintButtonContainer from "./C07PrintButtonContainer";

const C07DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, checkEditableWorking, onDelete, onPrint, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<C07OutputModePickerContainer />
						<C07PrintButtonContainer />
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
			</Fragment>
		);
	})
);

C07DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
};

export default C07DialogViewToolbar;
