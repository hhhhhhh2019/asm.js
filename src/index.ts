import {Compiler} from "./compiler";
import { Emulator } from "./emulator";

const code = `
	jmp start

var: db 1h 2h 3h 0h

start:
	mov M offset var

l1:
	mov A M
	add M 1h
	cmp A 0h
	jne l1
	
	brk

stack:
`;

const compiler = new Compiler(code);
compiler.compile();
console.log(compiler);

const emulator = new Emulator(compiler.program.length, 10);
emulator.setProgram(compiler.program);
emulator.run();

console.log(emulator);