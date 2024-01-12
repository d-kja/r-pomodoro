import dayjs from "dayjs";
import { writable } from "svelte/store";
import { formatTime, formatTimes } from "../utils/cycle-utils";

const SECOND_IN_MILLISECONDS = 1000;
const BASE_TIME = formatTimes("0:15");

export type Cycle = {
	isRunning: boolean;
	startedAt: null | Date;
	elapsedTime: null | number;
	baseTime: string;
	_interval: null | ReturnType<typeof setTimeout>;
};

export const cycle = writable<Cycle>({
	isRunning: false,
	startedAt: null,
	elapsedTime: null,
	baseTime: BASE_TIME,
	_interval: null,
});

export const setBaseTime = <M extends string, S extends string>(
	newBaseTime: `${M}:${S}`,
) => {
	cycle.update((value) => {
		return {
			...value,
			baseTime: newBaseTime,
		};
	});
};

export const updateTime = <M extends string, S extends string>(
	updatedTime: `${M}:${S}`,
) => {
	const [minutes, seconds] = updatedTime.split(":").map(Number);

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

export const startCycle = () => {
	cycle.update((value) => {
		const startingTime = dayjs(value.startedAt ?? new Date());

		return {
			...value,
			isRunning: true,
			startedAt: startingTime.toDate(),
			elapsedTime: 0,
			_interval: setInterval(() => {
				const currentTime = dayjs();
				const [minutesToElapse, secondsToElapse] = value.baseTime
					.split(":")
					.map(Number);

				const timeToElapse = startingTime
					.add(minutesToElapse, "minutes")
					.add(secondsToElapse, "seconds");
				const elapsed = timeToElapse.diff(currentTime) / SECOND_IN_MILLISECONDS;

				if (elapsed <= 0) {
					resetCycle();

					// I don't really need to return, because the cycle is going to vanish, but just in case...
					return;
				}

				cycle.update((value) => {
					return {
						...value,
						elapsedTime: elapsed,
					};
				});
			}, 100), // accurate to 1/10th of a second
		};
	});
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
			isRunning: false,
			startedAt: null,
			elapsedTime: null,
			baseTime: BASE_TIME,
			_interval: null,
		};
	});
};
