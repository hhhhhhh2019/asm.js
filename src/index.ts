import {Compiler} from "./compiler";
import { Emulator } from "./emulator";

const code = `
	jmp start

var: db 72h 69h 76h 76h 89h 0h

strlen:
	push M
	push B

	mov M stack
	sub M 3h
	mov M M

strlenLabel:
	mov A M
	add B 1h
	add M 1h
	cmp A 0h
	jne strlenLabel

	sub B 1h
	mov A B

	pop B
	pop M
ret

start:
	push offset var
	call strlen
	pop D

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