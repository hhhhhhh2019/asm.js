import {Compiler} from "./compiler";
import { Emulator } from "./emulator";

const code = `
	mov A 06h
	and A 01h
	cmp A 01h
	je l1
	jne l2

l1:
	mov B 01h
	jmp end

l2:
	mov B 02h
	jmp end

end:
	brk
`;

const compiler = new Compiler(code);
compiler.compile();

const emulator = new Emulator(compiler.program.length + 4, 4);
emulator.setProgram(compiler.program);
emulator.run();

console.log(emulator);