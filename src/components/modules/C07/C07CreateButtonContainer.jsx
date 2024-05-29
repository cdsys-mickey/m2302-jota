import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C07Context } from "@/contexts/C07/C07Context";

const C07CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c07 = useContext(C07Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c07.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C07CreateButtonContainer.displayName = "C07CreateButtonContainer";
export default C07CreateButtonContainer;
