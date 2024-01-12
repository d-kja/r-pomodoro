export type Cycle = {
	isRunning: boolean;
	startedAt: null | Date;
	elapsedTime: null | number;
	baseTime: string;
	cycleCount: number;
	_interval: null | ReturnType<typeof setTimeout>;
};

export type SetupNextCycle = {
	currentCycle: number;
};
