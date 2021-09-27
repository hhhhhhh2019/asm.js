"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
const emulator_1 = require("./emulator");
const code = `
	mov A 1h
	l1:
	add A 1h
	cmp A 5h
	jne l1
	brk
`;
const compiler = new compiler_1.Compiler(code);
compiler.compile();
console.log(compiler);
const emulator = new emulator_1.Emulator(compiler.program.length, 10);
emulator.setProgram(compiler.program);
emulator.run();
console.log(emulator);
