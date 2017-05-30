import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class CompoundService {
  URL: string;
  constructor() {
    this.URL = environment.api.url;
  }

  list(skip = 0, limit = 15): Promise<any> {
    return fetch(`${this.URL}/compounds?skip=${skip}&limit=${limit}`)
      .then(res => res.json());
  }

  create(email, name, dataset): Promise<any> {
    const payload = JSON.stringify({
      email,
      name,
      dataset
    });

    return fetch(`${this.URL}/compounds`, {
      method: "POST",
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  get(id: string): Promise<any> {
    return fetch(`${this.URL}/compounds/${id}`)
      .then(res => res.json());
  }
}
