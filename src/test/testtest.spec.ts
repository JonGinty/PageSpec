import {describe, expect, test} from '@jest/globals';

describe("root module", () => {
    test("default test", async () => {
        expect(true).toBeTruthy();
    })
})