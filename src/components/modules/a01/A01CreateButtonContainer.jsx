import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { A01Context } from "../../../contexts/a01/A01Context";

const A01CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a01 = useContext(A01Context);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a01.handleCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				新增
			</ResponsiveButton>
		);
	})
);

export default A01CreateButtonContainer;
