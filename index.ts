/**

Given a list of words and a string made up of those words (no spaces), return the original sentence in a list.
If there is more than one possible reconstruction, return any of them.
If there is no possible reconstruction, then return an empty array.
For example:
Given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].

**/

function splitSentence(words: string[], sentence: string) {
  const result = [];
  
  let wordFound = false;
  while (sentence) {
    wordFound = false;
    for (const word of words) {
      if (!sentence.startsWith(word)) continue;

      wordFound = true;
      result.push(word);
      sentence = sentence.slice(word.length);
    }

    if (!wordFound) throw new Error('Sentence contains unknown word');
  };
  
  return result;
}

type TestFunctionOptions = {
  correctAnswer?: string[];
  error?: boolean;
};
function testFunction(words: string[], sentence: string, options: TestFunctionOptions) {
  try {
    const result = splitSentence(words, sentence);
    const resultString = JSON.stringify(result);
    
    if ('correctAnswer' in options) {
      const { correctAnswer } = options;
      
      const correctString = JSON.stringify(correctAnswer)
      const isSame = resultString === correctString;

      if (isSame) {
        console.log(`Test passed: got ${resultString}`)
      } else {
        console.log(`Test failed: expected ${correctString} but got ${resultString}`)
      } 
      return;
    }

    if (options.error) {
      console.log('Test failed: expected and error to be thrown');
      return;
    }
    
    console.log('Test passed');
  } catch (e) {
    if (options.error) {
      console.log('Test passed: error thrown');
      return;
    }
    
    console.log(`Test failed: ${e}`);
  }
}

testFunction(
  ['quick', 'brown', 'the', 'fox'], 
  'thequickbrownfox',
  { correctAnswer: ['the', 'quick', 'brown', 'fox'] }
)

testFunction(
  ['bed', 'bath', 'bedbath', 'and', 'beyond'], 
  'bedbathandbeyond',
  { correctAnswer: ['bed', 'bath', 'and', 'beyond'] }
)

testFunction(
  [],
  '',
  { correctAnswer: [] }
)

testFunction(
  [],
  'sentencewithoutwords',
  { error: true }
)