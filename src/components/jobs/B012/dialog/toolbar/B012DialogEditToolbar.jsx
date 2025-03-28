import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import ButtonWrapper from "@/shared-components/ButtonWrapper";
import SearchIcon from "@mui/icons-material/Search";
import B012ImportCustsDialogContainer from "./import-custs/B012ImportCustsDialogContainer";

const B012DialogEditToolbar = memo(
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
						帶入客戶
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
				<B012ImportCustsDialogContainer />
			</Fragment>
		);
	})
);
B012DialogEditToolbar.displayName = "B012DialogEditToolbar";
B012DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onImportCusts: PropTypes.func,
	loading: PropTypes.bool,
	readOnly: PropTypes.bool,
};
export default B012DialogEditToolbar;


