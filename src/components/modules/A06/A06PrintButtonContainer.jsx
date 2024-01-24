import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext } from "react";
import { A06Context } from "../../../contexts/A06/A06Context";
import A06 from "../../../modules/md-a06";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { StdPrintContext } from "../../../contexts/std-print/StdPrintContext";

const A06PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a06 = useContext(A06Context);
		const { moduleAuthorityLoading, canPrint } = a06;

		if (moduleAuthorityLoading || !canPrint) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
				}}
				onClick={stdPrint.promptPrint}
				color="neutral"
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

A06PrintButtonContainer.propTypes = {};

A06PrintButtonContainer.displayName = "A06PrintButtonContainer";
export default A06PrintButtonContainer;
