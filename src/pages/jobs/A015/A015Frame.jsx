import { A015GridContainer } from "@/components/jobs/A015/A015GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { CustomAlert, FrameBanner, FrameBox } from "@/shared-components";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const A015Frame = memo((props) => {
	const { loading, ...rest } = props;

	return (
		<FrameBox {...rest}>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer safeQty />
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
					<A015GridContainer />
				</Box>
			)
			}
		</FrameBox>
	);
});

A015Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	loading: PropTypes.bool
};

A015Frame.displayName = "A015Frame";
export default A015Frame;
