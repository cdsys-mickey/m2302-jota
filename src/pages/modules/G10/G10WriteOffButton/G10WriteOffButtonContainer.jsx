import { G10Context } from "@/pages/modules/G10/G10Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Tooltip } from "@mui/material";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const G10WriteOffButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g10 = useContext(G10Context);
		const form = useFormContext();

		const handleStage = useMemo(() => {
			return form.handleSubmit(g10.onSubmit, g10.onSubmitErrort);
		}, [g10.onSubmit, g10.onSubmitErrort, form]);

		const disabled = useMemo(() => {
			return !g10.grid.gridData?.filter(x => x.doc?.SDocID).length;
		}, [g10.grid.gridData])

		const title = useMemo(() => {
			return disabled ? "請至少輸入一張單據" : ""
		}, [disabled])

		return (
			<Tooltip title={title}>
				<span>
					<ButtonWrapper
						responsive
						ref={ref}
						variant="contained"
						startIcon={<PlaylistRemoveIcon />}
						onClick={handleStage}
						disabled={disabled}
						sx={{
							fontWeight: 600,
						}}
						{...rest}>
						沖銷
					</ButtonWrapper>
				</span>
			</Tooltip>

		);
	})
);
G10WriteOffButtonContainer.displayName = "G10StageButtonContainer";
export default G10WriteOffButtonContainer;



