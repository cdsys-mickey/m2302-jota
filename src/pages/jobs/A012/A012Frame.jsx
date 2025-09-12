import { A012GridContainer } from "@/components/jobs/A012/A012GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import { CustomAlert, FrameBanner, FrameBox } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const A012Frame = memo((props) => {
	const { loading, ...rest } = props;
	return (
		<FrameBox {...rest}>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			{loading == null ? (
				<Container maxWidth="sm">
					<Box pt="15vh">
						<CustomAlert
							label="請先輸入篩選條件，按下「讀取資料」後再進行修改"
							severity="info"
							icon={ManageSearchIcon}
						/>
					</Box>
				</Container>
			) : (
				<Box>
					<ProdGridToolbarContainer />
					<A012GridContainer />
				</Box>
			)
			}
		</FrameBox>
	);
});

A012Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool
};

A012Frame.displayName = "A012Frame";
export default A012Frame;
