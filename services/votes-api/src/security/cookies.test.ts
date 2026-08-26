import { v7 as uuidv7 } from 'uuid';
import { makeVoterCookie, verifyVoterCookie } from './cookies.js';

describe('voter HMAC cookie', () => {
  it('signs and verifies a uuidv7 identity id', () => {
    const id = uuidv7();
    const cookie = makeVoterCookie(id, 'pepper-a');
    expect(verifyVoterCookie(cookie, 'pepper-a')).toBe(id);
  });

  it('rejects tampering and wrong peppers', () => {
    const id = uuidv7();
    const cookie = makeVoterCookie(id, 'pepper-a');
    expect(verifyVoterCookie(cookie.replace(/.$/, '0'), 'pepper-a')).toBeNull();
    expect(verifyVoterCookie(cookie, 'pepper-b')).toBeNull();
    expect(verifyVoterCookie('not-a-cookie', 'pepper-a')).toBeNull();
  });
});
