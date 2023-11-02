const getCharFrequency = (text) => {
	const freq = {};
	for (let char of text) {
		if (!freq[char]) {
			freq[char] = 0;
		}
		freq[char] += 1;
	}
	return freq;
};

const valueNode = (value, weight) => ({ value, weight });

const leafNode = (left, right) => ({ left, right, weight: left.weight + right.weight });

const sortNodes = (arr) => arr.sort((a, b) => a.weight - b.weight);

const valueNodesFromCharFrequency = (freq) => Object.entries(freq).map(([k, v]) => valueNode(k, v));

const graphFromValueNodes = (valueNodes) => {
	if (valueNodes.length === 1) return valueNodes[0];

	const [left, right, ...rest] = sortNodes(valueNodes);
	const newLeaf = leafNode(left, right);

	return graphFromValueNodes([...rest, newLeaf]);
};

const codesFromGraph = (node, prefixCode = "", codes = {}) => {
	if (node.value) return { ...codes, [node.value]: prefixCode };
	return { ...codesFromGraph(node.left, prefixCode + "b"), ...codesFromGraph(node.right, prefixCode + "z") };
};

const encodeGenerator = (graph) => {
	const codes = codesFromGraph(graph);
	return (text) => {
		return [...text].map((char) => (codes[char] !== undefined ? codes[char] : "[invalid]")).join(" ");
	};
};

const decodeGenerator = (graph) => (text) => {
	const charsCleaned = text.replaceAll(" ", "").replaceAll("[invalid]", "�").split("");
	let decoded = "";
	let node = graph;
	for (let char of charsCleaned) {
		if (char === "�") {
			decoded += "�";
			continue;
		}

		node = char === "b" ? node.left : node.right;
		if (node.value !== undefined) {
			decoded += node.value;
			node = graph;
		}
	}
	return decoded;
};

const testText = "Gemeinsam zünden wir den Funken* der Digitalisierung** in den Menschen*** der Region****";

const charFrequency = getCharFrequency(testText);

const valueNodes = valueNodesFromCharFrequency(charFrequency);
const graph = graphFromValueNodes(valueNodes);

const encode = encodeGenerator(graph);
const decode = decodeGenerator(graph);

console.log(charFrequency);
console.log(JSON.stringify(graph, null, 2));
console.log(codesFromGraph(graph));

const text = "Digitale Initiativen";
const encoded = encode(text);
const decoded = decode(encoded);

console.log(text);
console.log(encoded);
console.log(decoded);
