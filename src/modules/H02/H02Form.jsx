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

const H02Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SalYM"
									label="銷售年月"
									fullWidth
									validate
									clearable
									autoFocus
									views={['year', 'month']}
									format="yyyy/MM"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>

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
							<Grid item xs={3} >
								<FlexBox alignItems="flex-start">
									<CheckboxExField
										label="含撥出入"
										name="InclTX"
										defaultValue={true}
										variant="outlined"
										size="small"
										fullWidth
									/>
								</FlexBox>
							</Grid>
							<Grid item xs={3} >

								<CheckboxExField
									label="含試贈樣"
									name="InclTest"
									defaultValue={true}
									variant="outlined"
									size="small"
									fullWidth
								/>
							</Grid>
						</Grid>

						<FlexBox mt={1.8}>
							<Grid container spacing={2}>

								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="center">
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
			</form>
		</ContainerEx>
	);
});

H02Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H02Form.displayName = "H02Form";
export default H02Form;



