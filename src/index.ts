import {Compiler} from "./compiler";
import { Emulator } from "./emulator";

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

const compiler = new Compiler(code);
compiler.compile();
console.log(compiler);

const emulator = new Emulator(compiler.program.length + 4, 4);
emulator.setProgram(compiler.program);
emulator.run();

console.log(emulator);