import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import A02Grid from "../../components/modules/a02/A02Grid";
import A02GridContainer from "@/components/modules/a02/A02GridContainer";
import A02Toolbar from "../../components/modules/a02/A02Toolbar";

const A02Frame = memo(() => {
	return (
		<Box pt={1}>
			<FrameBanner title="商品包裝代碼維護作業" />
			<A02Toolbar />
			<A02GridContainer />
		</Box>
	);
});

A02Frame.propTypes = {};

A02Frame.displayName = "A02Frame";
export default A02Frame;
