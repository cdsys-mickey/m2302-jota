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
import FormBox from "../../../shared-components/form/FormBox";

const A17Form = memo((props) => {
	const {
		readMessage,
		readWorking,
		itemDataReady,
		editing,
		updating,
		readFailed,
		readError,
		handleDeptChanged,
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

				<FormBox pt={0}>
					<FormSectionBox editing pb={1}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12}>
								<AppDeptPicker
									label="門市編號"
									name="dept"
									// readOnly={true}
									onChanged={handleDeptChanged}
									disabled
								/>
							</Grid>
							{readWorking && (
								<FlexBox justifyContent="center" mt="20%">
									<LoadingTypography
										iconSize="lg"
										variant="h5">
										讀取中...
									</LoadingTypography>
								</FlexBox>
							)}
							{itemDataReady && (
								<Grid item xs={12}>
									<TextFieldWrapper
										type="password"
										typo
										name="StockPword"
										label="強迫出貨密碼"
										autoFocus
										fullWidth
									/>
								</Grid>
							)}
						</Grid>
					</FormSectionBox>
				</FormBox>
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
	handleDeptChanged: PropTypes.func,
};

A17Form.displayName = "A17Form";
export default A17Form;
