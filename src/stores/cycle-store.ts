import dayjs from "dayjs";
import { writable } from "svelte/store";
import { formatTime, formatTimes } from "../utils/cycle-utils";
import type { Cycle, SetupNextCycle } from "../types/cycle-types";

const SECOND_IN_MILLISECONDS = 1000;

const BASE_TIME = formatTimes("30:00");
const BASE_BREAK_TIME = formatTimes("10:00");

/**
 * @description
 * ##### BREAK CYCLE -> 0
 * ##### NORMAL CYCLE -> 1, 2
 */
const INITIAL_CYCLE = 1;

// Amount of cycles before a break
const CYCLE_COUNT = 2;

export const cycle = writable<Cycle>({
	isRunning: false,
	startedAt: null,
	elapsedTime: null,
	baseTime: BASE_TIME,
	cycleCount: INITIAL_CYCLE,
	_interval: null,
});

export const setBaseTime = <M extends string, S extends string>(
	newBaseTime: `${M}:${S}`,
) => {
	const formattedNewBaseTime = formatTimes(newBaseTime);

	cycle.update((value) => {
		return {
			...value,
			baseTime: formattedNewBaseTime,
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

export const updateCycleCount = (newCycleCount: number) => {
	if (newCycleCount < 1) return;

	cycle.update((value) => {
		return {
			...value,
			cycleCount: newCycleCount,
		};
	});
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
					setupNextCycle({ currentCycle: value.cycleCount });

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
			cycleCount: INITIAL_CYCLE,
			_interval: null,
		};
	});
};

export const setupNextCycle = ({ currentCycle }: SetupNextCycle) => {
	cycle.update((value) => {
		if (value.isRunning) {
			const activeInterval = value._interval as number;
			clearTimeout(activeInterval);
		}

		if (currentCycle + 1 > CYCLE_COUNT) {
			return {
				...value,
				isRunning: false,
				startedAt: null,
				elapsedTime: null,
				cycleCount: INITIAL_CYCLE - 1,
				baseTime: BASE_BREAK_TIME,
				_interval: null,
			};
		}

		return {
			...value,
			isRunning: false,
			startedAt: null,
			elapsedTime: null,
			cycleCount: currentCycle + 1,
			baseTime: BASE_TIME,
			_interval: null,
		};
	});
};
