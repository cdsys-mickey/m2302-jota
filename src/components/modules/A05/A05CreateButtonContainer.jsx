import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { A05Context } from "../../../contexts/A05/A05Context";
import A05 from "../../../modules/md-a05";
import { useMemo } from "react";

const A05CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a05 = useContext(A05Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a05.createPrompt}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A05CreateButtonContainer.displayName = "A05CreateButtonContainer";
export default A05CreateButtonContainer;
