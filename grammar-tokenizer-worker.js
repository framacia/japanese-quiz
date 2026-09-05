const scriptUrls = [
  'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/build/kuromoji.js',
  'https://unpkg.com/kuromoji@0.1.2/build/kuromoji.js'
];

const dictionaryUrls = [
  'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/',
  'https://unpkg.com/kuromoji@0.1.2/dict/'
];

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
    let libraryLoaded = false;
    for (const scriptUrl of scriptUrls) {
      try {
        importScripts(scriptUrl);
        libraryLoaded = true;
        break;
      } catch {
        // Try the next CDN.
      }
    }
    if (!libraryLoaded || !self.kuromoji) throw new Error('Unable to load Kuromoji.');

    let lastError;
    for (const dictionaryUrl of dictionaryUrls) {
      try {
        return await loadTokenizer(dictionaryUrl);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError || new Error('Unable to load the Kuromoji dictionary.');
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
    self.postMessage({ type: 'error', message: error.message });
  }
};