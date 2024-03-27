import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext } from "react";
import { A01Context } from "../../../contexts/A01/A01Context";
import A01 from "../../../modules/md-a01";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { StdPrintContext } from "../../../contexts/std-print/StdPrintContext";

const A01PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a01 = useContext(A01Context);
		const { moduleAuthorityLoading, canPrint } = a01;

		if (
			moduleAuthorityLoading ||
			// a01.mode === A01.Mode.NEW_PROD ||
			!canPrint
		) {
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
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

A01PrintButtonContainer.propTypes = {};

A01PrintButtonContainer.displayName = "A01PrintButtonContainer";
export default A01PrintButtonContainer;
