import Captcha from "@/shared-modules/sd-captcha";
import { useCallback, useRef, useState } from "react";
import { useInit } from "../../shared-hooks/useInit";

export const useCaptcha = (opts = {}) => {
	const { numbersOnly = false, length = 6, strokeStyle, onRefresh } = opts;
	const asyncRef = useRef({
		firstRender: true,
	});
	const canvasRef = useRef();

	const newSolution = useCallback(() => {
		return numbersOnly
			? Captcha.generateNumericCaptcha(length)
			: Captcha.genetateCaptcha(length);
	}, [length, numbersOnly]);

	const [state, setState] = useState({
		solution: newSolution({ numbersOnly, length }),
		input: "",
	});

	const drawCaptcha = useCallback(
		(solution) => {
			const { width, height } = canvasRef.current;
			const ctx = canvasRef.current.getContext("2d");
			ctx.clearRect(0, 0, width, height);
			ctx.font = `${Captcha.getRandomInt(30, 40)}px serif`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(solution, width / 2, height / 2 + 3);

			if (strokeStyle) {
				ctx.strokeStyle = strokeStyle;
			} else {
				let gradient = ctx.createLinearGradient(0, 0, width, 0);
				gradient.addColorStop("0", "magenta");
				gradient.addColorStop("0.5", "blue");
				gradient.addColorStop("1.0", "red");
				ctx.strokeStyle = gradient;
			}
			// ********* DRAW BEGIN ********
			ctx.beginPath();
			ctx.moveTo(
				Captcha.getRandomInt(5, 20),
				Captcha.getRandomInt(5, 20)
			);
			ctx.lineTo(
				width - Captcha.getRandomInt(5, 20),
				height - Captcha.getRandomInt(5, 20)
			);
			ctx.stroke();
			ctx.moveTo(
				Captcha.getRandomInt(15, 30),
				Captcha.getRandomInt(15, 30)
			);
			ctx.lineTo(
				width - Captcha.getRandomInt(15, 30),
				height - Captcha.getRandomInt(15, 30)
			);
			ctx.stroke();
			ctx.moveTo(
				Captcha.getRandomInt(5, 20),
				height - Captcha.getRandomInt(5, 20)
			);
			ctx.lineTo(
				width - Captcha.getRandomInt(5, 20),
				Captcha.getRandomInt(5, 20)
			);
			ctx.stroke();
			ctx.moveTo(
				Captcha.getRandomInt(15, 30),
				height - Captcha.getRandomInt(15, 30)
			);
			ctx.lineTo(
				width - Captcha.getRandomInt(15, 30),
				Captcha.getRandomInt(15, 30)
			);
			ctx.stroke();
			ctx.moveTo(
				Captcha.getRandomInt(width / 10, width / 10 + 10),
				height - Captcha.getRandomInt(15, 30)
			);
			ctx.lineTo(
				Captcha.getRandomInt(width / 2, width / 2 + 10),
				Captcha.getRandomInt(5, 20)
			);
			ctx.stroke();
			ctx.closePath();
		},
		[strokeStyle]
	);

	const handleRefresh = useCallback(() => {
		const solution = newSolution();
		setState((prev) => ({
			...prev,
			solution,
			input: "",
		}));
		drawCaptcha(solution, { strokeStyle });
		if (onRefresh && !asyncRef.current.firstRender) {
			onRefresh();
		}
		asyncRef.current.firstRender = false;
	}, [drawCaptcha, newSolution, onRefresh, strokeStyle]);

	const playAudio = useCallback(() => {
		const audio = new SpeechSynthesisUtterance(
			state.solution.toString().split("").join(" ")
		);
		audio.rate = 0.6;
		window.speechSynthesis.speak(audio);
	}, [state.solution]);

	const validate = useCallback(
		(s) => {
			return s === state.solution.toString();
		},
		[state.solution]
	);

	const onInputChange = useCallback(
		(e) => {
			setState((prev) => ({
				...prev,
				captchaPassed: e.target.value === state.solution.toString(),
			}));
		},
		[state.solution]
	);

	useInit(() => {
		handleRefresh();
	}, []);

	return {
		canvasRef,
		playAudio,
		onInputChange,
		handleRefresh,
		input: state.input,
		validate,
	};
};
