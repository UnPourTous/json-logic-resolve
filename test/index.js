var resolveLogic = require('../lib/Logic.js');
const expect = require('chai').expect;

var requirement = {
    operator: "&&",
    operands: [
        {
            operator: "&&",
            operands: [
                {
                    operator: "in",
                    key: "month",
                    range: [1, 12]
                },
                {
                    operator: ">",
                    key: "month",
                    value: 10
                },
                {
                    operator: "<",
                    key: "month",
                    value: 40
                }
            ]
        },
        {
            operator: "||",
            operands: [
                {
                    operator: "match",
                    regExp: "^\\S{1,30}$",
                    key: "text"
                },
                {
                    operator: "==",
                    key: "day",
                    value: 3
                }
            ]
        }
    ]
};

var requirement1 = {
    operator: "||",
    operands: [
        {
            operator: "&&",
            operands: [
                {
                    operator: ">",
                    key: "month",
                    value: 30
                },
                {
                    operator: "<",
                    key: "hour",
                    value: 8
                }
            ]
        },
        {
            operator: "&&",
            operands: [
                {
                    operator: "<=",
                    key: "day",
                    value: 2
                },
                {
                    operator: ">=",
                    key: "year",
                    value: 20
                }
            ]
        }
    ]
};
var requirement2 = {
    operator: "==",
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
        });
        it("resolve equal", function () {
            expect(resolveLogic(requirement2, date, false)).to.equal(true);
        })
    })
});
