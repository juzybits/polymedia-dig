const BASES = [
	"accepts your offering",
	"accepts your soil tribute",
	"acknowledges your effort",
	"acknowledges your futile gesture",
	"admires your dedication to pointless tasks",
	"appreciates your contribution",
	"appreciates your dedication to absence",
	"appreciates your scooping",
	"approves of absence",
	"considers promoting you to Senior Digger",
	"considers this adequate",
	"considers this barely adequate",
	"deepens without comment",
	"felt that",
	"files your shovel work under 'miscellaneous'",
	"grows marginally less disappointed",
	"grows",
	"has been extended",
	"is now slightly more itself",
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
	"registers minimal surprise at your persistence",
	"remembers this",
	"required this",
	"respects your commitment to poor decisions",
	"revises its depth expectations downward",
	"suspects you might actually reach Japan",
	"thanks you in silence",
	"updates its emptiness records",
	"wonders if you have other hobbies",
];

const TAGS = [
	"", // clean endings
	"Against all odds.",
	"Argentina grows suspicious.",
	"As expected.",
	"As the void intended.",
	"Barely.",
	"Briefly.",
	"By accident.",
	"Despite everything.",
	"For now.",
	"In accordance with the plan.",
	"Japan remains unaware.",
	"Like your mother always said you would.",
	"Pending further absence.",
	"Somehow.",
	"Sort of.",
	"Technically.",
	"The earth sighs.",
	"Through sheer stubbornness.",
	"To a measurable degree.",
	"With concerning enthusiasm.",
	"With minimal fuss.",
	"Within acceptable emptiness.",
	"Without ceremony.",
];

function randomItem(bases: string[]) {
	return bases[(Math.random() * bases.length) | 0];
}

export function randomSuccessMessage() {
	const base = randomItem(BASES);
	const tag = Math.random() < 0.7 ? ` ${randomItem(TAGS)}` : "";
	return `The hole ${base}.${tag}`;
}
