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
    _attrValidations: null,

    hasErrors: computed.not('_attrValidations.isTruelyValid').readOnly(),

    validation: computed('hasErrors', 'hasValidator', 'showValidation', function() {
      if(this.get('_attrValidations.isValidating')) {
        return null;
      }
      return this._super(...arguments);
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
