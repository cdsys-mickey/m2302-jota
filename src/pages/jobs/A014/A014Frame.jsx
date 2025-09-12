import { A014GridContainer } from "@/components/jobs/A014/A014GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { CustomAlert, FrameBanner, FrameBox } from "@/shared-components";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const A014Frame = memo((props) => {
	const { loading, ...rest } = props;

	return (
		<FrameBox {...rest}>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer />
				</Box>
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
					<A014GridContainer />
				</Box>
			)
			}
		</FrameBox>
	);
});

A014Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool
};

A014Frame.displayName = "A014Frame";
export default A014Frame;
