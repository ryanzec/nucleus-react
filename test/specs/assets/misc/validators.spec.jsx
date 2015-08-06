var React = require('react/addons');
var validator = require('../../../../assets/misc/validator.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var minLengthMessage = 'min length of 4 required';
var maxLengthMessage = 'max length of 8 required';
var matchMessage = '"%%value%%" does not equal "match"';

var validatorsConfigNone = {};

var validatorsConfig1NotArray = {
  validators: function() {}
};

var validatorConfigMinLength = {
  validators: [{
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }]
};

var validatorConfigMinLengthWithMessage = {
  validators: [{
    message: minLengthMessage,
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }]
};

var validatorConfigMinMaxLength = {
  validators: [{
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }, {
    options: {
      length: 8
    },
    validator: function(value, options) {
      return value.length <= options.length;
    }
  }]
};

var validatorConfigMinMaxLengthWithMessage = {
  validators: [{
    message: minLengthMessage,
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }, {
    message: maxLengthMessage,
    options: {
      length: 8
    },
    validator: function(value, options) {
      return value.length <= options.length;
    }
  }]
};

var validatorConfigMatchWithMessage = {
  validators: [{
    message: matchMessage,
    options: {
      match: 'match',
    },
    validator: function(value, options) {
      return value === options.match;
    }
  }]
}

var validatorConfigMinMaxLengthMatchWithMessage = {
  validators: [{
    message: minLengthMessage,
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }, {
    message: maxLengthMessage,
    options: {
      length: 8
    },
    validator: function(value, options) {
      return value.length <= options.length;
    }
  }, {
    message: matchMessage,
    options: {
      match: 'match',
    },
    validator: function(value, options) {
      return value === options.match;
    }
  }]
};

var validatorConfigMinMaxLengthMatchWithMessageAllowEmpty = {
  allowEmpty: true,
  validators: [{
    message: minLengthMessage,
    options: {
      length: 4
    },
    validator: function(value, options) {
      return value.length >= options.length;
    }
  }, {
    message: maxLengthMessage,
    options: {
      length: 8
    },
    validator: function(value, options) {
      return value.length <= options.length;
    }
  }, {
    message: matchMessage,
    options: {
      match: 'match',
    },
    validator: function(value, options) {
      return value === options.match;
    }
  }]
};

describe('validator', function() {
  describe('shouldRenderValidation', function() {
    it('should return false is validation has not happened', function() {
      var myValidator = validator.create(validatorConfigMinLength);

      expect(myValidator.shouldRenderValidation()).to.be.false;
    });

    it('should return false if valid but configured for invalid only', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'test',
        renderValidation: 'invalid'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.false;
    });

    it('should return false if invalid but configured for valid only', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'tes',
        renderValidation: 'valid'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.false;
    });

    it('should return true if invalid and configured for invalid only', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'tes',
        renderValidation: 'invalid'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.true;
    });

    it('should return true if invalid and configured for both', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'tes',
        renderValidation: 'both'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.true;
    });

    it('should return true if valid and configured for valid only', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'test',
        renderValidation: 'valid'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.true;
    });

    it('should return true if valid and configured for both', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'test',
        renderValidation: 'both'
      }));

      expect(myValidator.shouldRenderValidation()).to.be.true;
    });
  });

  describe('renderValidationIcon', function() {
    it('should return null if it should not render validation', function() {
      var myValidator = validator.create(validatorConfigMinLength);

      expect(myValidator.renderValidationIcon()).to.be.null;
    });

    it('should return success icon if valid and it should render validation', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'test'
      }));

      var svgIconComponent = myValidator.renderValidationIcon();
      var div =  document.createElement('div');

      expect(React.render(svgIconComponent, div).props.fragment).to.equal('checkmark');
    });

    it('should return error icon if valid and it should render validation', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'tes'
      }));

      var svgIconComponent = myValidator.renderValidationIcon();
      var div =  document.createElement('div');

      expect(React.render(svgIconComponent, div).props.fragment).to.equal('x');
    });

    it('should not return icon if configured not to ', function() {
      var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
        validateValueOnCreate: 'tes',
        renderIcon: false
      }));

      expect(myValidator.renderValidationIcon()).to.be.null;
    });
  });

  it('should be able to create multiple instances', function() {
    var validator1 = validator.create(validatorsConfigNone);
    var validator2 = validator.create(validatorsConfigNone);

    validator2.valid = false;

    expect(validator1.valid).to.be.true;
    expect(validator2.valid).to.be.false;
  });

  it('should throw error if validator is not an array', function() {
    expect(function() {
      validator.create(validatorsConfig1NotArray);
    }).to.throw('You must pass validators as an array');
  });

  it('should be able to validate a value to true', function() {
    var myValidator = validator.create(validatorConfigMinLength);
    myValidator.validate('test');

    expect(myValidator.valid).to.be.true;
  });

  it('should validate to true is no validators are given', function() {
    var myValidator = validator.create(validatorsConfigNone);
    myValidator.validate('test');

    expect(myValidator.valid).to.be.true;
  });

  it('should work with passing any configuration', function() {
    var myValidator = validator.create();
    myValidator.validate('test');

    expect(myValidator.valid).to.be.true;
  });

  it('should be able to validate a value to false', function() {
    var myValidator = validator.create(validatorConfigMinLength);
    myValidator.validate('tes');

    expect(myValidator.valid).to.be.false;
  });

  it('should should the last validated value', function() {
    var myValidator = validator.create(validatorConfigMinLength);
    myValidator.validate('tes');

    expect(myValidator.lastValidatedValue).to.equal('tes');

    myValidator.validate('test');

    expect(myValidator.lastValidatedValue).to.equal('test');
  });

  it('should be able to validate on create', function() {
    var myValidator = validator.create(_.extend(_.clone(validatorConfigMinLength, true), {
      validateValueOnCreate: 'tes'
    }));

    expect(myValidator.valid).to.be.false;
  });

  it('should be able to define multiple validators', function() {
    var myValidator = validator.create(validatorConfigMinMaxLength);
    myValidator.validate('testtest');

    expect(myValidator.valid).to.be.true;
  });

  it('should be return false if even just one of the validators fail', function() {
    var myValidator = validator.create(validatorConfigMinMaxLength);
    myValidator.validate('testtestt');

    expect(myValidator.valid).to.be.false;
  });

  it('should be able to define error messages', function() {
    var myValidator = validator.create(validatorConfigMinLengthWithMessage);
    myValidator.validate('tes');

    expect(myValidator.validationErrors).to.deep.equal([
      minLengthMessage
    ]);
  });

  it('should be able define message with value inside it', function() {
    var myValidator = validator.create(validatorConfigMatchWithMessage);
    myValidator.validate('test');

    expect(myValidator.validationErrors).to.deep.equal([
      matchMessage.replace('%%value%%', 'test')
    ]);
  });

  it('should be able to store multiple error messages', function() {
    var myValidator = validator.create(validatorConfigMinMaxLengthMatchWithMessage);
    myValidator.validate('tes');

    expect(myValidator.validationErrors).to.deep.equal([
      minLengthMessage,
      matchMessage.replace('%%value%%', 'tes')
    ]);
  });

  it('should be able to allow a value to be empty even with validators', function() {
    var myValidator = validator.create(validatorConfigMinMaxLengthMatchWithMessageAllowEmpty);
    myValidator.validate('');

    expect(myValidator.valid).to.be.true;
  });

  it('should return true for should render validation', function() {
    var myValidator = validator.create(validatorConfigMinMaxLengthMatchWithMessage);
    myValidator.validate('tes');

    expect(myValidator.validationErrors).to.deep.equal([
      minLengthMessage,
      matchMessage.replace('%%value%%', 'tes')
    ]);
  });

  it('should be able to reset validator state to new', function() {
    var myValidator = validator.create(validatorConfigMinMaxLengthMatchWithMessage);
    myValidator.validate('tes');
    myValidator.reset();

    expect(myValidator.lastValidatedValue).to.be.null;
    expect(myValidator.valid).to.be.true;
    expect(myValidator.validationErrors).to.deep.equal([]);
    expect(myValidator.shouldRenderValidation()).to.be.false;
  });

  it('should return valid if the validator is turn off', function() {
    var myValidator = validator.create(validatorConfigMinMaxLength);
    myValidator.validate('testtestt');

    myValidator.updateOptions({
      isActive: false
    });

    expect(myValidator.valid).to.be.true;
  });
});
