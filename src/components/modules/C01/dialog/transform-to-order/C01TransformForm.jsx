import { Grid, Typography } from "@mui/material";
import FlexBox from "../../../../../shared-components/FlexBox";
import { EmployeePicker } from "../../../../picker/EmployeePicker";

const C01TransformForm = (props) => {
	const { ...rest } = props;
	return (
		<FlexBox py={1}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography>請選擇採購單的製單人員</Typography>
				</Grid>
				<Grid item xs={12}>
					<EmployeePicker
						required
						name="employee"
						label="製單人員"
						rules={{
							required: "製單人員為必填",
						}}
					/>
				</Grid>
			</Grid>
		</FlexBox>
	);
};

C01TransformForm.propTypes = {};

C01TransformForm.displayName = "C01TransformForm";
export default C01TransformForm;
