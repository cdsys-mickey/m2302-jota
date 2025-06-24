import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { P14Context } from "@/modules/P14/P14Context";
import { ButtonEx } from "@/shared-components";

const P14CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p14 = useContext(P14Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (!p14.canCreate) {
			return false;
		}

		return (
			<ButtonEx
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={p14.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ButtonEx>
		);
	})
);
P14CreateButtonContainer.displayName = "P14CreateButtonContainer";
export default P14CreateButtonContainer;


