import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C09Context } from "@/contexts/C09/C09Context";

const C09CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c09 = useContext(C09Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c09.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C09CreateButtonContainer.displayName = "C09CreateButtonContainer";
export default C09CreateButtonContainer;
