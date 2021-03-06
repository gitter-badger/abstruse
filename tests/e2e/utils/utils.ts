import * as crypto from 'crypto';
import * as request from 'request';
import { exec } from 'child_process';

export function sendGitHubRequest(data: any, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let secret = 'thisIsSecret';  // todo, read that from config
    let sig = crypto.createHmac('sha1', secret).update(JSON.stringify(data)).digest('hex');
    headers['X-Hub-Signature'] = `sha1=${sig}`;

    let options = {
      url: 'http://localhost:6500/webhooks/github',
      method: 'POST',
      headers: headers,
      json: data
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject({
            statusCode: response.statusCode,
            response: body
          });
        }
      }
    });
  });
}

export function sendBitBucketRequest(data: any, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'http://localhost:6500/webhooks/bitbucket',
      method: 'POST',
      headers: headers,
      json: data
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject({
            statusCode: response.statusCode,
            response: body
          });
        }
      }
    });
  });
}

export function sendGitLabRequest(data: any, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'http://localhost:6500/webhooks/gitlab',
      method: 'POST',
      headers: headers,
      json: data
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject({
            statusCode: response.statusCode,
            response: body
          });
        }
      }
    });
  });
}

export function sendGogsRequest(data: any, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let secret = 'thisIsSecret';  // todo, read that from config
    let sig = crypto.createHmac('sha256', secret).update(JSON.stringify(data)).digest('hex');
    headers['x-gogs-signature'] = sig;

    let options = {
      url: 'http://localhost:6500/webhooks/gogs',
      method: 'POST',
      headers: headers,
      json: data
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject({
            statusCode: response.statusCode,
            response: body
          });
        }
      }
    });
  });
}
