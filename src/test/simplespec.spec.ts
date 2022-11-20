import {describe, expect, test} from '@jest/globals';
import {bind, fromQuery} from '../core/PageSpec';



describe("simple spec", () => {
    test("binding from query", async () => {
        const s = new SimpleSpec();
        fromQuery(s, {query: "somestring=test&somenumber=4.5&somebool=true"});
        expect(s.somestring).toEqual("test");
        expect(s.somenumber).toEqual(4.5);
        expect(s.somebool).toEqual(true);
    });

    test("inverted bindings from query", async () => {
        const s = new SimpleSpec();
        fromQuery(s, {query: "somestring=&somenumber=test&somebool=false"});
        expect(s.somestring).toEqual("");
        expect(s.somenumber).toBeNaN();
        expect(s.somebool).toEqual(false);
    });
});


class SimpleSpec {
    @bind() 
    somestring?: string;

    @bind({type: "number"})
    somenumber?: number;

    @bind({type: "boolean"})
    somebool?: number
}