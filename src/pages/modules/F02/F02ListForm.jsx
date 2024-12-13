import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const F02ListForm = memo((props) => {
	const { ...rest } = props;

	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						label="盤點日期"
						inline
						typo
						name="ActDate"
						editing={false}
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

F02ListForm.propTypes = {

}

F02ListForm.displayName = "F02ListForm";
export default F02ListForm;
