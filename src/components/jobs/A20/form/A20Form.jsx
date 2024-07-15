import { Box, Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { TextFieldWrapper } from "../../../../shared-components/text-field/TextFieldWrapper";
import { PackageTypeLabelContainer } from "./fields/PackageTypeLabelContainer";
import TypoProdPickerContainer from "./fields/TypoProdPickerContainer";
import { ProdMaterialsGridContainer } from "./prods/ProdMaterialsGridContainer";
import FormBox from "../../../../shared-components/form/FormBox";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";

const A20Form = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
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
			{readError && <FormErrorBox error={readError} />}
			{itemDataReady && (
				<FormBox pt={1}>
					<FormSectionTitle>關連貨品基本資料</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2} px={1}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={6}>
								<TypoProdPickerContainer
									name="prod"
									label="貨品"
									autoFocus
									fullWidth
									required
									withBomPackageName
									rules={{ required: "對應貨品為必填" }}
									readOnly={updating}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextFieldWrapper
									typo
									name="ProdQty"
									label="製造量"
									type="number"
									fullWidth
									required
									rules={{ required: "製造量為必填" }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<PackageTypeLabelContainer
									name="prod.PackData_N"
									label="包裝說明">
									{data?.PackData_N}
								</PackageTypeLabelContainer>
							</Grid>
							<FlexBox fullWidth />
						</Grid>
					</FormSectionBox>
					<FormSectionBox p={1} pt={0} mb={2}>
						<FormSectionTitle>原物料</FormSectionTitle>
						<ProdMaterialsGridContainer />
					</FormSectionBox>
				</FormBox>
			)}
		</form>
	);
});

A20Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
};

A20Form.displayName = "A20Form";
export default A20Form;
