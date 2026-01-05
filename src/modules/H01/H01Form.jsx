import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import ProdPicker from "@/components/picker/ProdPicker";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import H01OrderTypePicker from "./pickers/H01OrderTypePicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";

const H01Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth={"30rem"} alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										minDate={"2026/01/01"}
										name="SDate"
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										format="yyyy/MM/dd"
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										minDate={"2026/01/01"}
										name="EDate"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="貨品區間"
									leftComponent={<ProdPicker
										name="SProdID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"

									/>}
									rightComponent={<ProdPicker
										name="EProdID"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"

									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<FlexBox sx={{ gap: 1 }}>
									<CheckboxExField
										label="含撥出入"
										name="InclTX"
										defaultValue={true}
										variant="outlined"
										size="small"
									// fullWidth
									/>
									<CheckboxExField
										label="含試贈樣"
										name="InclTest"
										defaultValue={true}
										variant="outlined"
										size="small"
									// fullWidth
									/>

								</FlexBox>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H01OrderTypePicker
									name="orderType"
									disableOpenOnInput
									selectOnFocus
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
						<FlexBox mt={1.8}>
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

H01Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSelect: PropTypes.func,
	onSubmit: PropTypes.func,
	onExport: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H01Form.displayName = "H01Form";
export default H01Form;


