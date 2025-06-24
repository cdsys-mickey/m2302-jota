import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P21Context } from "./P21Context";

const P21CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p21 = useContext(P21Context);
		const { moduleAuthorityLoading, canCreate } = p21;
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (moduleAuthorityLoading || !canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={p21.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P21CreateButtonContainer.displayName = "P21CreateButtonContainer";
export default P21CreateButtonContainer;


