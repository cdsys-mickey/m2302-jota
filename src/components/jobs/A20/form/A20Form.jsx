import { Box, Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { PackageTypeLabelContainer } from "./fields/PackageTypeLabelContainer";
import { A20ProdMaterialsGridContainer } from "./prods/A20ProdMaterialsGridContainer";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import ProdPicker from "../../../picker/ProdPicker";

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
					<FormSectionTitle>基本資料</FormSectionTitle>
					{/* <FormSectionBox pt={editing ? 1.5 : 0.5} pb={editing ? 0 : 1} mb={2} px={1}> */}
					<FormSectionBox editing={editing} pb={0}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<ProdPicker
									typo
									name="prod"
									label="貨品"
									autoFocus
									fullWidth
									required
									withBomPackageName
									rules={{ required: "對應貨品為必填" }}
									readOnly={updating}
									disableOpenOnInput
									selectOnFocus
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
						</Grid>
					</FormSectionBox>
					<FormSectionBox p={1} pt={0} mb={2}>
						<FormSectionTitle>原物料</FormSectionTitle>
						<A20ProdMaterialsGridContainer />
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
