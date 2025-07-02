import { C08Context } from "@/contexts/C08/C08Context";
import { ButtonEx } from "@/shared-components";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";

const C08CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c08 = useContext(C08Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ButtonEx
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c08.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ButtonEx>
		);
	})
);
C08CreateButtonContainer.displayName = "C08CreateButtonContainer";
export default C08CreateButtonContainer;
