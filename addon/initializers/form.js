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

      this.sendAction('before');

      if (!this.get('hasValidator')) {
        return this.sendAction();
      } else {
        let validationPromise = this.validate(this.get('model'));
        if (validationPromise && validationPromise instanceof Ember.RSVP.Promise) {
          validationPromise.then((r) => this.sendAction('action', r), (err) => {
            this.get('childFormElements').setEach('showValidation', true);
            return this.sendAction('invalid', err);
          });
        }
      }
    },
  });
}
