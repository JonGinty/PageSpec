import {describe, expect, test} from '@jest/globals';
import {bind, fromJson, fromQuery} from '../core/PageSpec';



describe("simple spec", () => {
    test("binding from query", () => {
        const s = fromQuery(SimpleSpec, {query: "somestring=test&somenumber=4.5&somebool=true"});
        expect(s.somestring).toEqual("test");
        expect(s.somenumber).toEqual(4.5);
        expect(s.somebool).toEqual(true);
    });

    test("inverted bindings from query", () => {
        const s = fromQuery(SimpleSpec, {query: "somestring=&somenumber=test&somebool=false"});
        expect(s.somestring).toEqual("");
        expect(s.somenumber).toBeNaN();
        expect(s.somebool).toEqual(false);
    });

    test("binding from json for some reason", () => {
        const data = {
            somestring: "test",
            somenumber: "4.5",
            somebool: "true"
        }
        const s = fromJson(SimpleSpec, JSON.stringify(data));
        expect(s.somestring).toEqual("test");
        expect(s.somenumber).toEqual(4.5);
        expect(s.somebool).toEqual(true);
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