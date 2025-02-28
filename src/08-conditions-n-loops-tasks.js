/* *************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  if (!(num % 3) && !(num % 5)) {
    return 'FizzBuzz';
  }
  if (!(num % 3)) {
    return 'Fizz';
  }
  if (!(num % 5)) {
    return 'Buzz';
  }
  return num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  let result = 1;
  let num = n;

  while (num > 1) {
    result *= num;
    num -= 1;
  }
  return result;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  let result = 0;
  let lLimit = n1;
  const uLimit = n2;
  for (lLimit = n1; lLimit <= uLimit; lLimit += 1) {
    result += lLimit;
  }
  return result;
}


/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  return (a + b) > c && (a + c) > b && (b + c) > a;
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  let nearestRectangle;
  let furtherRectangle;

  // i'll take coords of diagonals
  const rect1Coords = [[rect1.top, rect1.left],
    [rect1.top + rect1.width, rect1.left + rect1.height]];
  const rect2Coords = [[rect2.top, rect2.left],
    [rect2.top + rect2.width, rect2.left + rect2.height]];

  // calculate which rectangle closer to [0, 0]
  const dist1 = Math.sqrt(rect1.top ** 2 + rect1.left ** 2);
  const dist2 = Math.sqrt(rect2.top ** 2 + rect2.left ** 2);

  if (dist1 <= dist2) {
    nearestRectangle = rect1Coords;
    furtherRectangle = rect2Coords;
  } else {
    nearestRectangle = rect2Coords;
    furtherRectangle = rect1Coords;
  }

  // check is the coordinates of the first rectangle include points of second rectangle
  if ((nearestRectangle[0][0] <= furtherRectangle[0][0]
    && furtherRectangle[0][0] <= nearestRectangle[1][0])
    && (nearestRectangle[0][1] <= furtherRectangle[0][1]
    && furtherRectangle[0][1] <= nearestRectangle[1][1])) {
    return true;
  }
  return false;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  const hypotenuse = Math.sqrt((point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2);
  return circle.radius > hypotenuse;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  const length = str.length - 1;
  let char = 0;

  while (char < length) {
    if (str.indexOf(str.charAt(char)) === str.lastIndexOf(str.charAt(char))) {
      return str.charAt(char);
    }
    char += 1;
  }
  return null;
}


/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const openBracket = isStartIncluded ? '[' : '(';
  const firstNum = a < b ? a : b;
  const secondNum = a < b ? b : a;
  const closeBracket = isEndIncluded ? ']' : ')';
  return `${openBracket}${firstNum}, ${secondNum}${closeBracket}`;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  return Number(num.toString().split('').reverse().join(''));
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  const arrayOfNum = ccn.toString().split('');
  let digit = (arrayOfNum.length - 1) % 2 ? 0 : 1;

  for (digit; digit < arrayOfNum.length; digit += 2) {
    arrayOfNum[digit] = 2 * arrayOfNum[digit] > 9
      ? 2 * arrayOfNum[digit] - 9 : 2 * arrayOfNum[digit];
  }
  const sumOfNum = arrayOfNum.reduce((accum, currentValue) => accum + Number(currentValue), 0);
  return !(sumOfNum % 10);
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  let arrayOfNum = [];
  let number = num;

  while (number > 9) {
    arrayOfNum = number.toString().split('');
    number = arrayOfNum.reduce((accum, currentValue) => accum + Number(currentValue), 0);
  }
  return number;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  const stackOfBrackets = [];
  const arrayOfBrackets = str.split('');
  const lengthOfArrBr = arrayOfBrackets.length;
  const objOfBrackets = {
    '[': ']',
    '{': '}',
    '(': ')',
    '<': '>',
  };

  if (lengthOfArrBr % 2 !== 0) {
    return false;
  }
  for (let char = 0; char < lengthOfArrBr; char += 1) {
    if (arrayOfBrackets[char] === '[' || arrayOfBrackets[char] === '{'
      || arrayOfBrackets[char] === '(' || arrayOfBrackets[char] === '<') {
      stackOfBrackets.push(arrayOfBrackets[char]);
    }
    if (arrayOfBrackets[char] === ']' || arrayOfBrackets[char] === '}'
      || arrayOfBrackets[char] === ')' || arrayOfBrackets[char] === '>') {
      if (stackOfBrackets.length === 0) {
        return false;
      }
      if (objOfBrackets[stackOfBrackets[stackOfBrackets.length - 1]] === arrayOfBrackets[char]) {
        stackOfBrackets.pop();
      }
    }
  }
  return !stackOfBrackets.length;
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n); // should know!
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
  const arrElemOfPath = pathes.map((element) => element.split('/'));
  const result = [];

  for (let index = 0; index < arrElemOfPath[0].length; index += 1) {
    for (let element = 1; element < arrElemOfPath.length; element += 1) {
      if (arrElemOfPath[0][index] !== arrElemOfPath[element][index]) {
        if (result.length === 1 && result[0] === '') {
          return '/';
        }
        if (!result.length) {
          return '';
        }
        return result.join('/').concat('/');
      }
    }
    result.push(arrElemOfPath[0][index]);
  }
  return result.join('/').concat('/');
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  const result = [];
  let subMatrix = [];
  let element = 0;

  for (let iteration = 0; iteration < m1.length; iteration += 1) {
    for (let idx1 = 0; idx1 < m1.length; idx1 += 1) {
      for (let idx2 = 0; idx2 < m2.length; idx2 += 1) {
        element += m1[iteration][idx2] * m2[idx2][idx1];
      }
      subMatrix.push(element);
      element = 0;
    }
    result.push(subMatrix);
    subMatrix = [];
  }
  return result;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
  let idx2 = position.length - 1;
  const exMainDiagonal = position[0][0];
  const exSaidDiagonal = position[0][idx2];
  let mainDiagonal = true;
  let sideDiagonal = true;

  for (let idx = 0; idx < position.length; idx += 1) {
    let column = 0;
    let row = 0;
    const exRow = position[idx][row];
    const exColumn = position[column][idx];
    let flagRow = true;
    let flagColumn = true;
    // check diagonals
    if (exMainDiagonal !== position[idx][idx] || !exMainDiagonal) {
      mainDiagonal = false;
    }
    if (exSaidDiagonal !== position[idx][idx2] || !exSaidDiagonal) {
      sideDiagonal = false;
    }
    idx2 -= 1;
    // check row
    while (flagRow && row < position.length) {
      if (position[idx][row] !== exRow || !exRow) {
        flagRow = false;
      }
      row += 1;
    }
    if (flagRow) {
      return exRow;
    }
    // check column
    while (flagColumn && column < position.length) {
      if (position[column][idx] !== exColumn || !exColumn) {
        flagColumn = false;
      }
      column += 1;
    }
    if (flagColumn) {
      return exColumn;
    }
  }
  if (mainDiagonal) {
    return exMainDiagonal;
  }
  if (sideDiagonal) {
    return exSaidDiagonal;
  }
  return undefined;
}


module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
