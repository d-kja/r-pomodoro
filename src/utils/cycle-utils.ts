const MINUTE_IN_SECONDS = 60;

export const formatTime = (time: number | string) =>
	time.toString().padStart(2, "0");

export const formatTimes = (times: string) =>
	times
		.split(":")
		.map((time) => time.padStart(2, "0"))
		.join(":");

export const getTimeFromElapsed = (elapsed: number): [string, string] => {
	const minutes = formatTime(Math.floor(elapsed / MINUTE_IN_SECONDS));
	const seconds = formatTime(Math.floor(elapsed % MINUTE_IN_SECONDS));

	return [minutes, seconds];
};
