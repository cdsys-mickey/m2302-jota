import { F02Context } from "@/contexts/F02/F02Context";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { forwardRef, memo, useContext } from "react";

const F02DeleteButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f02 = useContext(F02Context);

		const disabled = useMemo(() => {
			return !f02.staging;
		}, [f02.staging])

		const title = useMemo(() => {
			return f02.staging ? "" : "目前未形成電腦帳";
		}, [f02.staging])

		return (
			<Tooltip title={title} arrow>
				<span>
					<ButtonWrapper
						responsive
						ref={ref}
						variant="contained"
						startIcon={<DeleteIcon />}
						color="secondary"
						onClick={f02.confirmDelete}
						disabled={disabled}
						// disabled={f02.grid.readOnly}
						sx={{
							fontWeight: 600,
						}}
						{...rest}>
						刪除
					</ButtonWrapper>
				</span>
			</Tooltip>
		);
	})
);
F02DeleteButtonContainer.displayName = "F02DeleteButtonContainer";
export default F02DeleteButtonContainer;

