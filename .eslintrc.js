module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "jest": true
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types": [2, { ignore: ['children', 'styled'] }],
      "import/no-unresolved": [
        10, 
        { caseSensitive: false }
     ],
    }
};