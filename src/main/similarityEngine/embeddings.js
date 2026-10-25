
// Shoutout huggingface for the transformer and library

const model = 'onnx-community/all-MiniLM-L6-V2-ONNX'; // model being used

let extractorPromise = null; // no model yet (empty)

// 
async function getExtractor() {
  if (!extractorPromise) { // is model already loading or loaded?
    extractorPromise = import('@huggingface/transformers') // grab lib
      .then(({ pipeline }) => // create pipeline for feature eextraction using model
        pipeline('feature-extraction', model)
      )
      .catch((error) => {
        extractorPromise = null; // empty extractor promise
        throw error; // throw tantrum
      });
  }

  return extractorPromise; // return model promise
}

// lets get embedded
const embedText = async (text) => {

  if (typeof text !== 'string' || !text.trim()) { // must be a string with characters to be embedded
    console.error('[similarityEngine] EMBED ERROR: BAD INPUT');
    return;
  }

  const extractor = await getExtractor(); // grab extractor model & pipeline

  const output = await extractor(text, {
    pooling: 'mean',
    normalize: true,
  }); // one normalized (unit length scale) vector of vector means

  // use extractor

  return Array.from(output.data); // return the output in array form

}

// just dot product
const cosineSimilarity = (a, b) => {

  if (a.length == 0 || b.length == 0) {
    console.error('[similarityEngine] cosineSimilarity ERROR: SMALL ARRAY');
    return;
  }

  let dot = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }

  return dot;

}

module.exports = { embedText, cosineSimilarity };
