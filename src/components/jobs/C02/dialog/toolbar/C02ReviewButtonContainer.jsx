import { useContext } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { C02Context } from "@/contexts/C02/C02Context";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const C02ReviewButtonContainer = (props) => {
	const { children = "覆核", ...rest } = props;
	const c02 = useContext(C02Context);

	const index = useMemo(() => {
		return c02.getCurrentIndex();
	}, [c02]);

	const label = useMemo(() => {
		return index !== null ? `覆核 (${index})` : "覆核";
	}, [index]);

	if (!c02.canReview || !!c02.itemData?.Checker_N) {
		return false;
	}

	return (
		<ButtonWrapper
			responsive
			startIcon={<CheckCircleOutlineIcon />}
			color="success"
			onClick={c02.promptReview}
			{...rest}>
			{label}
		</ButtonWrapper>
	);
};
C02ReviewButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
C02ReviewButtonContainer.displayName = "C02ReviewButtonContainer";
