import TourGroupTypePicker from "@/components/TourGroupTypePicker/TourGroupTypePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P37XGridContainer from "../grid/P37XGridContainer";
import P37XToolbar from "../P37XToolbar";
import { Box } from "@mui/system";

const P37XFormView = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<FormBox {...rest}>
				<form>
					<FormSectionBox pt={1.5}>
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
						<Box my={0.5}>
							<P37XToolbar />
						</Box>
						{/* <FlexBox sx={{ width: "900px" }} > */}
						<P37XGridContainer slotProps={{
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

P37XFormView.propTypes = {
	loadError: PropTypes.object,
	slotProps: PropTypes.object
}

P37XFormView.displayName = "P37XFormView";
export default P37XFormView;
