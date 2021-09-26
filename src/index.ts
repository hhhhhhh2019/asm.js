import {Compiler} from "./compiler";
import { Emulator } from "./emulator";

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

const compiler = new Compiler(code);
compiler.compile();
console.log(compiler);

const emulator = new Emulator(compiler.program.length, 10);
emulator.setProgram(compiler.program);
emulator.run();

console.log(emulator);