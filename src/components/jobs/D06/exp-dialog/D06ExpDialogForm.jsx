import { Grid } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import ProdPicker from "@/components/picker/ProdPicker";

const D06ExpDialogForm = memo((props) => {
	const { onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<FormBox pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ProdPicker
							autoFocus
							label="商品"
							name="expProd"
							required
							// filterByServer
							// queryRequired
							virtualize
							typeToSearchText="以編號,條碼或名稱搜尋"
							triggerDelay={100}
							rules={{
								required: "商品為必填",
							}}
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

D06ExpDialogForm.propTypes = {
	onSubmit: PropTypes.func,
};

D06ExpDialogForm.displayName = "D06ExpDialogForm";
export default D06ExpDialogForm;
