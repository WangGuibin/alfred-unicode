'use strict';
const alfy = require('alfy');
(function() {
    //基于微信小程序神奇字体的实现方案 https://github.com/wind-liang/unicode
    //参考文档 https://www.unicode.org/charts/PDF/U1D400.pdf
    //Unicode 相关字母数字的范围
    const numArr = [
        //数字🔢
        0x1D71C,
        0x1D7D8,
        0x1D7E2,
        0x1D7EC,
        0x1D7F6
    ];

    //大写
    const capArr = [
        0x1D400,
        0x1D434,
        0x1D468,
        0x1D49C,
        0x1D4D0,
        0x1D504,
        0x1D538,
        0x1D56C,
        0x1D5A0,
        0x1D5D4,
        0x1D608,
        0x1D63C,
        0x1D670,
        0x1D6A8,
    ];

    //小写
    const lowerArr = [
        0x1D41A,
        0x1D44E,
        0x1D482,
        0x1D4B6,
        0x1D4EA,
        0x1D51E,
        0x1D552,
        0x1D586,
        0x1D5BA,
        0x1D5EE,
        0x1D622,
        0x1D656,
        0x1D68A,
        0x1D6FC
    ];

    function getMessageItem(startIndex, inputChar) {
        var newMessage = '';
        var codePoint = inputChar.charCodeAt(0);
        // A - Z 转换
        if (codePoint >= 65 && codePoint <= 90) {
            codePoint = startIndex + (codePoint - 65);
            newMessage = String.fromCodePoint(codePoint);
        }
        // a - z 转换
        else if (codePoint >= 97 && codePoint <= 122) {
            codePoint = startIndex + (codePoint - 97);
            newMessage = String.fromCodePoint(codePoint);
        } else {
            newMessage = String.fromCodePoint(codePoint);
        }
        // 0 - 9 转换
        if (numArr.includes(startIndex)) {
            if (codePoint >= 48 && codePoint <= 57) {
                codePoint = startIndex + (codePoint - 48);
                newMessage = String.fromCodePoint(codePoint);
            }
        }
        return newMessage
    }

    var data = [];
    const inputText = alfy.input
    for (let index = 0; index < capArr.length; index++) {
        const capValue = capArr[index];
        const lowerValue = lowerArr[index];
        const numValue = numArr[(index + 1) % numArr.length];
        var item = '';
        for (let _char of inputText) {
            const codePoint = _char.charCodeAt(0);
            // A - Z
            if (codePoint >= 65 && codePoint <= 90) {
                item += getMessageItem(capValue, _char)
            }
            // a - z 
            else if (codePoint >= 97 && codePoint <= 122) {
                item += getMessageItem(lowerValue, _char)
            } else {
                if (codePoint >= 48 && codePoint <= 57) {
                    item += getMessageItem(numValue, _char)
                } else {
                    item += _char;
                }
            }
        }
        data.push(item);
    }

    const result = data.map(function(item) {
        return {
            title: item,
            arg: item
        }
    });
    alfy.output(result);
})();