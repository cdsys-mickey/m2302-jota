import { TextFieldEx } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import CmsCalcTypePicker from "@/components/CmsCalcTypePicker/CmsCalTypePicker";
import P38Toolbar from "../P38Toolbar";

const P38FormView = memo((props) => {
	const { loadError, loadWorking, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<FormBox {...rest}>
				<form>
					<FormSectionBox pt={0.5}>
						{loadError ? <FormErrorBox error={loadError} /> : (
							<>
								<P38Toolbar />

								<Box mt={1}>
									{loadWorking ? <LoadingTypography>讀取中</LoadingTypography> : (<Grid container spacing={2}>
										<Grid item xs={12}>
											<TextFieldEx
												name="Head"
												label="表頭"
												typo
												multiline
												fullWidth
											/>
										</Grid>
										<Grid item xs={12}>
											<TextFieldEx
												name="Tail"
												label="表尾"
												typo
												multiline
												minRows={2}
												fullWidth
											/>
										</Grid>
										<Grid item xs={12}>
											<CmsCalcTypePicker
												typo
												label="佣金計算"
												name="CmsCalc"
												fullWidth
											/>
										</Grid>
									</Grid>)}

								</Box>
							</>)
						}

					</FormSectionBox>
				</form>
			</FormBox>
		</ContainerEx >
	);
})

P38FormView.propTypes = {
	loadError: PropTypes.object,
	loadWorking: PropTypes.bool,
	slotProps: PropTypes.object
}

P38FormView.displayName = "P38FormView";
export default P38FormView;
