import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import JobMenuActiveItemsContainer from "./JobMenuActiveItemsContainer";
import JobMenuAuthItemsContainer from "./JobMenuAuthItemsContainer";

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

const JobMenuForm = memo((props) => {
	const { onDragEnd, height } = props;

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<SectionLabel>可用作業</SectionLabel>
					<JobMenuAuthItemsContainer height={height} />
				</Grid>
				<Grid item xs={6}>
					<SectionLabel>目前設定</SectionLabel>
					<JobMenuActiveItemsContainer height={height} />
				</Grid>
			</Grid>
		</DragDropContext>
	);
});

JobMenuForm.propTypes = {
	onDragEnd: PropTypes.func,
	height: PropTypes.number,
	onSubmit: PropTypes.func,
};

JobMenuForm.displayName = "JobMenuForm";
export default JobMenuForm;
