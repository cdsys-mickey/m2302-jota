import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { E01Context } from "@/contexts/E01/E01Context";

const E01CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e01 = useContext(E01Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={e01.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
E01CreateButtonContainer.displayName = "E01CreateButtonContainer";
export default E01CreateButtonContainer;


