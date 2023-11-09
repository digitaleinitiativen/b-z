const huffman = require("./huffman-coding.js");
const fs = require("fs");

const getChannels = () => {
	return fs.readdirSync("data").filter((file) => fs.statSync(`data/${file}`).isDirectory());
};

const readMessages = (filename) => {
	const file = fs.readFileSync(filename, "utf8");
	const data = JSON.parse(file);

	return data.map((d) => d.text);
};

const getChannelMessages = (channel) => {
	const filenames = fs.readdirSync(`data/${channel}`).map((filename) => `data/${channel}/${filename}`);
	return filenames.map(readMessages).flat();
};

const cleanup = (text = "") => {
	const whitelist = ["ü", "ä", "ö", "ß", "𝗶", "𝗲", "𝗻", "𝘁", "𝗮", "•"];

	return text
		.split("")
		.filter((char) => char.charCodeAt(0) <= 127 || whitelist.includes(char))
		.join("");
};

const channels = getChannels();
const messages = channels.map(getChannelMessages).flat();

console.log(channels);
console.log(messages.length);

const charFrequency = huffman.getCharFrequency(cleanup(messages.join("")));
console.log(charFrequency);

const charFrequencySorted = Object.entries(charFrequency).sort((a, b) => b[1] - a[1]);
console.log(charFrequencySorted);

const graph = huffman.graphFromCharFrequency(charFrequency);

console.log(JSON.stringify(graph, null, 2));

fs.writeFileSync("graph.json", JSON.stringify(graph, null, 2));
