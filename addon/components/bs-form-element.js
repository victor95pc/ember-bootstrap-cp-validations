import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form-element';

const {
  computed,
  defineProperty
} = Ember;

export default BsFormElement.extend({
    _attrValidations: null,
    notValidating: computed.not('isValidating').readOnly(),
    notDisabled: computed.not('disabled').readOnly(),

    // Overwrite
    hasValidator: computed.notEmpty('_attrValidations').readOnly(),
    hasErrors: computed.and('_attrValidations.isInvalid', 'notValidating').readOnly(),
    isValidating: computed.readOnly('_attrValidations.isValidating'),
    required: computed.and('_attrValidations.options.presence.presence', 'notDisabled'),

    setupValidations() {
      defineProperty(this, '_attrValidations', computed.readOnly(`model.validations.attrs.${this.get('property')}`));
      defineProperty(this, 'errors', computed.readOnly(`_attrValidations.messages`));
    }
});
