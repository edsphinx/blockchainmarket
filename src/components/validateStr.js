const validateStr = inputStr => {
    const trim = inputStr.trim();
    const raw = trim.substr(0, 2).toLowerCase() === '0x' ? trim.substr(2) : trim;
    const lengthRaw = raw.length;
    if (lengthRaw % 2 !== 0) {
        console.log('Input not valid');
        return '';
    }
    let charCode;
    const resStr = [];
    for (let i = 0; i < lengthRaw; i = i + 2) {
        charCode = parseInt(raw.substr(i, 2), 16);
        resStr.push(String.fromCharCode(charCode));
    }
    return resStr.join('');
};

export default validateStr;