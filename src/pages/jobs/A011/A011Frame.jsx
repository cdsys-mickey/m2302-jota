import { A011GridContainer } from "@/components/jobs/A011/A011GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import { FrameBanner, FrameBox, JumboAlert } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A011Frame = memo((props) => {
	const { loading, ...rest } = props;

	return (
		<FrameBox {...rest}>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			{loading == null ? (
				<Container maxWidth="sm">
					<Box pt="8vh">
						<JumboAlert
							label="請先輸入篩選條件，按下「讀取資料」後再進行修改"
							// severity="info"
							icon={ManageSearchIcon}

						/>
					</Box>
				</Container>
			) : (
				<Box>
					<ProdGridToolbarContainer />
					<A011GridContainer />
				</Box>
			)
			}

		</FrameBox >
	);
});

A011Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool
};

A011Frame.displayName = "A011Frame";
export default A011Frame;
