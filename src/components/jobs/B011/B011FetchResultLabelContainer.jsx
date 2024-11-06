import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B011Context } from "@/contexts/B011/B011Context";
import PropTypes from "prop-types";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

export const B011FetchResultLabelContainer = (props) => {
	const { forNew = false } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	return (
		<FetchResultLabel
			totalElements={b011.itemCount}
			startIndex={b011.visibleStartIndex}
			endIndex={b011.visibleStopIndex}
		/>
	);
};
B011FetchResultLabelContainer.propTypes = {
	forNew: PropTypes.bool
}
B011FetchResultLabelContainer.displayName = "B011FetchResultLabelContainer";

