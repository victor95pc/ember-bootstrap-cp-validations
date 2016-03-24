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

      this.sendAction('beforeSubmit', e);

      if (!this.get('hasValidator')) {
        return this.sendAction('action', e);
      } else {
        let validationPromise = this.validate(this.get('model'));
        if (validationPromise && validationPromise instanceof Ember.RSVP.Promise) {
          validationPromise.then((r) => this.sendAction('action', e, r), (err) => {
            this.get('childFormElements').setEach('showValidation', true);
            return this.sendAction('invalid', e, err);
          });
        }
      }
    },
  });
}
