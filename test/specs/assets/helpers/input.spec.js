var inputHelper = require('../../../../assets/helpers/input');

describe('input helper', function() {
    it('should get .checked for checkbox inputs', function() {
        var mock = {
            target: {
                tagName: 'INPUT',
                type: 'checkbox',
                value: 'no',
                checked: true
            }
        };

        expect(inputHelper.getValueFromEvent(mock)).to.be.true;
    });

    it('should get .value for non-checkbox inputs', function() {
        var mock = {
            target: {
                tagName: 'INPUT',
                type: 'password',
                value: 'password',
                checked: true
            }
        };

        expect(inputHelper.getValueFromEvent(mock)).to.equal('password');
    });
});
