import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import ErrorBox from "../../../shared-components/ErrorBox";
import FlexBox from "../../../shared-components/FlexBox";
import LoadingTypography from "../../../shared-components/LoadingTypography";
import FormSectionBox from "../../../shared-components/form/FormSectionBox";
import AppDeptPicker from "../../fields/AppDeptPicker";
import { TextFieldWrapper } from "../../../shared-components/text-field/TextFieldWrapper";

const A17Form = memo((props) => {
	const {
		readWorking,
		itemDataReady,
		editing,
		updating,
		readFailed,
		readError,
		...rest
	} = props;

	// if (readWorking) {
	// 	return (
	// 		<ContainerEx maxWidth="xs" alignLeft>
	// 			<DSGLoading height={300} hideTitle />
	// 		</ContainerEx>
	// 	);
	// }

	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest}>
				{readFailed && <ErrorBox error={readError} />}
				{readWorking && (
					<FlexBox justifyContent="center" mt="20%">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				)}
				{itemDataReady && (
					<Box
						pt={1}
						sx={() => ({
							"& .MuiInputLabel-root": {
								fontSize: "105%",
								// fontWeight: 500,
								// color: "rgba(0, 0, 0, 0.8 )",
							},
							"& .MuiInputLabel-shrink": {
								fontSize: "120%",
								fontWeight: 600,
								left: "-2px",
								// color: theme.palette.primary.main,
							},
						})}>
						<FormSectionBox py={1}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12}>
									<AppDeptPicker
										typo
										name="dept"
										readOnly={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextFieldWrapper
										typo
										name="StockPword"
										label="強迫出貨密碼"
										autoFocus
										fullWidth
										// readOnly={updating}
									/>
								</Grid>
							</Grid>
						</FormSectionBox>
					</Box>
				)}
			</form>
		</ContainerEx>
	);
});

A17Form.propTypes = {
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A17Form.displayName = "A17Form";
export default A17Form;
