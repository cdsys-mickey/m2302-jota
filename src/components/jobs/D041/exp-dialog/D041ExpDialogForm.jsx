import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FormBox from "@/shared-components/form/FormBox";
import ProdPicker from "../../../picker/ProdPicker";

const D041ExpDialogForm = memo((props) => {
	const { onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<FormBox pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ProdPicker
							name="expProd"
							label="商品"
							autoFocus
							required
							// filterByServer
							virtualize
							typeToSearchText="以編號,條碼或名稱搜尋"
							triggerDelay={100}
							rules={{
								required: "商品為必填",
							}}
							disableOpenOnInput
						/>
					</Grid>
					<Grid item xs={12}>
						<DatePickerWrapper label="有效日期" name="expDate" validate />
					</Grid>
				</Grid>
			</FormBox>
		</form>
	);
});

D041ExpDialogForm.propTypes = {
	onSubmit: PropTypes.func,
};

D041ExpDialogForm.displayName = "D041ExpDialogForm";
export default D041ExpDialogForm;
