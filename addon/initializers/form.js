import Form from 'ember-bootstrap/components/bs-form';

export default function() {
  Form.reopen({
    _propagateErrors() {
      this.get('childFormElements').setEach('showValidation', true);
      return this.sendAction('invalid');
    },

    submit(e) {
      if (e) {
        e.preventDefault();
      }
      if (!this.get('hasValidator')) {
        return this.sendAction();
      } else {
        return this.get('model').validate().then(() => {
          if (this.get('model.validations.isTruelyValid')) {
            return this.sendAction();
          } else {
            this._propagateErrors();
          }
        }, this._propagateErrors);
      }
    }
  });
}
