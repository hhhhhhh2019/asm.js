"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
const emulator_1 = require("./emulator");
const code = `
	jmp start
	
func:
	push M
	mov M stack
	sub M 2h
	mov A M
	pop M
ret
	
start:
	push 7h
	call func
	pop D
	brk

stack:
`;
const compiler = new compiler_1.Compiler(code);
compiler.compile();
console.log(compiler);
const emulator = new emulator_1.Emulator(compiler.program.length + 4, 4);
emulator.setProgram(compiler.program);
emulator.run();
console.log(emulator);
