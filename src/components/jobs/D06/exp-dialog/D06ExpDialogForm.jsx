import { Grid } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "../../../../shared-components/form/FormBox";

const D06ExpDialogForm = memo((props) => {
	const { onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<FormBox pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ProdPickerContainer
							autoFocus
							label="商品"
							name="expProd"
							required
							filterByServer
							queryRequired
							typeToSearchText="以編號,條碼或名稱搜尋"
							triggerDelay={100}
							rules={{
								required: "商品為必填",
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<DatePickerWrapper label="有效日期" name="expDate" />
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
