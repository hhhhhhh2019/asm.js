"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emulator = void 0;
class Emulator {
    constructor(prMemory, stackSize) {
        this.memory = new Uint8Array(0);
        this.registers = new Uint8Array([0, 0, 0, 0, 0]);
        this.flags = new Uint8Array(2); // one unsigned 8 bit number
        this.programCounter = 0;
        this.running = false;
        this.stackSize = stackSize + 1;
        this.globalMemory = prMemory + this.stackSize;
        this.programSize = prMemory;
    }
    setProgram(prg) {
        let memoryArr = new Array(this.globalMemory);
        memoryArr.fill(0);
        memoryArr[this.programSize] = this.programSize;
        for (let i = 0; i < this.globalMemory - this.stackSize; i++) {
            memoryArr[i] = prg[i];
        }
        this.memory = new Uint8Array(memoryArr);
        this.programCounter = 0;
    }
    push(val) {
        console.log("push ", val);
        this.memory[this.programSize] += 1;
        this.memory[this.memory[this.programSize]] = val;
    }
    pop() {
        let res = this.memory[this.memory[this.programSize]];
        this.memory[this.memory[this.programSize]] = 0;
        this.memory[this.programSize] -= 1;
        return res;
    }
    step() {
        // brk
        if (this.memory[this.programCounter] == 0) {
            this.running = false;
            return;
        }
        // mov A num
        if (this.memory[this.programCounter] == 1) {
            this.programCounter++;
            this.registers[0] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov A reg
        if (this.memory[this.programCounter] == 2) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[0] = this.memory[this.registers[4]];
            else
                this.registers[0] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov A mem
        if (this.memory[this.programCounter] == 3) {
            this.programCounter++;
            this.registers[0] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov B num
        if (this.memory[this.programCounter] == 4) {
            this.programCounter++;
            this.registers[1] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov B reg
        if (this.memory[this.programCounter] == 5) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[1] = this.memory[this.registers[4]];
            else
                this.registers[1] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov B mem
        if (this.memory[this.programCounter] == 6) {
            this.programCounter++;
            this.registers[1] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov C num
        if (this.memory[this.programCounter] == 7) {
            this.programCounter++;
            this.registers[2] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov C reg
        if (this.memory[this.programCounter] == 8) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[2] = this.memory[this.registers[4]];
            else
                this.registers[2] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov C mem
        if (this.memory[this.programCounter] == 9) {
            this.programCounter++;
            this.registers[2] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov D num
        if (this.memory[this.programCounter] == 10) {
            this.programCounter++;
            this.registers[3] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov D reg
        if (this.memory[this.programCounter] == 11) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[3] = this.memory[this.registers[4]];
            else
                this.registers[3] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov D mem
        if (this.memory[this.programCounter] == 12) {
            this.programCounter++;
            this.registers[3] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov M num
        if (this.memory[this.programCounter] == 13) {
            this.programCounter++;
            this.registers[4] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov M reg
        if (this.memory[this.programCounter] == 14) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4) {
                console.log(this.memory[this.registers[4]]);
                this.registers[4] = this.memory[this.registers[4]];
                console.log(this.registers[4]);
            }
            else
                this.registers[4] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov M mem
        if (this.memory[this.programCounter] == 15) {
            this.programCounter++;
            this.registers[4] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov mem num
        if (this.memory[this.programCounter] == 16) {
            this.programCounter++;
            this.memory[this.programCounter] = this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // mov mem reg
        if (this.memory[this.programCounter] == 17) {
            this.programCounter++;
            this.memory[this.programCounter] = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // mov mem mem
        if (this.memory[this.programCounter] == 18) {
            this.programCounter++;
            this.memory[this.programCounter] = this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // push num
        if (this.memory[this.programCounter] == 19) {
            this.programCounter++;
            this.push(this.memory[this.programCounter]);
            this.programCounter++;
            return;
        }
        // push reg
        if (this.memory[this.programCounter] == 20) {
            this.programCounter++;
            this.push(this.registers[this.memory[this.programCounter]]);
            this.programCounter++;
            return;
        }
        // pop reg
        if (this.memory[this.programCounter] == 21) {
            this.programCounter++;
            this.registers[this.memory[this.programCounter]] = this.pop();
            this.programCounter++;
            return;
        }
        // add A num
        if (this.memory[this.programCounter] == 22) {
            this.programCounter++;
            this.registers[0] += this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // add A reg
        if (this.memory[this.programCounter] == 23) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[0] += this.memory[this.registers[4]];
            else
                this.registers[0] += this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add A mem
        if (this.memory[this.programCounter] == 24) {
            this.programCounter++;
            this.registers[0] += this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add B num
        if (this.memory[this.programCounter] == 25) {
            this.programCounter++;
            this.registers[1] += this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // add B reg
        if (this.memory[this.programCounter] == 26) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[1] += this.memory[this.registers[4]];
            else
                this.registers[1] += this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add B mem
        if (this.memory[this.programCounter] == 27) {
            this.programCounter++;
            this.registers[1] += this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add C num
        if (this.memory[this.programCounter] == 28) {
            this.programCounter++;
            this.registers[2] += this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // add C reg
        if (this.memory[this.programCounter] == 29) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[2] += this.memory[this.registers[4]];
            else
                this.registers[2] += this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add C mem
        if (this.memory[this.programCounter] == 30) {
            this.programCounter++;
            this.registers[2] += this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add D num
        if (this.memory[this.programCounter] == 31) {
            this.programCounter++;
            this.registers[3] += this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // add D reg
        if (this.memory[this.programCounter] == 32) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[3] += this.memory[this.registers[4]];
            else
                this.registers[3] += this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add D mem
        if (this.memory[this.programCounter] == 33) {
            this.programCounter++;
            this.registers[3] += this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add M num
        if (this.memory[this.programCounter] == 34) {
            this.programCounter++;
            this.registers[4] += this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // add M reg
        if (this.memory[this.programCounter] == 35) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[4] += this.memory[this.registers[4]];
            else
                this.registers[4] += this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // add M mem
        if (this.memory[this.programCounter] == 36) {
            this.programCounter++;
            this.registers[4] += this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub A num
        if (this.memory[this.programCounter] == 37) {
            this.programCounter++;
            this.registers[0] -= this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // sub A reg
        if (this.memory[this.programCounter] == 38) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[0] -= this.memory[this.registers[4]];
            else
                this.registers[0] -= this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub A mem
        if (this.memory[this.programCounter] == 39) {
            this.programCounter++;
            this.registers[0] -= this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub B num
        if (this.memory[this.programCounter] == 40) {
            this.programCounter++;
            this.registers[1] -= this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // sub B reg
        if (this.memory[this.programCounter] == 41) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[1] -= this.memory[this.registers[4]];
            else
                this.registers[1] -= this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub B mem
        if (this.memory[this.programCounter] == 42) {
            this.programCounter++;
            this.registers[1] -= this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub C num
        if (this.memory[this.programCounter] == 43) {
            this.programCounter++;
            this.registers[2] -= this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // sub C reg
        if (this.memory[this.programCounter] == 44) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[2] -= this.memory[this.registers[4]];
            else
                this.registers[2] -= this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub C mem
        if (this.memory[this.programCounter] == 45) {
            this.programCounter++;
            this.registers[2] -= this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub D num
        if (this.memory[this.programCounter] == 46) {
            this.programCounter++;
            this.registers[3] -= this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // sub D reg
        if (this.memory[this.programCounter] == 47) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[3] -= this.memory[this.registers[4]];
            else
                this.registers[3] -= this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub D mem
        if (this.memory[this.programCounter] == 48) {
            this.programCounter++;
            this.registers[3] -= this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub M num
        if (this.memory[this.programCounter] == 49) {
            this.programCounter++;
            this.registers[4] -= this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // sub M reg
        if (this.memory[this.programCounter] == 50) {
            this.programCounter++;
            if (this.registers[this.memory[this.programCounter]] = 4)
                this.registers[4] -= this.memory[this.registers[4]];
            else
                this.registers[4] -= this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // sub M mem
        if (this.memory[this.programCounter] == 51) {
            this.programCounter++;
            this.registers[4] -= this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // cmp A num
        if (this.memory[this.programCounter] == 52) {
            this.programCounter++;
            if (this.registers[0] == this.memory[this.programCounter])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[0] > this.memory[this.programCounter])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp A reg
        if (this.memory[this.programCounter] == 53) {
            this.programCounter++;
            let res = 0;
            if (this.registers[this.memory[this.programCounter]] = 4)
                res = this.memory[this.registers[4]];
            else
                res = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            if (this.registers[0] == res)
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[0] > res)
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            return;
        }
        // cmp A mem
        if (this.memory[this.programCounter] == 54) {
            this.programCounter++;
            if (this.registers[0] == this.memory[this.memory[this.programCounter]])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[0] > this.memory[this.memory[this.programCounter]])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp B num
        if (this.memory[this.programCounter] == 55) {
            this.programCounter++;
            if (this.registers[1] == this.memory[this.programCounter])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[1] > this.memory[this.programCounter])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp B reg
        if (this.memory[this.programCounter] == 56) {
            this.programCounter++;
            let res = 0;
            if (this.registers[this.memory[this.programCounter]] = 4)
                res = this.memory[this.registers[4]];
            else
                res = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            if (this.registers[1] == res)
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[1] > res)
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            return;
        }
        // cmp B mem
        if (this.memory[this.programCounter] == 57) {
            this.programCounter++;
            if (this.registers[1] == this.memory[this.memory[this.programCounter]])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[1] > this.memory[this.memory[this.programCounter]])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp C num
        if (this.memory[this.programCounter] == 58) {
            this.programCounter++;
            if (this.registers[2] == this.memory[this.programCounter])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[2] > this.memory[this.programCounter])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp C reg
        if (this.memory[this.programCounter] == 59) {
            this.programCounter++;
            let res = 0;
            if (this.registers[this.memory[this.programCounter]] = 4)
                res = this.memory[this.registers[4]];
            else
                res = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            if (this.registers[2] == res)
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[2] > res)
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            return;
        }
        // cmp C mem
        if (this.memory[this.programCounter] == 60) {
            this.programCounter++;
            if (this.registers[2] == this.memory[this.memory[this.programCounter]])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[2] > this.memory[this.memory[this.programCounter]])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp D num
        if (this.memory[this.programCounter] == 61) {
            this.programCounter++;
            if (this.registers[3] == this.memory[this.programCounter])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[3] > this.memory[this.programCounter])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp D reg
        if (this.memory[this.programCounter] == 62) {
            this.programCounter++;
            let res = 0;
            if (this.registers[this.memory[this.programCounter]] = 4)
                res = this.memory[this.registers[4]];
            else
                res = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            if (this.registers[3] == res)
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[3] > res)
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            return;
        }
        // cmp D mem
        if (this.memory[this.programCounter] == 63) {
            this.programCounter++;
            if (this.registers[3] == this.memory[this.memory[this.programCounter]])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[3] > this.memory[this.memory[this.programCounter]])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp M num
        if (this.memory[this.programCounter] == 64) {
            this.programCounter++;
            if (this.registers[4] == this.memory[this.programCounter])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[4] > this.memory[this.programCounter])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // cmp M reg
        if (this.memory[this.programCounter] == 65) {
            this.programCounter++;
            let res = 0;
            if (this.registers[this.memory[this.programCounter]] = 4)
                res = this.memory[this.registers[4]];
            else
                res = this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            if (this.registers[4] == res)
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[4] > res)
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            return;
        }
        // cmp M mem
        if (this.memory[this.programCounter] == 66) {
            this.programCounter++;
            if (this.registers[4] == this.memory[this.memory[this.programCounter]])
                this.flags[0] = 1;
            else
                this.flags[0] = 0;
            if (this.registers[4] > this.memory[this.memory[this.programCounter]])
                this.flags[1] = 1;
            else
                this.flags[1] = 0;
            this.programCounter++;
            return;
        }
        // jmp
        if (this.memory[this.programCounter] == 67) {
            this.programCounter++;
            this.programCounter = this.memory[this.programCounter];
            return;
        }
        // je
        if (this.memory[this.programCounter] == 68) {
            this.programCounter++;
            if (this.flags[0] == 1)
                this.programCounter = this.memory[this.programCounter];
            else
                this.programCounter++;
            return;
        }
        // jne
        if (this.memory[this.programCounter] == 69) {
            this.programCounter++;
            if (this.flags[0] == 0)
                this.programCounter = this.memory[this.programCounter];
            else
                this.programCounter++;
            return;
        }
        // jl
        if (this.memory[this.programCounter] == 70) {
            this.programCounter++;
            if (this.flags[1] == 0)
                this.programCounter = this.memory[this.programCounter];
            else
                this.programCounter++;
            return;
        }
        // jb
        if (this.memory[this.programCounter] == 71) {
            this.programCounter++;
            if (this.flags[1] == 1)
                this.programCounter = this.memory[this.programCounter];
            else
                this.programCounter++;
            return;
        }
        // or A num
        if (this.memory[this.programCounter] == 72) {
            this.programCounter++;
            this.registers[0] = this.registers[0] | this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // or A reg
        if (this.memory[this.programCounter] == 73) {
            this.programCounter++;
            this.registers[0] = this.registers[0] | this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or A mem
        if (this.memory[this.programCounter] == 74) {
            this.programCounter++;
            this.registers[0] = this.registers[0] | this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or B num
        if (this.memory[this.programCounter] == 75) {
            this.programCounter++;
            this.registers[1] = this.registers[1] | this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // or B reg
        if (this.memory[this.programCounter] == 76) {
            this.programCounter++;
            this.registers[1] = this.registers[1] | this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or B mem
        if (this.memory[this.programCounter] == 77) {
            this.programCounter++;
            this.registers[1] = this.registers[1] | this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or C num
        if (this.memory[this.programCounter] == 78) {
            this.programCounter++;
            this.registers[2] = this.registers[2] | this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // or C reg
        if (this.memory[this.programCounter] == 79) {
            this.programCounter++;
            this.registers[2] = this.registers[2] | this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or C mem
        if (this.memory[this.programCounter] == 80) {
            this.programCounter++;
            this.registers[2] = this.registers[2] | this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or D num
        if (this.memory[this.programCounter] == 81) {
            this.programCounter++;
            this.registers[3] = this.registers[3] | this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // or D reg
        if (this.memory[this.programCounter] == 82) {
            this.programCounter++;
            this.registers[3] = this.registers[3] | this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or D mem
        if (this.memory[this.programCounter] == 83) {
            this.programCounter++;
            this.registers[3] = this.registers[3] | this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or M num
        if (this.memory[this.programCounter] == 84) {
            this.programCounter++;
            this.registers[4] = this.registers[4] | this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // or M reg
        if (this.memory[this.programCounter] == 85) {
            this.programCounter++;
            this.registers[4] = this.registers[4] | this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // or M mem
        if (this.memory[this.programCounter] == 86) {
            this.programCounter++;
            this.registers[4] = this.registers[4] | this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and A num
        if (this.memory[this.programCounter] == 87) {
            this.programCounter++;
            this.registers[0] = this.registers[0] & this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // and A reg
        if (this.memory[this.programCounter] == 88) {
            this.programCounter++;
            this.registers[0] = this.registers[0] & this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and A mem
        if (this.memory[this.programCounter] == 89) {
            this.programCounter++;
            this.registers[0] = this.registers[0] & this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and B num
        if (this.memory[this.programCounter] == 90) {
            this.programCounter++;
            this.registers[1] = this.registers[1] & this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // and B reg
        if (this.memory[this.programCounter] == 91) {
            this.programCounter++;
            this.registers[1] = this.registers[1] & this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and B mem
        if (this.memory[this.programCounter] == 92) {
            this.programCounter++;
            this.registers[1] = this.registers[1] & this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and C num
        if (this.memory[this.programCounter] == 93) {
            this.programCounter++;
            this.registers[2] = this.registers[2] & this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // and C reg
        if (this.memory[this.programCounter] == 94) {
            this.programCounter++;
            this.registers[2] = this.registers[2] & this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and C mem
        if (this.memory[this.programCounter] == 95) {
            this.programCounter++;
            this.registers[2] = this.registers[2] & this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and D num
        if (this.memory[this.programCounter] == 96) {
            this.programCounter++;
            this.registers[3] = this.registers[3] & this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // and D reg
        if (this.memory[this.programCounter] == 97) {
            this.programCounter++;
            this.registers[3] = this.registers[3] & this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and D mem
        if (this.memory[this.programCounter] == 98) {
            this.programCounter++;
            this.registers[3] = this.registers[3] & this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and M num
        if (this.memory[this.programCounter] == 99) {
            this.programCounter++;
            this.registers[4] = this.registers[4] & this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // and M reg
        if (this.memory[this.programCounter] == 100) {
            this.programCounter++;
            this.registers[4] = this.registers[4] & this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // and M mem
        if (this.memory[this.programCounter] == 101) {
            this.programCounter++;
            this.registers[4] = this.registers[4] & this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor A num
        if (this.memory[this.programCounter] == 102) {
            this.programCounter++;
            this.registers[0] = this.registers[0] ^ this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // xor A reg
        if (this.memory[this.programCounter] == 103) {
            this.programCounter++;
            this.registers[0] = this.registers[0] ^ this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor A mem
        if (this.memory[this.programCounter] == 104) {
            this.programCounter++;
            this.registers[0] = this.registers[0] ^ this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor B num
        if (this.memory[this.programCounter] == 105) {
            this.programCounter++;
            this.registers[1] = this.registers[1] ^ this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // xor B reg
        if (this.memory[this.programCounter] == 106) {
            this.programCounter++;
            this.registers[1] = this.registers[1] ^ this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor B mem
        if (this.memory[this.programCounter] == 107) {
            this.programCounter++;
            this.registers[1] = this.registers[1] ^ this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor C num
        if (this.memory[this.programCounter] == 108) {
            this.programCounter++;
            this.registers[2] = this.registers[2] ^ this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // xor C reg
        if (this.memory[this.programCounter] == 109) {
            this.programCounter++;
            this.registers[2] = this.registers[2] ^ this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor C mem
        if (this.memory[this.programCounter] == 110) {
            this.programCounter++;
            this.registers[2] = this.registers[2] ^ this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor D num
        if (this.memory[this.programCounter] == 111) {
            this.programCounter++;
            this.registers[3] = this.registers[3] ^ this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // xor D reg
        if (this.memory[this.programCounter] == 112) {
            this.programCounter++;
            this.registers[3] = this.registers[3] ^ this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor D mem
        if (this.memory[this.programCounter] == 113) {
            this.programCounter++;
            this.registers[3] = this.registers[3] ^ this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor M num
        if (this.memory[this.programCounter] == 114) {
            this.programCounter++;
            this.registers[4] = this.registers[4] ^ this.memory[this.programCounter];
            this.programCounter++;
            return;
        }
        // xor M reg
        if (this.memory[this.programCounter] == 115) {
            this.programCounter++;
            this.registers[4] = this.registers[4] ^ this.registers[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // xor M mem
        if (this.memory[this.programCounter] == 116) {
            this.programCounter++;
            this.registers[4] = this.registers[4] ^ this.memory[this.memory[this.programCounter]];
            this.programCounter++;
            return;
        }
        // call
        if (this.memory[this.programCounter] == 117) {
            this.programCounter++;
            let what = this.memory[this.programCounter];
            this.push(this.programCounter + 1);
            this.programCounter = what;
            return;
        }
        // ret
        if (this.memory[this.programCounter] == 118) {
            this.programCounter = this.pop();
            return;
        }
    }
    run() {
        this.running = true;
        while (this.running && this.programCounter != null && !isNaN(this.programCounter)) {
            console.log(this);
            this.step();
            if (this.programCounter > this.globalMemory - this.stackSize)
                this.running = false;
        }
    }
}
exports.Emulator = Emulator;
