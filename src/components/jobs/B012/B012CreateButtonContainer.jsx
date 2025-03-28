import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

const B012CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const b012 = useContext(b.forNew ? B032Context : B012Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ButtonWrapper
				responsive
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b012.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ButtonWrapper>
		);
	})
);
B012CreateButtonContainer.displayName = "B012CreateButtonContainer";
export default B012CreateButtonContainer;


