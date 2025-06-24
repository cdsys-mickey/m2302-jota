import { useContext } from "react";
import { ButtonEx } from "@/shared-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { C03Context } from "@/contexts/C03/C03Context";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const C03ReviewButtonContainer = (props) => {
	const { label = "覆核", ...rest } = props;
	const c03 = useContext(C03Context);

	const index = useMemo(() => {
		return c03.getCurrentIndex();
	}, [c03]);

	const _label = useMemo(() => {
		return index !== null ? `覆核 (${index})` : "覆核";
	}, [index]);

	if (!c03.canReview || !!c03.itemData?.Checker_N) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			startIcon={<CheckCircleOutlineIcon />}
			color="success"
			onClick={c03.promptReview}
			{...rest}>
			{_label}
		</ButtonEx>
	);
};
C03ReviewButtonContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
C03ReviewButtonContainer.displayName = "C03ReviewButtonContainer";
