import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { D06OutputModePickerContainer } from "./D06OutputModePickerContainer";
import D06PrintButtonContainer from "./D06PrintButtonContainer";

const D06DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, checkEditableWorking, onDelete, onPrint, ...rest } =
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
			</Fragment>
		);
	})
);

D06DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	checkEditableWorking: PropTypes.bool,
};

export default D06DialogViewToolbar;

