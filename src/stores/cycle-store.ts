import dayjs, { Dayjs } from "dayjs";
import { writable, type Writable } from "svelte/store";

const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_SECONDS = 60;

export type Cycle = {
	isRunning: boolean;
	startedAt: null | Date;
	elapsedTime: null | number;
	baseTime: [string, string];
	currentTime: [string, string];
	_interval: null | ReturnType<typeof setTimeout>;
};

export const cycle = writable<Cycle>({
	isRunning: false,
	startedAt: null,
	elapsedTime: null,
	baseTime: ["25", "00"],
	currentTime: ["25", "00"],
	_interval: null,
});

const formatTime = (time: number) => time.toString().padStart(2, "0");

export const setBaseTime = (newBaseTime: [string, string]) => {
	const minutes = Number(newBaseTime[0]);
	const seconds = Number(newBaseTime[1]);

	if (minutes > 60 || minutes < 0) {
		return;
	}

	if (seconds > 60 || seconds < 0) {
		return;
	}

	cycle.update((value) => ({
		...value,
		baseTime: [formatTime(minutes), formatTime(seconds)],
		currentTime: [formatTime(minutes), formatTime(seconds)],
	}));
};

export const updateTime = (updatedTime: [string, string]) => {
	const minutes = Number(updatedTime[0]);
	const seconds = Number(updatedTime[1]);

	console.log(updatedTime);

	if (minutes > 60 || minutes < 0) {
		return;
	}

	if (seconds > 60 || seconds < 0) {
		return;
	}

	cycle.update((value) => ({
		...value,
		currentTime: [formatTime(minutes), formatTime(seconds)],
	}));
};

type StartCycleParams = {
	startingTime: Dayjs;
};

export const startCycle = ({ startingTime }: StartCycleParams) => {
	cycle.update((value) => ({
		...value,
		isRunning: true,
		startedAt: startingTime.toDate(),
		elapsedTime: 0,
		_interval: setInterval(() => {
			const currentTime = dayjs();

			const elapsed =
				currentTime.diff(startingTime, "millisecond") / SECOND_IN_MILLISECONDS;

			const elapsedSeconds = Math.round(elapsed);
			const elapsedMinutes =
				Math.floor(elapsedSeconds / MINUTE_IN_SECONDS) % MINUTE_IN_SECONDS;

			const baseMinutes = Number(value.baseTime[0]);
			const baseSeconds = Number(value.baseTime[1]);

			const diffSeconds = baseSeconds - elapsedSeconds;
			const diffMinutes = elapsedMinutes + baseMinutes;

			const updatedSeconds = (
				diffSeconds + (baseSeconds % 60) === 0
					? 60
					: diffSeconds + baseSeconds < 0
					  ? 60
					  : diffSeconds + baseSeconds
			).toString();
			const updatedMinutes = diffMinutes.toString();

			updateTime([updatedMinutes, updatedSeconds]);

			cycle.update((value) => {
				return { ...value, elapsedTime: elapsed };
			});
		}, 1000), // accurate to 1/10th of a second
	}));
};

export const stopCycle = () => {
	cycle.update((value) => {
		if (value.isRunning) {
			const activeInterval = value._interval as number;
			clearTimeout(activeInterval);
		}

		return {
			...value,
			isRunning: false,
		};
	});
};

export const resetCycle = () => {
	cycle.update((value) => {
		if (value.isRunning) {
			const activeInterval = value._interval as number;
			clearTimeout(activeInterval);
		}

		return {
			...value,
			elapsedTime: null,
			startedAt: null,
			currentTime: value.baseTime,
			_interval: null,
			isRunning: false,
		};
	});
};
