import { useTheme } from "@mui/system";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function useContainerSize({ opts } = {}) {
	const { sm, md, lg, xl } = opts || {};
	const theme = useTheme();
	const containerRef = useRef(null);
	const [size, setSize] = useState({

	})

	// const size = useDebounceObject(ogSize, 0);
	// const size = useDebounceObject(ogSize, 100);

	const _xl = useMemo(() => {
		return xl || theme.breakpoints.values.xl;
	}, [theme.breakpoints.values.xl, xl])

	const isXl = useMemo(() => {
		return size.width >= _xl;
	}, [_xl, size.width])

	const _lg = useMemo(() => {
		return lg || theme.breakpoints.values.lg;
	}, [lg, theme.breakpoints.values.lg])

	const isLg = useMemo(() => {
		return size.width >= _lg && size.width < _xl;
	}, [_lg, _xl, size.width])

	const isLgOrUp = useMemo(() => {
		return size.width >= _lg;
	}, [_lg, size.width])

	const isLgOrDown = useMemo(() => {
		return size.width <= _lg;
	}, [_lg, size.width])

	const _md = useMemo(() => {
		return md || theme.breakpoints.values.md;
	}, [md, theme.breakpoints.values.md])

	const isMdOrUp = useMemo(() => {
		return size.width >= _md;
	}, [_md, size.width])

	const isMdOrDown = useMemo(() => {
		return size.width <= _md;
	}, [_md, size.width])

	const isMd = useMemo(() => {
		return size.width >= _md && size.width < _lg;
	}, [_lg, _md, size.width])

	const _sm = useMemo(() => {
		return sm || theme.breakpoints.values.sm;
	}, [sm, theme.breakpoints.values.sm])

	const isSmOrUp = useMemo(() => {
		return size.width >= _sm;
	}, [_sm, size.width])

	const isSmOrDown = useMemo(() => {
		return size.width <= _sm;
	}, [_sm, size.width])

	const isSm = useMemo(() => {
		return size.width >= _sm && size.width < _md;
	}, [_md, _sm, size.width])

	const isXs = useMemo(() => {
		return size.width < _sm;
	}, [_sm, size.width])

	// useEffect(() => {
	// 	console.log(`[${size?.width}]xl: ${_xl}, lg: ${_lg}, md: ${_md}, sm: ${_sm}`);
	// }, [_lg, _md, _sm, _xl, size?.width]);

	useLayoutEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const newSize = {
					width: entry.contentRect.width,
					height: entry.contentRect.height
				}
				setSize(newSize)
				console.log(`resizing height: ${newSize.height}, width: ${newSize.width}`)
			}
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	return {
		containerRef,
		...size,
		isXl,
		isLgOrUp,
		isLgOrDown,
		isLg,
		isMdOrUp,
		isMdOrDown,
		isMd,
		isSmOrUp,
		isSmOrDown,
		isSm,
		isXs,
	}

}