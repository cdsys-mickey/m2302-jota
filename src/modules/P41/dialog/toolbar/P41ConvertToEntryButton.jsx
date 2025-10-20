import { ButtonEx } from "@/shared-components";
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useContext, useMemo } from "react";
import { P41Context } from "../../P41Context";

const P41ConvertToEntryButton = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const p41 = useContext(P41Context);
	const { canReview } = p41;
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

	if (p41.itemData?.CFlag) {
		return false;
	}

	return (
		<TooltipWrapper title={title}>
			<ButtonEx
				startIcon={<PublishedWithChangesIcon />}
				// onClick={ }
				disabled={disabled}
				{...rest}
			>
				轉佣金輸入
			</ButtonEx>
		</TooltipWrapper>
	)
}

P41ConvertToEntryButton.displayName = "P41ConvertToEntryButton";
export default P41ConvertToEntryButton;