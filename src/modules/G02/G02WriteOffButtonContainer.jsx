import { G02Context } from "@/modules/G02/G02Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { forwardRef, memo, useContext, useMemo } from "react";
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonGroupEx from "@/shared-components/ButtonGroupEx";

const G02WriteOffButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g02 = useContext(G02Context);
		const listLoader = useContext(InfiniteLoaderContext);
		const text = useMemo(() => {
			let msg = "沖銷";
			if (listLoader.checked.length > 0) {
				msg += `(${listLoader.checked.length}筆)`;
			}
			return msg;
		}, [listLoader.checked.length]);

		const disabled = useMemo(() => {
			return !listLoader.isAnyChecked
		}, [listLoader.isAnyChecked])

		const _title = useMemo(() => {
			let msg = "";
			if (disabled) {
				msg += "請先勾選要沖銷的單據"
			}
			return msg;
		}, [disabled])

		return (
			<Tooltip title={_title}>
				<span>
					<ButtonGroupEx variant="contained" size="small" noDivider disableInteractive>
						<ButtonWrapper
							responsive
							ref={ref}

							color="secondary"
							startIcon={<LastPageIcon />}
							onClick={g02.confirmWriteOff}
							className="no-margin-right"
							sx={{
								fontWeight: 600,
							}}
							disabled={disabled}
							{...rest}>
							{text}
						</ButtonWrapper>
						{!disabled && (
							<Tooltip title="取消勾取">
								<Button
									className="no-margin-right"
									color="neutral"
									onClick={g02.uncheckAll}>
									<ClearIcon fontSize="small" />
								</Button>
							</Tooltip>

						)}
					</ButtonGroupEx>

				</span>
			</Tooltip>
		);
	})
);
G02WriteOffButtonContainer.displayName = "G02WriteOffButtonContainer";
export default G02WriteOffButtonContainer;

