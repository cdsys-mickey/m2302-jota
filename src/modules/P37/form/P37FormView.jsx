import TourGroupTypePicker from "@/components/TourGroupTypePicker/TourGroupTypePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import { memo } from "react";
import P37GridContainer from "../grid/P37GridContainer";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import PropTypes from "prop-types";
import FlexBox from "@/shared-components/FlexBox";
import P37Toolbar from "../P37Toolbar";

const P37FormView = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<FormBox {...rest}>
				<form>
					<FormSectionBox editing>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<TourGroupTypePicker
									name="GrpType"
									label="團種類"
									fullWidth
									select
									size="small"
								/>
							</Grid>
						</Grid>
						<P37Toolbar />
						{/* <FlexBox sx={{ width: "900px" }} > */}
						<P37GridContainer slotProps={{
							box: {
								// mt: 1,
								// width: "600px"
							}
						}} />
						{/* </FlexBox> */}
					</FormSectionBox>
				</form>
			</FormBox>
		</ContainerEx >
	);
})

P37FormView.propTypes = {
	loadError: PropTypes.object,
	slotProps: PropTypes.object
}

P37FormView.displayName = "P37FormView";
export default P37FormView;