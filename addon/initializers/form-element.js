import Ember from 'ember';
import FormElement from 'ember-bootstrap/components/bs-form-element';

const {
  isBlank,
  Binding,
  computed,
  defineProperty
} = Ember;

export default function() {
  FormElement.reopen({
    classNameBindings: ['isValidating'],

    _attrValidations: null,
    isValidating: computed.readOnly('_attrValidations.isValidating'),
    notValidating: computed.not('isValidating').readOnly(),

    // Overwrite
    hasValidator: computed.notEmpty('_attrValidations').readOnly(),
    hasErrors: computed.and('_attrValidations.isInvalid', 'notValidating').readOnly(),

    validation: computed('hasErrors', 'hasValidator', 'showValidation', 'disabled', 'notValidating', function() {
      let vClass = this._super(...arguments);
      return vClass && this.get('notValidating') ? vClass : null;
    }),

    init() {
      this._super(...arguments);
      let property = this.get('property');

      if (!isBlank(property)) {
        Binding.from(`model.errors.${property}`).to('errors').disconnect(this);
        defineProperty(this, '_attrValidations', computed.readOnly(`model.validations.attrs.${property}`));
        defineProperty(this, 'errors', computed.readOnly(`_attrValidations.messages`));
      }
    }
  });
}
