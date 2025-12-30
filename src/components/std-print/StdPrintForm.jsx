import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { StdPrintActiveFieldsContainer } from "./StdPrintActiveFieldsContainer";
import { StdPrintUnusedFieldsContainer } from "./StdPrintUnusedFieldsContainer";

const SectionLabel = memo((props) => {
	const { ...rest } = props;
	return (
		<Typography
			variant="subtitle2"
			sx={{
				fontWeight: 600,
			}}
			{...rest}
		/>
	);
});
SectionLabel.displayName = "SectionLabel";

const StdPrintForm = memo((props) => {
	const { onDragEnd, height } = props;

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<SectionLabel>可用欄位</SectionLabel>
					<StdPrintUnusedFieldsContainer height={height} />
				</Grid>
				<Grid item xs={6}>
					<SectionLabel>選擇欄位</SectionLabel>
					<StdPrintActiveFieldsContainer height={height} />
				</Grid>
			</Grid>
		</DragDropContext>
	);
});

StdPrintForm.propTypes = {
	onDragEnd: PropTypes.func,
	height: PropTypes.number,
	onSubmit: PropTypes.func,
};

StdPrintForm.displayName = "StdPrintForm";
export default StdPrintForm;
