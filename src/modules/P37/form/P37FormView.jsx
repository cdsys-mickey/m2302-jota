import TourGroupTypePicker from "@/components/TourGroupTypePicker/TourGroupTypePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const P37FormView = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="md" alignLeft>
			<FormBox {...rest}>
				<FormSectionBox editing>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<TourGroupTypePicker
								name="GrpType"
								label="團種類"
								fullWidth
							/>
						</Grid>
					</Grid>
				</FormSectionBox>
			</FormBox>
		</ContainerEx>
	);
})

P37FormView.propTypes = {

}

P37FormView.displayName = "P37FormView";
export default P37FormView;