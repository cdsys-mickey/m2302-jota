import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C03Context } from "@/contexts/C03/C03Context";

const C03CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c03 = useContext(C03Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c03.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C03CreateButtonContainer.displayName = "C03CreateButtonContainer";
export default C03CreateButtonContainer;
