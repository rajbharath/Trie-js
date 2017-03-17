var data = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
    ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
    ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
    ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
    ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
    ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
    ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
    ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
    ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
    ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
    ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
    ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
    ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
    ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
    ,"Yemen","Zambia","Zimbabwe"];

var instruction = 'Type starting letters of any country and Press enter for autocomplete options';
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var trie = constructTrie(data);

function constructTrie(data) {
  var trie = {};
  data.forEach(function(word) {
    insert(trie, word);
  });
  return trie;
}

function insert(parent, word) {
  if (word.length) {
    if(!parent[word[0]]) parent[word[0]] = {};
    insert(parent[word[0]], word.slice(1));
  }
}

function getSuggestions(word, trie) {
  var parentTrie = findParentTrie(word, trie);
  return extractWords(parentTrie, [], word) ;
}

function findParentTrie(word, parentTrie) {
  if (!word.length) return parentTrie;
  word.split('').forEach(function(char) {
    parentTrie = parentTrie[char];
    if (!parentTrie) parentTrie = {};
  })
  return parentTrie;
}

function extractWords(t, words, word) {
  if (!Object.keys(t).length) {
    words.push(word);
  }

  Object.keys(t).forEach(function(char) {
    extractWords(t[char], words, word + char);
  });
  return words;
}
console.log('TRIE - Datastructure Implementation');
console.log('====================================');
console.log('Autocomplete for Countries');
console.log('====================================');
console.log(instruction);
rl.on('line', (input) => {
  console.log(getSuggestions(input, trie));
  console.log(instruction);
});
