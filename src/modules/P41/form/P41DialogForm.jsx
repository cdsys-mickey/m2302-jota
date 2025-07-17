import { Grid } from "@mui/material";
import { memo } from "react";

import BankPicker from "@/components/BankPicker/BankPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import { CheckboxEx, DatePickerEx, FormFieldLabel, TimePickerEx } from "@/shared-components";
import DateFormats from "@/shared-modules/DateFormats.mjs";
import CmsCityPicker from "@/components/CmsCityPicker/CmsCityPicker";
import CmsAreaPicker from "@/components/CmsAreaPicker/CmsAreaPicker";
import CmsGroupTypePicker from "@/components/CmsGroupTypePicker/CmsGroupTypePicker";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import CmsCustTypePicker from "@/components/CmsCustTypePicker/CmsCustTypePicker";

const P41DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
		slotProps,
		onCityChange,
		onTourGuideChange,
		onTourGroupChange,
		onBusCompChange,
		cflagDisabled,
		...rest
	} = props;
	return (
		<form {...rest}>
			{readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)}
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={1}>
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={2}>
								<TextFieldWrapper
									typo
									name="OrdID"
									label="預約單號"
									// autoFocus
									fullWidth
									value={data?.OrdID}
									// required
									// rules={{ required: "廠商代碼為必填" }}
									// readOnly={updating}
									disabled
								// slotProps={{
								// 	htmlInput: {
								// 		maxLength: 6
								// 	}
								// }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<DatePickerEx
									typo
									name="OrdDate"
									label="訂訪日"
									autoFocus
									fullWidth
									required
									variant="outlined"
									validate
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<DatePickerEx
									typo
									name="ArrDate"
									label="到訪日"
									fullWidth
									required
									variant="outlined"
									validate
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2.5}>
								<TimePickerEx
									label="到訪時間"
									typo
									name="ArrHM"
									fullWidth
									validate
									clearable
									placeholder="起"
									variant="outlined"
									views={['hours', 'minutes']}
									format={DateFormats.DATEFNS_TIME}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={1.5}>
								<CheckboxEx
									typo
									label="結清"
									name="CFlag"
									variant="outlined"
									disabled={cflagDisabled}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={7}>
								<TextFieldWrapper
									typo
									name="GrpName"
									label="團體名稱"
									fullWidth
								// required
								// rules={{
								// 	required: "名稱為必填",
								// }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<CmsCityPicker
									typo
									name="city"
									onChange={onCityChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<CmsAreaPicker
									typo
									name="area"
									disabled
									disableOpenOnInput
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<CmsGroupTypePicker
									typo
									name="GrpType"
									label="種類"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<CmsCustTypePicker
									typo
									name="custType"
									label="客源型態"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<CmsBusCompPicker
									typo
									name="busComp"
									label="車行"
									fullWidth
									forId
									onChange={onBusCompChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="CarData_N"
									label="車行名稱"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextFieldWrapper
									typo
									name="CarQty"
									label="車數"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="PugAmt"
									label="提貨券金額"
									fullWidth
									type="number"
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CarNo"
									label="車號"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="DrvName"
									label="司機姓名"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 8
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={5}>
								<TextFieldWrapper
									typo
									name="DrvTel"
									label="司機電話"
									fullWidth
								// slotProps={{
								// 	htmlInput: {
								// 		maxLength: 2
								// 	}
								// }}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>

							<Grid item xs={12} sm={12} md={3}>
								<TourGroupPicker
									typo
									name="tourGroup"
									label="旅行社代號"
									fullWidth
									forId
									onChange={onTourGroupChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="TrvData_N"
									label="旅行社名稱"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<TourGuidePicker
									typo
									name="tourGuide"
									label="導遊代號"
									fullWidth
									forId
									onChange={onTourGuideChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="CndName"
									label="導遊姓名"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={5}>
								<TextFieldWrapper
									typo
									name="CndTel"
									label="導遊電話"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<EmployeePicker
									typo
									name="employee"
									label="業務員"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="Remark"
									label="備註"
									fullWidth
									multiline
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								{/* <FormFieldLabel name="TrxDate" label="已訪日" /> */}
								{/* <TextFieldWrapper
									typo
									name="TrxDate"
									label="已訪日"
									fullWidth
									disabled
								/> */}
								<DatePickerEx
									typo
									name="TrxDate"
									label="已訪日"
									fullWidth
									variant="outlined"
									// validate
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="ComID"
									label="佣金單號"
									fullWidth
									disabled
								/>
								{/* <FormFieldLabel name="ComID" label="佣金單號" /> */}
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox >
			)}
		</form >
	);
});

P41DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
	onCityChange: PropTypes.func,
	onTourGuideChange: PropTypes.func,
	onTourGroupChange: PropTypes.func,
	onBusCompChange: PropTypes.func,
	cflagDisabled: PropTypes.bool
};

P41DialogForm.displayName = "P41Form";
export default P41DialogForm;



