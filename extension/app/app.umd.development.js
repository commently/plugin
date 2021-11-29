(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global = global || self, factory(global.React, global.ReactDOM));
}(this, (function (React, ReactDOM) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  console.log("🚀 ~ file: index.tsx ~ line 2 ~ React", React);
  console.log("🚀 ~ file: index.tsx ~ line 3 ~ ReactDOM", ReactDOM); // Please do not use types off of a default export module or else Storybook Docs will suffer.
  // see: https://github.com/storybookjs/storybook/issues/9556

  /**
   * A custom Thing component. Neat!
   */

  var Thing = function Thing(_ref) {
    var children = _ref.children;
    return React.createElement("div", null, children || "the snozzberries taste like snozzberries");
  };

  var root = /*#__PURE__*/document.createElement('div');
  root.id = 'commently-plugin';
  root.style.position = 'fixed';
  root.style.left = '0';
  root.style.top = '0';
  root.style.right = '0';
  root.style.bottom = '0';
  document.body.appendChild(root);
  ReactDOM.render(React.createElement(Thing, null), root);

})));
//# sourceMappingURL=app.umd.development.js.map
