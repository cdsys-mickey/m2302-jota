import { Box, Grid, Tab } from "@mui/material";
import { memo } from "react";

import CmsTypePicker from "@/components/picker/CmsTypePicker";
import CounterPicker from "@/components/picker/CounterPicker";
import { PkgTypePicker } from "@/components/picker/PkgTypePicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import ProdTypeBPicker from "@/components/picker/ProdTypeBPicker";
import TaxTypePicker from "@/components/picker/TaxTypePicker";
import A01 from "@/modules/A01.mjs";
import YesNo from "@/modules/md-yes-no";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { useScrollable } from "@/shared-hooks/useScrollable";
import Strings from "@/shared-modules/sd-strings";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { A01ProdComboGridContainer } from "./combo/A01ProdComboGridContainer";
import { A01ProdTransGridContainer } from "./trans/A01ProdTransGridContainer";

const A01DialogForm = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		storeMode,
		// TAB
		selectedTab,
		handleTabChange,
		height,
		transTabDisabled,
		comboTabDisabled,
		slotProps,
		handleInvDataFocused,
		...rest
	} = props;

	const scrollable = useScrollable({
		height: height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

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
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={0}>
					<TabContext value={selectedTab}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList
								onChange={handleTabChange}
								aria-label="lab API tabs example">
								<Tab label="基本資料" value={A01.Tabs.INFO} />
								<Tab
									label="調撥成本"
									value={A01.Tabs.TRANS}
									disabled={transTabDisabled}
								/>
								<Tab
									label="組合商品"
									value={A01.Tabs.COMBO}
									disabled={comboTabDisabled}
								/>
							</TabList>
						</Box>
						<TabPanel
							value={A01.Tabs.INFO}
							sx={[scrollable.scroller]}>
							<FormSectionTitle>品名及規格</FormSectionTitle>
							<FormSectionBox editing={editing}>
								<Grid
									container
									columns={12}
									spacing={editing ? 1 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="ProdID"
											label="貨品編號"
											autoFocus={creating}
											fullWidth
											// value={data?.ProdID}
											required
											rules={{
												required: "貨品編號為必填",
											}}
											readOnly={updating}
											slotProps={{
												htmlInput: {
													maxLength: 13
												}
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={5}>
										<TextFieldWrapper
											typo
											name="ProdData"
											label="品名規格"
											fullWidth
											required
											rules={{
												required: "品名規格為必填",
											}}
											readOnly={storeMode}>
											{data?.ProdData}
										</TextFieldWrapper>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<TextFieldWrapper
											typo
											label="發票印製名稱"
											name="InvData"
											fullWidth
											readOnly={storeMode}
											slotProps={{
												htmlInput: {
													maxLength: 13
												}
											}}
											onFocus={handleInvDataFocused}
										/>
									</Grid>
									{/* <FlexBox fullWidth /> */}
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="條碼"
											name="Barcode"
											fullWidth
											// value={data?.Barcode}
											readOnly={storeMode}
											slotProps={{
												htmlInput: {
													maxLength: 13
												}
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<CheckboxExWrapper
											typo
											label="列印條碼"
											defaultValue="N"
											name="BarPR"
											readOnly={storeMode}
											valueToChecked={
												YesNo.valueToChecked
											}
											checkedToValue={
												YesNo.checkedToValue
											}
											getLabel={YesNo.getOptionLabel}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>分類</FormSectionTitle>
							<FormSectionBox editing={editing}>
								<Grid
									container
									columns={12}
									spacing={editing ? 1 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<ProdCatLPicker
											typo
											name="catL"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<ProdCatMPicker
											typo
											name="catM"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<ProdCatSPicker
											typo
											name="catS"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
							<FormSectionTitle>成本</FormSectionTitle>
							<FormSectionBox editing={editing}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={12} md={3}>
										<ProdTypeAPicker
											typo
											name="typeA"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={3}>
										<ProdTypeBPicker
											typo
											name="typeB"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TaxTypePicker
											typo
											name="taxType"
											label="稅別"
											// defaultValue={TaxTypes.findById(
											// 	"T"
											// )}
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<CounterPicker
											label="櫃別"
											typo
											name="counter"
											autoFocus={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="StdCost"
											label="標準成本"
											type="number"
											readOnly={storeMode}
											renderLabel={Strings.formatPrice}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="TranCost"
											label="調撥成本"
											type="number"
											readOnly={storeMode}
											renderLabel={Strings.formatPrice}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="LocalCost"
											label="批發成本(本)"
											type="number"
											readOnly={storeMode}
											renderLabel={Strings.formatPrice}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="OutCost"
											label="批發成本(外)"
											type="number"
											readOnly={storeMode}
											renderLabel={Strings.formatPrice}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
							<FormSectionTitle>安全存量</FormSectionTitle>
							<FormSectionBox editing={editing}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="SafeQty"
											label="平日安全存量"
											type="number"
											// readOnly={storeMode}
											fullWidth
											renderLabel={Strings.formatPrice}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="儲位"
											name="Location"
											readOnly={storeMode}
											fullWidth
											renderLabel={Strings.formatPrice}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={4}>
										<CmsTypePicker
											typo
											label="佣金類別"
											name="cmsType"
											// readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>包裝單位</FormSectionTitle>
							<FormSectionBox pt={1} pb={1} mb={1} px={1}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={12} md={3}>
										<PkgTypePicker
											typo
											name="bunit"
											label="庫存"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<PkgTypePicker
											typo
											name="sunit"
											label="銷售"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<PkgTypePicker
											typo
											name="iunit"
											label="進貨"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<PkgTypePicker
											typo
											name="munit"
											label="BOM"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<FlexBox justifyContent="flex-end">
											<FormSectionTitle>換算率</FormSectionTitle>
										</FlexBox>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="銷/存"
											type="number"
											name="SRate"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="進/存"
											type="number"
											name="IRate"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="BOM/存"
											type="number"
											name="MRate"
											readOnly={storeMode}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>售價</FormSectionTitle>
							<FormSectionBox editing={editing}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="建議售價"
											name="Price"
											type="number"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="售價A"
											type="number"
											name="PriceA"
											readOnly={storeMode}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="售價B"
											type="number"
											name="PriceB"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="售價C"
											type="number"
											name="PriceC"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="售價D"
											type="number"
											name="PriceD"
											readOnly={storeMode}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TextFieldWrapper
											typo
											label="售價E"
											type="number"
											name="PriceE"
											readOnly={storeMode}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
						</TabPanel>
						<TabPanel value={A01.Tabs.TRANS}>
							<ContainerEx maxWidth="sm" alignLeft>
								<A01ProdTransGridContainer />
							</ContainerEx>
						</TabPanel>
						<TabPanel value={A01.Tabs.COMBO}>
							<ContainerEx maxWidth="sm" alignLeft>
								<A01ProdComboGridContainer />
							</ContainerEx>
						</TabPanel>
					</TabContext>
				</FormBox>
			)}
		</form>
	);
});

A01DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	storeMode: PropTypes.bool,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleTabChange: PropTypes.func,
	handleInvDataFocused: PropTypes.func,
	readError: PropTypes.object,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	transTabDisabled: PropTypes.bool,
	comboTabDisabled: PropTypes.bool,
	slotProps: PropTypes.object,
};

A01DialogForm.displayName = "A01Form";
export default A01DialogForm;
