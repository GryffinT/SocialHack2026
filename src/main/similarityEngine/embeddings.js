
// Shoutout huggingface for the transformer and library

const model = 'onnx-community/all-MiniLM-L6-V2-ONNX';

let extractorPromise = null;

async function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = import('@huggingface/transformers')
      .then(({ pipeline }) =>
        pipeline('feature-extraction', model)
      )
      .catch((error) => {
        extractorPromise = null;
        throw error;
      });
  }

  return extractorPromise;
}

const embedText = async (text) => {

  if (typeof text !== 'string' || !text.trim()) {
    console.error('[similarityEngine] EMBED ERROR: BAD INPUT');
    return;
  }

  const extractor = await getExtractor();

  const output = await extractor(text, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data);

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
