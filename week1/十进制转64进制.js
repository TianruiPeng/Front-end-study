const char =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '<', '>'];

// 十进制转k进制
const tenToK = (num, k) => {
    // 整数部分
    const a = Math.floor(num);
    // 小数部分
    let b = String(num).split('.')[1].split('');
    // 整数部分的k进制
    const ak = [];
    // 小树部分的k进制
    const bk = [];

    // 整数转k进制的方法：整数÷k，取余数，逆序
    const recursive = (number, res) => {
        const ans = Math.floor(number / k);
        const remainder = number % k;
        if (ans < k) {
            res.push(char[remainder]);
            res.push(char[ans]);
            return;
        }
        recursive(ans);
        res.push(char[remainder]);
    }
    recursive(a, ak);

    // 小数部分反转后，视作整数转为64进制
    const temp = [];
    while (b.length !== 0) {
        temp.push(b.pop());
    }
    b = Number(temp.join(''));
    recursive(b, bk);

    // 返回结果
    return `${ak.join('')}.${bk.join('')}`
}

// k进制转十进制
const kToTen = (str, k) => {
    // 整数部分
    let a = str.split('.')[0].split('');
    // 小数部分
    let b = str.split('.')[1].split('');

    const convert = (array) => {
        let count = 0;
        let sum = 0;
        while (array.length !== 0) {
            const bit = array.shift();
            sum += char.indexOf(bit) * Math.pow(k, count);
            count++;
            ;
        }
        return sum;
    }

    // 小数部分反转
    let tenB = String(convert(b, 64)).split('');
    const temp = [];
    while (tenB.length !== 0) {
        temp.push(tenB.pop());
    }
    tenB = temp.join('');

    return Number(`${String(convert(a, 64))}.${tenB}`);
}

const testNmber = 123.456;
const n64 = tenToK(testNmber, 64);
const n10 = kToTen(n64, 64)