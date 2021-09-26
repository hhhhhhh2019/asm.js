"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
const emulator_1 = require("./emulator");
const code = `
	jmp start

func:
	push M
	push B

	mov M stack
	sub M 3h
	mov A M
	sub M 1h
	mov B M
	add A B

	pop B
	pop M
ret

start:
	push 7h
	push 6h
	
	call func

	push A
	and A 01h
	cmp A 01h
	pop A
	je noEval
	jne eval

eval:
	mov B 1h
	jmp end

noEval:
	mov B 2h
	jmp end

end:
	brk

stack:
`;
const compiler = new compiler_1.Compiler(code);
compiler.compile();
console.log(compiler);
const emulator = new emulator_1.Emulator(compiler.program.length, 10);
emulator.setProgram(compiler.program);
emulator.run();
console.log(emulator);
