var compact = require('lodash.compact');
// \W will match apostrophes, unfortunately.
var basicWordBoundaryRegex = /[ ",;!?]/;
var wordBoundariesInURLsRegex = /[.\/:\-_#]/;
var urlRegex = /http.?:\/\/[^\s]+/;

function splitToWords(text) {
  var chunks = compact(text.split(basicWordBoundaryRegex));
  chunks = splitChunksThatAreNotURLsEvenFurther(chunks);
  return chunks;
}

function splitChunksThatAreNotURLsEvenFurther(chunks) {
  for (var i = chunks.length - 1; i > -1; --i) {
    var chunk = chunks[i];
    if (chunk.indexOf('/') !== -1 && !chunk.match(urlRegex)) {
      chunks.splice.apply(chunks, [i, 1].concat(chunk.split(wordBoundariesInURLsRegex)));
    }
  }
  return chunks;
}

module.exports = splitToWords;
