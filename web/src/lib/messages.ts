const BASES = [
	"accepts your offering",
	"accepts your soil tribute",
	"acknowledges your effort",
	"acknowledges your futile gesture",
	"admires your dedication to pointless tasks",
	"appreciates your contribution",
	"appreciates your scooping",
	"considers promoting you to Senior Digger",
	"considers this adequate",
	"considers this barely adequate",
	"deepens without comment",
	"felt that",
	"grows marginally less disappointed",
	"grows",
	"has been extended",
	"is pleased with your work",
	"is satisfied",
	"logs another shovel-related incident",
	"logs your disturbance",
	"notes your commitment to the void",
	"notes your shovel discipline",
	"questions your life choices",
	"rates this disturbance as satisfactory",
	"receives your donation of dirt",
	"regards your labor as correct",
	"remembers this",
	"respects your commitment to poor decisions",
	"suspects you might actually reach Japan",
	"thanks you in silence",
	"updates its emptiness records",
	"wonders if you have other hobbies",
];

const TAGS = [
	"Against all odds.",
	"Argentina grows suspicious.",
	"As expected.",
	"As the void intended.",
	"Barely.",
	"Briefly.",
	"Despite everything.",
	"For now.",
	"In accordance with the plan.",
	"Japan remains unaware.",
	"Like your mother always said you would.",
	"Somehow.",
	"Sort of.",
	"Technically.",
	"The earth sighs.",
	"To a measurable degree.",
	"With minimal enthusiasm.",
	"Within acceptable bounds.",
	"Without ceremony.",
];

function randomItem(bases: string[]) {
	return bases[Math.floor(Math.random() * bases.length)];
}

export function randomSuccessMessage() {
	const base = randomItem(BASES);
	const tag = Math.random() < 0.5 ? ` ${randomItem(TAGS)}` : "";
	return `The hole ${base}.${tag}`;
}

const FINAL_MESSAGES = [
	"acknowledges your effort",
	"acknowledges your futile gesture",
	"admires your dedication to pointless tasks",
	"appreciates your contribution",
	"appreciates your scooping",
	"considers this adequate",
	"felt that",
	"is pleased with your work",
	"is satisfied",
	"notes your commitment to the void",
	"notes your shovel discipline",
	"questions your life choices",
	"rates this disturbance as satisfactory",
	"regards your labor as correct",
	"remembers this",
	"respects your commitment to poor decisions",
	"thanks you in silence",
	"wonders if you have other hobbies",
];

export function randomFinalMessage() {
	return `The hole ${randomItem(FINAL_MESSAGES)}.`;
}
