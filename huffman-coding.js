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

const encode = (text, codes) => {
	return [...text].map((char) => codes[char] !== undefined ? codes[char] : '[invalid]').join(" ");
};

const testText = "Gemeinsam zünden wir den Funken* der Digitalisierung** in den Menschen*** der Region****";

const charFrequency = getCharFrequency(testText);

const valueNodes = valueNodesFromCharFrequency(charFrequency);
const graph = graphFromValueNodes(valueNodes);
const codes = codesFromGraph(graph);

console.log(charFrequency);
console.log(JSON.stringify(graph, null, 2));
console.log(codes);

console.log("Digitale Initiativen");
console.log(encode("Digitale Initiativen", codes));
