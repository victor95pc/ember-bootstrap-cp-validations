import Ember from 'ember';
import Form from 'ember-bootstrap/components/bs-form';

export default function() {
  Form.reopen({
    validate(model) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        model.validate().then(() => model.get('validations.isTruelyValid') ? resolve() : reject(), reject);
      });
    },

    submit(e) {
      if (e) {
        e.preventDefault();
      }
      if (!this.get('hasValidator')) {
        return this.sendAction();
      } else {
        this.validate(this.get('model')).then(() => this.sendAction(), () => {
          this.get('childFormElements').setEach('showValidation', true);
          return this.sendAction('invalid');
        });
      }
    }
  });
}
