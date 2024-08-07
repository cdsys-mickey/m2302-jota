import TaxTypes from "@/modules/md-tax-types";
import { Box, Grid, Tab } from "@mui/material";
import { memo } from "react";

import A01 from "@/modules/md-a01";
import Strings from "@/modules/md-strings";
import YesNo from "@/modules/md-yes-no";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import CmsTypePicker from "../../../picker/CmsTypePicker";
import CounterPicker from "../../../picker/CounterPicker";
import { PkgTypePicker } from "../../../picker/PkgTypePicker";
import ProdCatLPicker from "../../../picker/ProdCatLPicker";
import ProdCatMPicker from "../../../picker/ProdCatMPicker";
import ProdCatSPicker from "../../../picker/ProdCatSPicker";
import ProdTypeAPicker from "../../../picker/ProdTypeAPicker";
import ProdTypeBPicker from "../../../picker/ProdTypeBPicker";
import TaxTypePicker from "../../../picker/TaxTypePicker";
import { A01ProdComboGridContainer } from "./combo/A01ProdComboGridContainer";
import { A01ProdTransGridContainer } from "./trans/A01ProdTransGridContainer";
import ContainerEx from "../../../../shared-components/ContainerEx";

const A01Form = memo((props) => {
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
			{readError && <FormErrorBox error={readError} />}
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
							{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
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
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={6}>
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
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											label="條碼"
											name="Barcode"
											fullWidth
											// value={data?.Barcode}
											readOnly={storeMode}
										/>
									</Grid>
									<FlexBox fullWidth />
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
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
								<Grid
									container
									columns={12}
									spacing={editing ? 1 : 1}>
									<Grid item xs={12} sm={12} md={4}>
										<ProdCatLPicker
											typo
											name="catL"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<ProdCatMPicker
											typo
											name="catM"
											readOnly={storeMode}
											disableOpenOnInput
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
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
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
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
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="SafeQty"
											label="平日安全存量"
											type="number"
											readOnly={storeMode}
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
											name="cmsType"
											readOnly={storeMode}
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
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>換算率</FormSectionTitle>
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
								<Grid container columns={12} spacing={1}>
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
							<FormSectionBox
								pt={editing ? 1.5 : 1}
								pb={1}
								mb={1}
								px={1}>
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

A01Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	storeMode: PropTypes.bool,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleTabChange: PropTypes.func,
	readError: PropTypes.object,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	transTabDisabled: PropTypes.bool,
	comboTabDisabled: PropTypes.bool,
};

A01Form.displayName = "A01Form";
export default A01Form;
