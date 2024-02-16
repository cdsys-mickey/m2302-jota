import { Container, Grid, Typography } from "@mui/material";
import { memo } from "react";
import { ControlledUnusedModulePicker } from "@/components/picker/ControlledUnsuedModulePicker";
import FlexBox from "@/shared-components/FlexBox";

const ZA03AddAuthForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FlexBox py={1}>
			<Container maxWidth="md">
				<Grid container>
					<Grid item xs={12}>
						<ControlledUnusedModulePicker
							name="modules"
							autoFocus
						/>
					</Grid>
				</Grid>
				<Typography variant="subtitle2" color="text.secondary">
					*下拉選單展開時按住 Ctrl 進行複選
				</Typography>
			</Container>
		</FlexBox>
	);
});

ZA03AddAuthForm.propTypes = {};

ZA03AddAuthForm.displayName = "ZA03AddAuthForm";
export default ZA03AddAuthForm;
