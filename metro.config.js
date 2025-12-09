const {getDefaultConfig} = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'reflect-metadata/lite') {
    const reflectMetadataDir = path.join(__dirname, 'node_modules', 'reflect-metadata');
    return {
      filePath: path.join(reflectMetadataDir, 'ReflectLite.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

