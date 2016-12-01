import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form-element';

const {
  computed,
  defineProperty,
  isBlank
} = Ember;

export default BsFormElement.extend({
  attrValidations: null,
  notValidating: computed.not('isValidating').readOnly(),
  notDisabled: computed.not('disabled').readOnly(),

  // Overwrite
  hasValidator: computed.notEmpty('attrValidations').readOnly(),
  hasErrors: computed.and('attrValidations.isInvalid', 'notValidating').readOnly(),
  isValidating: computed.readOnly('attrValidations.isValidating'),
  required: computed.and('attrValidations.options.presence.presence', 'notDisabled'),

  setupValidations() {
    if (isBlank(this.get("attrValidations"))) {
      defineProperty(this, 'attrValidations', computed.readOnly(`model.validations.attrs.${this.get('property')}`));
    }
    
    defineProperty(this, 'errors', computed.readOnly('attrValidations.messages'));
    defineProperty(this, 'warnings', computed.readOnly('attrValidations.warningMessages'));
  }
});
