const scriptUrl = 'vendor/kuromoji.js';
const dictionaryUrl = 'vendor/dict/';

let tokenizerPromise = null;

function loadTokenizer(dictionaryUrl) {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: dictionaryUrl }).build((error, tokenizer) => {
      if (error || !tokenizer) reject(error || new Error('Kuromoji did not return a tokenizer.'));
      else resolve(tokenizer);
    });
  });
}

async function initializeTokenizer() {
  if (tokenizerPromise) return tokenizerPromise;
  tokenizerPromise = (async () => {
    importScripts(scriptUrl);
    if (!self.kuromoji) throw new Error('Unable to load the local Kuromoji library.');
    return loadTokenizer(dictionaryUrl);
  })();
  return tokenizerPromise;
}

self.onmessage = async event => {
  try {
    const tokenizer = await initializeTokenizer();
    if (event.data.type === 'initialize') {
      self.postMessage({ type: 'ready' });
    } else if (event.data.type === 'tokenize') {
      self.postMessage({ type: 'tokens', requestId: event.data.requestId, tokens: tokenizer.tokenize(event.data.text) });
    }
  } catch (error) {
    self.postMessage({ type: 'error', message: error instanceof Error ? error.message : String(error) });
  }
};