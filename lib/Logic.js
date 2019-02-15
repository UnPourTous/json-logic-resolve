module.exports = function resolveLogic (requirement = {}, object = {}, defaultValue) {
    if (defaultValue !== true && defaultValue !== false) {
        throw "defaultValue should be boolean!"
    }
    const {
        operator,
        operands = []
    } = requirement;
    if (operator === '&&') {
        if (operands.length > 0) {
            var resultValue = true;
            operands.forEach(operand => {
                resultValue = resultValue && resolveLogic(operand, object, defaultValue);
            });
            return resultValue;
        } else {
            return defaultValue;
        }
    } else if (operator === '||') {
        if (operands.length > 0) {
            var resultValue = false;
            operands.forEach(operand => {
                resultValue = resultValue || resolveLogic(operand, object, defaultValue);
            });
            return resultValue;
        } else {
            return defaultValue;
        }
    } else {
        const {
            key = ''
        } = requirement;
        var currentValue = object[key];
        switch (operator) {
            case 'match': {
                const {
                    regExp
                } = requirement;
                if (currentValue && regExp) {
                    var exp = new RegExp(regExp);
                    return exp.test(currentValue);
                } else {
                    return defaultValue;
                }
            }
            case 'in': {
                const {
                    range = []
                } = requirement;
                if (currentValue && range.length > 0) {
                    return range.includes(currentValue);
                } else {
                    return defaultValue;
                }
            }
            case '>': {
                const {
                    value
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(value)) {
                    return parseFloat(currentValue) > value;
                } else {
                    return defaultValue;
                }
            }
            case '>=': {
                const {
                    value
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(value)) {
                    return parseFloat(currentValue) >= value;
                } else {
                    return defaultValue;
                }
            }
            case '<': {
                const {
                    value
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(value)) {
                    return parseFloat(currentValue) < value;
                } else {
                    return defaultValue;
                }
            }
            case '<=': {
                const {
                    value
                } = requirement;
                if (!isNaN(currentValue) && !isNaN(value)) {
                    return parseFloat(currentValue) <= value;
                } else {
                    return defaultValue;
                }
            }
            case '==': {
                const {
                    value
                } = requirement;
                if (currentValue && value) {
                    return currentValue === value;
                } else {
                    return defaultValue;
                }
            }
            default:
                return defaultValue;
        };
    }
};
