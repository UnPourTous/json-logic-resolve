module.exports = function resolveLogic (requirement = {}, object = {}, defaultValue) {
    if (defaultValue !== true && defaultValue !== false) {
        throw "defaultValue should be boolean!"
    }
    const {
        operator,
        left = {},
        right = {}
    } = requirement;
    if (operator === '&&') {
        return resolveLogic(left, object, defaultValue) && resolveLogic(right, object, defaultValue);
    } else if (operator === '||') {
        return resolveLogic(left, object, defaultValue) || resolveLogic(right, object, defaultValue);
    } else {
        const {
            key = ''
        } = requirement;
        var currentValue = object[key];
        switch (operator) {
            case 'bool': {
                const {
                    value
                } = requirement;
                if (value === true || value === false || value === "true" || value === "false") {
                    return value
                } else {
                    return defaultValue
                }
            }
            case 'match': {
                const {
                    regExp
                } = requirement;
                if (currentValue && regExp) {
                    var exp = new RegExp(regExp);
                    return exp.test(currentValue)
                } else {
                    return defaultValue
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
            case '[]': {
                const {
                    range = []
                } = requirement;
                if (range.length >= 2 && currentValue) {
                    return parseFloat(currentValue) >= (range[0] || 0) && parseFloat(currentValue) <= (range[range.length - 1] || 0)
                } else {
                    return defaultValue
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
                    return parseFloat(currentValue) >= value
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
            case '=': {
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
