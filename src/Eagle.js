import $ from 'jquery';

class Eagle {
  constructor(rootElement = document.body) {
    let events = this._events;
    let eventHandlers = this._eventHandlers;

    debugger;
  }

  async request(serviceName, apiName, options) {


    return request.send(options);
  }

  get _events() {
    debugger;
    let events = this.events;
    let events1 = super.events;
    debugger;
  }

  get _eventHandlers() {
    debugger;
    let events = this.eventHandlers;
    let events1 = super.eventHandlers;

    debugger;
  }

  events = {
    'click div': 'aa'
  }

  eventHandlers = {
    aa(e, $el) {
      e.preventDefault();
    }
  }

}

export default Eagle;