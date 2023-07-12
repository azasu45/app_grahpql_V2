// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Options} */

const config = {    
   semi: true,
   tabWidth: 2,
   printWidth: 100,
   singleQuote: true,
   trailingComma: "es5",
   jsxSingleQuote: true,
   bracketSpacing: true,
   bracketSameLine: true,
   tailwindConfig: './tailwind.config.js',
   plugins:[require('prettier-plugin-tailwindcss')]
}

module.exports = config;