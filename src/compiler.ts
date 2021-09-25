class Token {
	type: String;
	value: String;
	codePosition: Number;

	constructor(type: String, value: String, cp: Number) {
		this.type = type;
		this.value = value;
		this.codePosition = cp;
	}
}

const inArray = function(val: any, arr: Array<any>): boolean {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == val) return true;
	}
	return false;
}

const split = function(str: String | string, sep: Array<String>, delEmpty: boolean = false): Array<String | string> {
	let res: Array<String | string> = [];
	let tmp: String | string = "";
	for (let i = 0; i < str.length; i++) {
		if (inArray(str[i], sep)) {
			if (delEmpty == false || (delEmpty && !(inArray(tmp, sep) || tmp == "")))
				res.push(tmp);
			tmp = "";
			continue;
		}
		tmp += str[i];
	}
	if (tmp != "") res.push(tmp);
	return res;
}

const operations = "brk mov push pop add sub cmp jmp je jne jl jb or and xor".split(" ");
const operationsWith2Param = "mov add sub cmp or and xor".split(" ");

export class Compiler {
	code: string | String;
	codeArr: Array<String | string>;
	program: Array<number> = [];
	labels: {[k: string]: number} = {};
	tokens: Array<Token> = [];
	offset: number = 0;

	constructor(code: String | string) {
		this.code = code;
		this.codeArr = split(code, [" ", "\n", "\t", "\r"], true);
	}

	isNumber(str: String): boolean {
		if (str[str.length-1] != "h") return false;

		for (let i = 0; i < str.length - 1; i++) {
			if (!inArray(str[i], "0123456789abcdef".split(""))) return false;
		}

		return true;
	}

	isMemory(str: String): boolean {
		if (str[0] != "$") return false;

		for (let i = 1; i < str.length; i++) {
			if (!inArray(str[i], "0123456789abcdef".split(""))) return false;
		}

		return true;
	}

	isRegister(str: String): boolean {
		return inArray(str, "abcdm".split(""));
	}

	isOperation(str: String): boolean {
		return inArray(str, operations);
	}

	getTypeToken(str: String): String {
		if (this.isNumber(str)) return "Number";
		if (this.isMemory(str)) return "Memory";
		if (this.isRegister(str)) return "Register";
		if (this.isOperation(str)) return "Operation";
		return "Label";
	}

	lexer() {
		let offset = 0;
		for (let i = 0; i < this.codeArr.length; i++) {
			let str = this.codeArr[i].toLowerCase();
			if (str[str.length-1] == ":") {
				this.labels[<string>str] = offset;
				continue;
			}
			this.tokens.push(new Token(
				this.getTypeToken(str),
				str,
				i
			));
			if (!inArray(str, operationsWith2Param))
				offset++;
		}
	}

	getNextToken(): Token {
		return this.tokens[this.offset++];
	}

	match(...expected: string[]): Token | null {
		if (this.offset < this.tokens.length) {
			const currentToken = this.tokens[this.offset];
			for (let i = 0; i < expected.length; i++) {
				if (currentToken.type == expected[i]) {
					this.offset += 1;
					return currentToken;
				}
			}
		}
		return null;
	}

	require(...expected: string[]) {
		const token = this.match(...expected);
		if (!token) {
			throw new Error(`на позиции ${this.offset} ожидаеются ${expected}`)
		}
		return token;
	}

	nmrl2num(str: String | string): number {
		if (this.isNumber(str)) return Number("0x" + str.slice(0,-1));
		if (this.isMemory(str)) return Number("0x" + str.slice(1,str.length));
		if (this.isRegister(str)) {
			if (str == "a") return 0;
			if (str == "b") return 1;
			if (str == "c") return 2;
			if (str == "d") return 3;
			if (str == "m") return 4;
		}
		return this.labels[<string>str + ":"];
	}

	syntax() {
		while(this.offset < this.tokens.length) {
			let token = this.getNextToken();
			let cmdNumber = 0;

			if (token.type == "Operation") {
				if (token.value == "brk") {
					this.program.push(cmdNumber);
					continue;
				}
				// 1 - 18
				if (token.value == "mov") {
					let to = this.require("Register", "Memory");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 1;
					else if (to.value == "b") cmdNumber = 4;
					else if (to.value == "c") cmdNumber = 7;
					else if (to.value == "d") cmdNumber = 10;
					else if (to.value == "m") cmdNumber = 13;
					else /*memory*/           cmdNumber = 16;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 19 - 20
				if (token.value == "push") {
					cmdNumber = 19;

					let what = this.require("Number", "Registrer");

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 21
				if (token.value == "pop") {
					cmdNumber = 21;

					let what = this.require("Registrer");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 22 - 36
				if (token.value == "add") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 22;
					else if (to.value == "b") cmdNumber = 25;
					else if (to.value == "c") cmdNumber = 28;
					else if (to.value == "d") cmdNumber = 31;
					else if (to.value == "m") cmdNumber = 34;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 37 - 51
				if (token.value == "sub") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 37;
					else if (to.value == "b") cmdNumber = 40;
					else if (to.value == "c") cmdNumber = 43;
					else if (to.value == "d") cmdNumber = 46;
					else if (to.value == "m") cmdNumber = 49;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 52 - 66
				if (token.value == "cmp") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 52;
					else if (to.value == "b") cmdNumber = 55;
					else if (to.value == "c") cmdNumber = 58;
					else if (to.value == "d") cmdNumber = 61;
					else if (to.value == "m") cmdNumber = 64;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 67
				if (token.value == "jmp") {
					cmdNumber = 67;

					let what = this.require("Memory", "Label");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 68
				if (token.value == "je") {
					cmdNumber = 68;

					let what = this.require("Memory", "Label");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 69
				if (token.value == "jne") {
					cmdNumber = 69;

					let what = this.require("Memory", "Label");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 70
				if (token.value == "jl") {
					cmdNumber = 70;

					let what = this.require("Memory", "Label");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 71
				if (token.value == "jb") {
					cmdNumber = 71;

					let what = this.require("Memory", "Label");

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 72 - 86
				if (token.value == "or") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 72;
					else if (to.value == "b") cmdNumber = 75;
					else if (to.value == "c") cmdNumber = 78;
					else if (to.value == "d") cmdNumber = 81;
					else if (to.value == "m") cmdNumber = 84;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 87 - 101
				if (token.value == "and") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 87;
					else if (to.value == "b") cmdNumber = 90;
					else if (to.value == "c") cmdNumber = 93;
					else if (to.value == "d") cmdNumber = 96;
					else if (to.value == "m") cmdNumber = 99;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}

				// 102 - 116
				if (token.value == "xor") {
					let to = this.require("Register");
					let what = this.require("Number", "Registrer", "Memory", "Label");

					if (to.value == "a")      cmdNumber = 102;
					else if (to.value == "b") cmdNumber = 105;
					else if (to.value == "c") cmdNumber = 108;
					else if (to.value == "d") cmdNumber = 111;
					else if (to.value == "m") cmdNumber = 114;

					if (what.type == "Number")       cmdNumber += 0;
					else if (what.type = "Register") cmdNumber += 1;
					else if (what.type == "Memory")  cmdNumber += 2;
					else if (what.type == "Label")   cmdNumber += 2;

					this.program.push(cmdNumber);
					this.program.push(this.nmrl2num(what.value));
					continue;
				}
			}
		}
	}

	compile() {
		this.lexer();
		this.syntax();
	}
}