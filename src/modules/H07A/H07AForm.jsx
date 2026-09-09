import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import ProdPicker from "@/components/picker/ProdPicker";
import { PrintReportButton } from "@/components";
import ProdFreeTypePicker from "@/components/prod-free-type-picker/ProdFreeTypePicker";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H07AOrderTypePicker from "./pickers/H07AOrderTypePicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import H07AReportTypePicker from "./pickers/H07AReportTypePicker";
import EmployeePicker from "@/components/picker/EmployeePicker";

const H07AForm = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth={"30rem"} alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間1"
									leftComponent={<DatePickerWrapper name="SDate1"
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper name="EDate1"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間2"
									leftComponent={<DatePickerWrapper name="SDate2"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper name="EDate2"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<SalesTypePicker
									name="SalType"
									label="零售"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} >
								<EmployeePicker
									label="業務員"
									name="employee"
									virtualize
									disableOpenOnInput
									selectOnFocus
									multiple
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<OrderDirPicker
									name="orderDir"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>

						</Grid>
						<FlexBox mt={2}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="flex-start">
										<StdPrintOutputModePicker
											required
											name="outputType"
											label="執行方式"
										/>
									</FlexBox> */}
								</Grid>
								<Grid item xs={12} sm={6}>
									<FlexBox justifyContent="flex-end">
										<PrintReportButton
											color="primary"
											variant="contained"
											onSubmit={onSubmit}
											onDebugSubmit={onDebugSubmit}
										/>
									</FlexBox>
								</Grid>
							</Grid>
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form >
		</ContainerEx >
	);
});

H07AForm.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H07AForm.displayName = "H07AForm";
export default H07AForm;






