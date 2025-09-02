import { PrintReportButton } from "@/components";
import { E01Context } from "@/contexts/E01/E01Context";
import { ButtonEx } from "@/shared-components";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";
import { useMemo } from "react";
import E01 from "@/modules/E01.mjs";

const E01ConvertToSalesOrderButton = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const e01 = useContext(E01Context);
	const { canReview } = e01;
	// const e021Module = useAppModule({
	// 		token,
	// 		moduleId: "E021",
	// 	});

	// const handleSubmit = form.handleSubmit(
	// 	e01.onPrintSubmit,
	// 	e01.onPrintSubmitError
	// );



	const disabled = useMemo(() => {
		return !canReview
	}, [canReview])

	const title = useMemo(() => {
		return disabled ? "您未具備覆核權限" : "";
	}, [disabled])

	if ([E01.SquaredState.SQUARED, E01.SquaredState.MARK_AS_SQUARED].includes(e01.itemData?.squared?.id)) {
		return false;
	}

	return (
		<TooltipWrapper title={title}>
			<span>
				<ButtonEx
					startIcon={<PublishedWithChangesIcon />}
					// onClick={ }
					disabled={disabled}
					{...rest}
				>
					轉銷貨單
				</ButtonEx>
			</span>
		</TooltipWrapper>
	)
}

E01ConvertToSalesOrderButton.displayName = "E01ConvertToSalesOrderButton";
export default E01ConvertToSalesOrderButton;