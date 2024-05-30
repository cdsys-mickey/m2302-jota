import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C08Context } from "@/contexts/C08/C08Context";

const C08CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c08 = useContext(C08Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c08.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C08CreateButtonContainer.displayName = "C08CreateButtonContainer";
export default C08CreateButtonContainer;
