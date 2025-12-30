// import CabinetTypes from "@/modules/md-cabinet-types";
import CounterPicker from "@/components/picker/CounterPicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import { ButtonEx } from "@/shared-components";
import ControlledTextField from "@/shared-components/TextFieldEx/ControlledTextField";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import MuiStyles from "@/shared-modules/MuiStyles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import A16SearchForm from "./A16SearchForm";
const A16SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
			// onReset,
			ContentProps,
			...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<Divider sx={{ mt: 0, mb: 0 }} />
				<DialogContent {...ContentProps}>
					<A16SearchForm initSize="xs" spacing={1} />
				</DialogContent>
				<Divider />
				<DialogActions>

					<ButtonEx
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						清除
					</ButtonEx>
					<ButtonEx
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonEx>
				</DialogActions>
			</PopperBox>
		);
	})
);

A16SearchPopper.displayName = "A16SearchPopper";

export default A16SearchPopper;

