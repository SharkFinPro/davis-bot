"use strict";
const config = require('./config.js');
const BotServer = require('./source/core/botServer.js');

const botServer = new BotServer(config, false);
botServer.init();
