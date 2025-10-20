import { G10Context } from "@/pages/jobs/G10/G10Context";
import { ButtonEx } from "@/shared-components";
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import { forwardRef, memo, useContext, useMemo } from "react";

const G10DeleteButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g10 = useContext(G10Context);

		const disabled = useMemo(() => {
			return !g10.staging;
		}, [g10.staging])

		const title = useMemo(() => {
			return g10.staging ? "" : "目前未形成電腦帳";
		}, [g10.staging])

		return (
			<TooltipWrapper title={title} arrow>
				<ButtonEx
					responsive
					ref={ref}
					variant="contained"
					startIcon={<DeleteIcon />}
					color="secondary"
					onClick={g10.confirmDelete}
					disabled={disabled}
					// disabled={g10.grid.readOnly}
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					刪除
				</ButtonEx>
			</TooltipWrapper>
		);
	})
);
G10DeleteButtonContainer.displayName = "G10DeleteButtonContainer";
export default G10DeleteButtonContainer;





