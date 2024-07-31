import PropTypes from "prop-types";
import React, { memo } from "react";
import { RHFTabTestProvider } from "./RHFTabTestProvider";
import { RhfTabTestFormContainer } from "./RhfTabTestFormContainer";

const RhfTabTestPage = memo((props) => {
	return (
		<RHFTabTestProvider>
			<RhfTabTestFormContainer />
		</RHFTabTestProvider>
	);
});

RhfTabTestPage.propTypes = {};
RhfTabTestPage.displayName = "RhfTabTestPage";
export default RhfTabTestPage;
