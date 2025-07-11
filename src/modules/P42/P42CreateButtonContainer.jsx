import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P42Context } from "./P42Context";

const P42CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p42 = useContext(P42Context);
		const { moduleAuthorityLoading, canCreate } = p42;
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
				onClick={p42.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P42CreateButtonContainer.displayName = "P42CreateButtonContainer";
export default P42CreateButtonContainer;




