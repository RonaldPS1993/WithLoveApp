// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

console.log('✅ Using Expo Metro config')

module.exports = config;
