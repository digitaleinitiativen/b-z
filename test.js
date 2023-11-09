const huffman = require("./huffman-coding.js");

const testText = "Gemeinsam zünden wir den Funken* der Digitalisierung** in den Menschen*** der Region****";

const charFrequency = huffman.getCharFrequency(testText);

const graph = huffman.graphFromCharFrequency(charFrequency);

const encode = huffman.encodeGenerator(graph);
const decode = huffman.decodeGenerator(graph);

console.log(charFrequency);
console.log(JSON.stringify(graph, null, 2));
console.log(huffman.codesFromGraph(graph));

const text = "Digitale Initiativen";
const encoded = encode(text);
const decoded = decode(encoded);

console.log(text);
console.log(encoded);
console.log(decoded);
