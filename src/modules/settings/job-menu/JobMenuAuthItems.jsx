import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { Box, Paper, styled } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, memo, useCallback } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import JobMenuItem from "./JobMenuItem";
import JobMenu from "./JobMenu.mjs";

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

const JobMenuAuthItems = memo((props) => {
	const {
		onDelete,
		items,
		isAdded,
		droppableId,
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

	const renderClone = useCallback((provided, snapshot, rubric) => {
		const item = items[rubric.source.index];
		// console.log("cloneing item...", item);
		return (
			<div ref={provided.innerRef}>
				<ListItem>
					<JobMenuItem
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={snapshot.isDragging ? "dragging" : ""}
						item={item}
						type={JobMenu.UNUSED}
					/>
				</ListItem>

			</div>
		)
	}, [items]);

	return (
		<Paper elevation={2} sx={[scrollable.scroller]} {...rest}>
			<Droppable droppableId={droppableId} isDropDisabled={true} renderClone={renderClone}>
				{(provided, snapshot) => (
					loading
						?
						<Box ref={provided.innerRef} m={2}><LoadingTypography>讀取中...</LoadingTypography> </Box>
						:
						<div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: "100%" }}>
							<FlexBox fullWidth>
								<ListBox>
									{items?.map((item, index) => {

										const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
										const added = isAdded(item);
										return (
											<Fragment key={item.id}>
												{shouldRenderClone ?
													(<ListItem >
														<JobMenuItem
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															item={item}
															type={JobMenu.UNUSED}
														/>
													</ListItem>)
													: (<Draggable
														draggableId={item.id}
														index={index}>
														{(provided) => (
															<div ref={provided.innerRef}>
																<ListItem>
																	<JobMenuItem
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		item={item}
																		type={JobMenu.UNUSED}
																		onDelete={added ? null : e => {
																			e.preventDefault();
																			e.stopPropagation();
																			onDelete(item)
																		}}
																	/>
																</ListItem>

															</div>
														)}
													</Draggable>)
												}
											</Fragment>
										)
									})}
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

JobMenuAuthItems.propTypes = {
	droppableId: PropTypes.string.isRequired,
	items: PropTypes.array,
	onDelete: PropTypes.func,
	isAdded: PropTypes.func,
	height: PropTypes.number,
	loading: PropTypes.bool,
};

JobMenuAuthItems.displayName = "JobMenuAuthItems";
export default JobMenuAuthItems;
