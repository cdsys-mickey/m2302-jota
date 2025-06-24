import { G10Context } from "@/pages/jobs/G10/G10Context";
import { ButtonEx } from "@/shared-components";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Tooltip } from "@mui/material";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

const G10WriteOffButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g10 = useContext(G10Context);
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(g10.onSubmit, g10.onSubmitErrort);
		}, [g10.onSubmit, g10.onSubmitErrort, form]);

		useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
			enableOnFormTags: true
		})

		const disabled = useMemo(() => {
			return !g10.grid.gridData?.filter(x => x.doc?.SDocID).length;
		}, [g10.grid.gridData])

		const title = useMemo(() => {
			return disabled ? "請至少輸入一張單據" : ""
		}, [disabled])

		return (
			<Tooltip title={title}>
				<span>
					<ButtonEx
						responsive
						ref={ref}
						variant="contained"
						startIcon={<PlaylistRemoveIcon />}
						onClick={handleSubmit}
						disabled={disabled}
						sx={{
							fontWeight: 600,
						}}
						{...rest}>
						沖銷
					</ButtonEx>
				</span>
			</Tooltip>

		);
	})
);
G10WriteOffButtonContainer.displayName = "G10StageButtonContainer";
export default G10WriteOffButtonContainer;



