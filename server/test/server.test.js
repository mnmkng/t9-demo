"use strict";

const path = require("path");
const { fork } = require("child_process");
const axios = require("axios");

const DEFAULT_HOSTNAME_REGEX = /^(0\.0\.0\.0)|(::)$/;
const LOCALHOST = "127.0.0.1";
const PATH_TO_SERVER = path.join(__dirname, "..", "index.js");
const CWD = path.dirname(PATH_TO_SERVER);

require("dotenv").config({
  path: path.join(CWD, ".env")
});

let subProcess;
let baseUrl;
console.log(process.env.TEST_USER);

/**
 * Forks the server in a sub-process and awaits
 * a message that will be sent the moment the
 * server starts listening.
 */
async function startServer () {

  const opts = {
    cwd: CWD
  };

  return new Promise((resolve, reject) => {
    subProcess = fork(PATH_TO_SERVER, opts);
    subProcess.once("error", e => reject(e));
    subProcess.once("message", m => resolve(m));
  });
}

/**
 * Helper to handle running the test on Windows
 * where using 127.0.0.1 is necessary. Also handles
 * IPv6 addresses just in case...
 */
function getUrl ({ address, port }) {
  if (DEFAULT_HOSTNAME_REGEX.test(address)) {
    address = LOCALHOST;
  }
  return `http://${address}:${port}`;
}

beforeAll(async () => {
  const msg = await startServer();
  baseUrl = getUrl(msg);
});

afterAll(() => {
  subProcess.kill();
});

describe("Integration tests", () => {
  test("Booting up the server", () => {
    expect(baseUrl).toBeDefined();
  });

  test("hitting the root route", async () => {
    expect.assertions(3);
    try {
      await axios(baseUrl);
    } catch (e) {
      expect(e.response.status).toEqual(403);
      expect(e.response.data.message).toEqual("Unauthorized");
      expect(e.response.data.status).toEqual(403);
    }
  });

  test("hitting the demo route", async () => {

    let { data } = await axios(`${baseUrl}/demo`);
    expect(data).toEqual([]);

    ({ data } = await axios(`${baseUrl}/demo/9`));
    expect(data).toEqual([ "we", "ye", "you", "who", "way", "yes", "why", "yet", "war", "wet", "win", "yep", "wit", "wee", "wait", "wage" ]);
  });

  test("hitting the english (authed) route", async () => {
    expect.assertions(8);

    const { TEST_USER, TEST_PWD } = process.env;

    const { headers } = await axios.post(`${baseUrl}/signin`, { email: TEST_USER, password: TEST_PWD });
    expect(headers[ "set-cookie" ][ 0 ]).toBeDefined();
    const token = headers[ "set-cookie" ][ 0 ].split(";")[ 0 ];

    const config = { headers: { Cookie: token } };

    let { data } = await axios(`${baseUrl}/english`, config);
    expect(data).toEqual([]);

    ({ data } = await axios(`${baseUrl}/english/9`, config));
    expect(data[0]).toBe("x");
    expect(data[1]).toBe("w");
    expect(data[2]).toBe("y");
    expect(data[3]).toBe("z");

    try {
      await axios(`${baseUrl}/english`);
    } catch (e) {
      expect(e.response.status).toEqual(401);
      expect(e.response.data).toEqual("Unauthorized");
    }

  });
});