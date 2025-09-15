import { A22GridContainer } from "@/components/jobs/A22/A22GridContainer";
import { A22GridFormContainer } from "@/components/jobs/A22/A22GridFormContainer";
import { A22GridToolbarFormContainer } from "@/components/jobs/A22/A22GridToolbarFormContainer";
import { FrameBanner, FrameBox, JumboAlert } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const A22Frame = memo((props) => {
	const { loading, ...rest } = props;

	return (
		<FrameBox {...rest}>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<A22GridFormContainer />
				</Box>
			</ContainerEx>
			{loading == null ? (
				<Container maxWidth="sm">
					<Box pt="8vh">
						<JumboAlert
							label="請先輸入篩選條件，按下「讀取」後再進行修改"
							// severity="info"
							icon={ManageSearchIcon}

						/>
					</Box>
				</Container>

			) : (
				<Box>
					<A22GridToolbarFormContainer />
					<A22GridContainer />
				</Box>
			)}
		</FrameBox>
	);
});

A22Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool
};

A22Frame.displayName = "A22Frame";
export default A22Frame;
