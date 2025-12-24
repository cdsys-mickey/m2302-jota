import { Box, Paper, styled } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FlexBox } from "shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import StdField from "./JobMenuItem";
import JobMenu from "./JobMenu.mjs";
import LoadingTypography from "@/shared-components/LoadingTypography";
import JobMenuItem from "./JobMenuItem";
import { useMemo } from "react";
import { useCallback } from "react";

const ListItem = styled("li")(({ theme }) => ({
	margin: "8px",
	// width: "100%",
	"& .MuiChip-label": {
		flexGrow: 1,
	},
}));

const JobFields = memo((props) => {
	const {
		fields,
		droppableId,
		onDelete,
		height,
		loading = false,
		...rest
	} = props;
	const scrollable = useScrollable({
		height,
		alwaysShowTrack: true,
		alwaysShowThumb: true,
		// trackColor: "transparent"
	});

	const hasDeleteButton = useMemo(() => {
		return droppableId === JobMenu.SELECTED
	}, [droppableId])

	const _type = useMemo(() => {
		return JobMenu.droppableIdToType(
			droppableId
		)
	}, [droppableId]);

	const isDropDisabled = useMemo(() => {
		return _type === JobMenu.UNUSED;
	}, [_type])

	const getUnusedKey = useCallback((item) => {
		return item.JobID;
	}, []);

	const getSelectedKey = useCallback((item) => {
		return item;
	}, []);

	return (
		<Paper elevation={2} sx={[scrollable.scroller]} {...rest}>
			<Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
				{(provided) => (
					loading
						?
						<Box ref={provided.innerRef} m={2}><LoadingTypography>讀取中...</LoadingTypography> </Box>
						:
						<div ref={provided.innerRef} {...provided.droppableProps}>
							<FlexBox fullWidth>
								<ul
									style={{
										listStyle: "none",
										width: "100%",
										padding: "4px 4px 4px 4px",
										margin: 0,
										flexWrap: "wrap",
										// display: "flex",
										// alignItems: "flex-start",
									}}>
									{fields?.map((item, index) => (
										<Draggable
											key={item.Seq}
											draggableId={item.JobID || item.JobName}
											index={index}>
											{(provided) => (
												<div ref={provided.innerRef}>
													<ListItem>
														<JobMenuItem
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															item={item}
															onDelete={hasDeleteButton ? () => {
																onDelete(item);
															} : null}
															type={_type}
														/>
													</ListItem>

												</div>
											)}
										</Draggable>
									))}

									{provided.placeholder}
								</ul>
							</FlexBox>
						</div>
				)
				}
			</Droppable>

		</Paper>
	);
});

JobFields.propTypes = {
	droppableId: PropTypes.string.isRequired,
	fields: PropTypes.array,
	onDelete: PropTypes.func,
	height: PropTypes.number,
	loading: PropTypes.bool,
};

JobFields.displayName = "JobFields";
export default JobFields;
