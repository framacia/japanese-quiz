# JLPT N5 Japanese Quiz

A small offline-friendly Japanese study quiz for JLPT N5 vocabulary and example sentences.

## Run it

Open [`quiz.html`](quiz.html) directly in a browser. No build step or local server is required. An internet connection is only needed to load the Wanakana romaji conversion library from jsDelivr.

## Features

- Multiple-choice and keyboard-input quizzes
- Words and example-sentence practice
- Hiragana, Katakana, and All filters
- Reading and Translation answer modes
- Furigana displayed above kanji in sentences
- Romaji answers for reading questions
- Score, streak, question count, and answer history
- Bundled local data for direct `file:///` use

## Data

The bundled database contains 662 vocabulary entries and 1,242 example sentences from OpenJLPT. The browser loads [`n5-vocabulary-database.js`](n5-vocabulary-database.js); the matching JSON file is included for inspection and regeneration workflows.

JLPT does not publish an official fixed vocabulary list. The N5 assignments used here are community-standard approximations provided by OpenJLPT.

See [`DATA-ATTRIBUTION.md`](DATA-ATTRIBUTION.md) for OpenJLPT, JMdict/EDICT, KANJIDIC2, Tatoeba, and license details. The imported source and license files are also included in this repository.

## License and attribution

The imported dataset is distributed under CC BY-SA 4.0. See [`openjlpt-LICENSE.txt`](openjlpt-LICENSE.txt) and [`DATA-ATTRIBUTION.md`](DATA-ATTRIBUTION.md) before redistributing modified data.
