import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { Box, Paper, styled } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import JobMenuItem from "./JobMenuItem";
import JobMenu from "./JobMenu.mjs";
import JobMenuItemContainer from "./JobMenuItemContainer";
import { grey } from "@mui/material/colors";

const ListBox = styled("ul")(({ theme }) => ({
	listStyle: "none",
	width: "100%",
	padding: "0 4px 0 4px",
	margin: 0,
	flexWrap: "wrap",
}));

const ListItem = styled("li")(({ theme }) => ({
	// margin: "2px",
	marginTop: "4px",
	marginBottom: "4px",
	// width: "100%",
	"& .MuiChip-label": {
		flexGrow: 1,
	},
}));

const JobMenuActiveItems = memo((props) => {
	const {
		items,
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

	// const renderClone = useCallback((provided, snapshot, rubric) => {
	// 	const item = {
	// 		id: nanoid(),
	// 		...items[rubric.source.index]
	// 	};
	// 	console.log("cloneing item...", item);
	// 	return (
	// 		<div ref={provided.innerRef}>
	// 			<ListItem>
	// 				<JobField
	// 					{...provided.draggableProps}
	// 					{...provided.dragHandleProps}
	// 					className={snapshot.isDragging ? "dragging" : ""}
	// 					item={item}
	// 					type={JobMenu.SELECTED}
	// 				/>
	// 			</ListItem>

	// 		</div>
	// 	)
	// }, [items]);

	return (
		<Paper elevation={2} sx={[
			(theme) => ({
				"& .drag-item": {

				}
			}),
			scrollable.scroller
		]} {...rest}>
			<Droppable droppableId={droppableId} >
				{(provided) => (
					loading
						?
						<Box ref={provided.innerRef} m={2}><LoadingTypography>讀取中...</LoadingTypography> </Box>
						:
						<div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: "100%" }}>
							<FlexBox fullWidth>
								<ListBox>
									{items?.map((item, index) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={index}>
											{(provided) => (
												<div ref={provided.innerRef} className="drag-item">
													<ListItem>
														<JobMenuItemContainer
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															item={item}
															// onDelete={(e) => {
															// 	e.preventDefault();
															// 	e.stopPropagation();
															// 	onDelete(item);
															// }}
															type={JobMenu.SELECTED}
														/>
													</ListItem>

												</div>
											)}
										</Draggable>
									))}

									{provided.placeholder}
								</ListBox>
							</FlexBox>
						</div>
				)
				}
			</Droppable>

		</Paper>
	);
});

JobMenuActiveItems.propTypes = {
	droppableId: PropTypes.string.isRequired,
	items: PropTypes.array,
	onDelete: PropTypes.func,
	height: PropTypes.number,
	loading: PropTypes.bool,
};

JobMenuActiveItems.displayName = "JobMenuActiveItems";
export default JobMenuActiveItems;
