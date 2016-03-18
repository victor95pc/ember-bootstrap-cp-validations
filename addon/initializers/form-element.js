import Ember from 'ember';
import FormElement from 'ember-bootstrap/components/bs-form-element';

const {
  Binding
} = Ember;

export default function() {
  FormElement.reopen({
    init() {
      this._super(...arguments);

      let property = this.get('property');
      if (!Ember.isBlank(property)) {
        Binding.from(`model.errors.${property}`).to('errors').disconnect(this);
        Binding.from(`model.validations.attrs.${property}.messages`).to('errors').connect(this);
      }
    }
  });
}
