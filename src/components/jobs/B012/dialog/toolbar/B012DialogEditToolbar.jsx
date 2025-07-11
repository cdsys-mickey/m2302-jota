import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import { ButtonEx } from "@/shared-components";
import SearchIcon from "@mui/icons-material/Search";
import B012ImportCustsDialogContainer from "./import-custs/B012ImportCustsDialogContainer";
import { FormProvider, useForm } from "react-hook-form";

const B012DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onImportCusts, onSave, onCancel, loading, ...rest } = props;

		const form = useForm({
			defaultValues: {},
		});

		return (
			<Fragment ref={ref} {...rest}>
				{onImportCusts && (
					<ButtonEx
						responsive
						onClick={onImportCusts}
						endIcon={<SearchIcon />}
						color="primary"
						variant="outlined">
						帶入客戶
					</ButtonEx>
				)}

				<ButtonEx
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
					{...rest}>
					取消
				</ButtonEx>
				<ButtonEx
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ButtonEx>
				{/* 帶入商品 */}
				<FormProvider {...form}>
					<B012ImportCustsDialogContainer />
				</FormProvider>
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


