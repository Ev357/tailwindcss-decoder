import { parse, type AtRule, type Rule, type Declaration } from "postcss";
import { parsers } from "./parsers";

const compiledFile = Bun.file("src/compiled.css");

const compiledCss = await compiledFile.text();

const getUtilities = (css: string) => {
	const parsedCss = parse(css);

	const utilitiesLayer = parsedCss.nodes.find(
		(node) =>
			node.type === "atrule" &&
			node.name === "layer" &&
			node.params === "utilities",
	) as AtRule | undefined;

	if (utilitiesLayer?.nodes) {
		const page = 31;
		return utilitiesLayer.nodes.splice(page * 5, page * 5 + 5); // TODO: remove after testing
	}

	throw new Error("Could not find utilities layer");
};

const parseDeclaration = (decl: Declaration) => {
	const parser = parsers[decl.prop];
	if (!parser) return;

	const tailwindClass = parser(decl);
	if (!tailwindClass) return;

	if (decl.important) {
		return `!${tailwindClass}`;
	}

	return tailwindClass;
};

const parseRule = (rule: Rule) => {
	if (rule.nodes.length === 1 && rule.nodes[0].type === "decl") {
		const decleration = rule.nodes[0];

		const tailwindClass = parseDeclaration(decleration);

		console.log(tailwindClass);
	}
	/* for (const node of rule.nodes) {
		if (node.type === "decl") {
			console.log(node.value);
		}
	} */
};

const utilities = getUtilities(compiledCss);

for (const utility of utilities) {
	if (utility.type === "rule") {
		parseRule(utility);
	}
}
