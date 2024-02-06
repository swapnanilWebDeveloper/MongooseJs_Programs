const text = "I am writing , my Address 23000, 3500!!";
const segmenter = new Intl.Segmenter([], { granularity: 'word' });
const segmentedText = segmenter.segment(text);
const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
console.log(words);

for(var i = 0; i < words.length ; i ++){
     console.log(words[i]+" ");
} 
