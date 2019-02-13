var resolveLogic = require('../lib/Logic.js');
const expect = require('chai').expect;
var requirement = {
    operator: "&&",
    left: {
        operator: "&&",
        left: {
            operator: "in",
            key: "month",
            range: [1, 12]
        },
        right: {
            operator: "bool",
            value: "false"
        }
    },
    right: {
        operator: "||",
        left: {
            operator: "match",
            regExp: "^\\S{1,30}$",
            key: "text"
        },
        right: {
            operator: "[]",
            key: "hour",
            range: [0, 10]
        }
    }
};
var requirement1 = {
    operator: "&&",
    left: {
        operator: "&&",
        left: {
            operator: ">",
            key: "month",
            value: 30
        },
        right: {
            operator: "<",
            key: "hour",
            value: 8
        }
    },
    right: {
        operator: "||",
        left: {
            operator: "<=",
            key: "day",
            value: 2
        },
        right: {
            operator: ">=",
            key: "year",
            value: 20
        }
    }
};
var requirement2 = {
    operator: "=",
    key: "year",
    value: 10
};
var date = {
    text: "fdafdffdafdffdafdffdafds",
    year: 10,
    month: 12,
    day: 3,
    hour: 6
};
var result  = resolveLogic(requirement, date, false);
console.log('result:  '+ result);

describe("logic", function () {
    describe("requirement", function () {
        it("resolve match", function () {
            expect(resolveLogic(requirement, date, false)).to.equal(true);
        });
        it("resolve compare", function () {
            expect(resolveLogic(requirement1, date, false)).to.equal(false);
        })
        it("resolve equal", function () {
            expect(resolveLogic(requirement2, date, false)).to.equal(true);
        })
    })
})
