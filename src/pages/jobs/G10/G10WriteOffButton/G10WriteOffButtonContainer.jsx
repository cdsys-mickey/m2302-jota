import { G10Context } from "@/pages/jobs/G10/G10Context";
import { ButtonEx } from "@/shared-components";
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { forwardRef, memo, useCallback, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

const G10WriteOffButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g10 = useContext(G10Context);
		const form = useFormContext();

		const disabled = useMemo(() => {
			return !g10.grid.gridData?.filter(x => x.doc?.SDocID).length;
		}, [g10.grid.gridData])

		const handleSubmit = useCallback(() => {
			if (!disabled) {
				form.handleSubmit(g10.onSubmit, g10.onSubmitErrort)();
			}
		}, [disabled, form, g10.onSubmit, g10.onSubmitErrort]);

		useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
			enableOnFormTags: true
		})

		const title = useMemo(() => {
			return disabled ? "請至少輸入一張單據" : ""
		}, [disabled])

		return (
			<TooltipWrapper title={title}>
				<ButtonEx
					responsive
					ref={ref}
					variant="contained"
					startIcon={<PlaylistRemoveIcon />}
					onClick={handleSubmit}
					disabled={disabled}
					loading={g10.updating}
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					沖銷
				</ButtonEx>
			</TooltipWrapper>

		);
	})
);
G10WriteOffButtonContainer.displayName = "G10StageButtonContainer";
export default G10WriteOffButtonContainer;



