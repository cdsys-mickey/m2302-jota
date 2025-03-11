import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { E021Context } from "@/modules/E021/E021Context";

const E021CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e021 = useContext(E021Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={e021.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
E021CreateButtonContainer.displayName = "E021CreateButtonContainer";
export default E021CreateButtonContainer;



