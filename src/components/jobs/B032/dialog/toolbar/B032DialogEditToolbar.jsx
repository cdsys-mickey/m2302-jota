import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import SearchIcon from "@mui/icons-material/Search";
import B032ImportCustsDialogContainer from "./import-custs/B032ImportCustsDialogContainer";

const B032DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onImportCusts, onSave, onCancel, loading, ...rest } = props;


		return (
			<Fragment ref={ref} {...rest}>
				{onImportCusts && (
					<ButtonWrapper
						responsive
						onClick={onImportCusts}
						endIcon={<SearchIcon />}
						color="primary"
						variant="outlined">
						帶入新客戶
					</ButtonWrapper>
				)}

				<ButtonWrapper
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
					{...rest}>
					取消
				</ButtonWrapper>
				<ButtonWrapper
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ButtonWrapper>
				{/* 帶入商品 */}
				<B032ImportCustsDialogContainer />
			</Fragment>
		);
	})
);
B032DialogEditToolbar.displayName = "B032DialogEditToolbar";
B032DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onImportCusts: PropTypes.func,
	loading: PropTypes.bool,
	readOnly: PropTypes.bool,
};
export default B032DialogEditToolbar;



