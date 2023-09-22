/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width || 0;
  this.height = height || 0;
  this.getArea = () => width * height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const values = Object.values(JSON.parse(json));
  return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelector {
  constructor() { // p - Component of selector
    this.pElement = '';
    this.pId = '';
    this.pClass = [];
    this.pAttr = [];
    this.pPseudoClass = [];
    this.pPseudoElement = '';
    this.onePart = [];
    this.partsOfSelectors = [];
    this.pCombine = '';
    this.isEmpty = (value) => {
      if (value) {
        throw new Error('Element,'
        + ' id and pseudo-element should not occur more then one time inside the selector');
      }
      return true;
    };
    this.isValid = () => {
      if (this.selectorBuilder() !== this.onePart.join('')) {
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element '
        + 'if selector parts arranged in an invalid order.');
      }
    };
    this.selectorBuilder = () => this.pElement + this.pId + this.pClass.join('') + this.pAttr.join('')
    + this.pPseudoClass.join('') + this.pPseudoElement;
  }

  element(value) {
    if (this.isEmpty(this.pElement)) {
      this.pElement = value;
      this.onePart.push(this.pElement);
    }
    this.isValid();
    return this;
  }

  id(value) {
    if (this.isEmpty(this.pId)) {
      this.pId = `#${value}`;
      this.onePart.push(this.pId);
    }
    this.isValid();
    return this;
  }

  class(value) {
    this.pClass.push(`.${value}`);
    this.onePart.push(`.${value}`);
    this.isValid();
    return this;
  }

  attr(value) {
    this.pAttr.push(`[${value}]`);
    this.onePart.push(`[${value}]`);
    this.isValid();
    return this;
  }

  pseudoClass(value) {
    this.pPseudoClass.push(`:${value}`);
    this.onePart.push(`:${value}`);
    this.isValid();
    return this;
  }

  pseudoElement(value) {
    if (this.isEmpty(this.pPseudoElement)) {
      this.pPseudoElement = `::${value}`;
      this.onePart.push(this.pPseudoElement);
    }
    this.isValid();
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.pCombine = ` ${combinator} `;
    this.partsOfSelectors.push(selector1.stringify());
    this.partsOfSelectors.push(this.pCombine);
    this.partsOfSelectors.push(selector2.stringify());
    return this;
  }

  stringify() {
    let result;
    if (this.onePart.length) {
      result = this.selectorBuilder();
      this.onePart = [];
    }
    if (this.partsOfSelectors.length) {
      result = this.partsOfSelectors.join('');
      this.partsOfSelectors = [];
    }
    return result;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector().element(value);
  },

  id(value) {
    return new CssSelector().id(value);
  },

  class(value) {
    return new CssSelector().class(value);
  },

  attr(value) {
    return new CssSelector().attr(value);
  },

  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CssSelector().combine(selector1, combinator, selector2);
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
