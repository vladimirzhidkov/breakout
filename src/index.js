import {Breakout} from './app.js';
import {DOMContext} from './dom_context.js';

var ctx = new DOMContext();
var breakout = new Breakout(ctx);
breakout.start();