import { Container, FormHelperText, Grid, Typography } from "@mui/material";
import { memo } from "react";
import { ControlledUnusedModulePicker } from "@/components/picker/ControlledUnsuedModulePicker";
import { FlexBox } from "shared-components";
import { ZA03AddPositionPickerContainer } from "./ZA03AddPositionPickerContainer";
import FlexGrid from "../../../../shared-components/FlexGrid";

const ZA03AddAuthForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FlexBox py={1}>
			<Container maxWidth="md">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ControlledUnusedModulePicker
							name="modules"
							autoFocus
							required
							rules={{
								required: "至少選擇一個作業",
							}}
						/>
					</Grid>
					<FlexGrid item xs={12} alignItems="center">
						<ZA03AddPositionPickerContainer
							label="附加在"
							name="position"
						/>
					</FlexGrid>
				</Grid>
				{/* <FormHelperText>
					*點擊選單項目時按住 Ctrl 可進行複選
				</FormHelperText> */}
			</Container>
		</FlexBox>
	);
});

ZA03AddAuthForm.propTypes = {};

ZA03AddAuthForm.displayName = "ZA03AddAuthForm";
export default ZA03AddAuthForm;
