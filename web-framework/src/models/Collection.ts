import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

/**
 * @type {T} model instance
 * @type {K} props stracture
 */
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deseralize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deseralize(value));
      });
      this.events.trigger('change');
    });
  }
}
