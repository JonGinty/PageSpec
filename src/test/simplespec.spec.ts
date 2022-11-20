import {describe, expect, test} from '@jest/globals';
import {bind, BinderFunc, fromJson, fromQuery} from '../core/PageSpec';



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

    test("custom binder function", () => {
        const s = fromQuery(MoreAdvancedSpec, {query: "somestring=test&somenumber=4.5&somenegativenumber=6.1&somebool=true"});
        expect(s.somestring).toEqual("test");
        expect(s.somenumber).toEqual(4.5);
        expect(s.somebool).toEqual(true);
        expect(s.somenegativenumber).toEqual(-6.1);
    })
});


const negativeBinder: BinderFunc = (value:string) => 0 - Number(value);

class SimpleSpec {
    @bind() 
    somestring?: string;

    @bind({type: "number"})
    somenumber?: number;

    @bind({type: "boolean"})
    somebool?: boolean;
}

class MoreAdvancedSpec extends SimpleSpec {
    @bind({type: negativeBinder})
    somenegativenumber?: number;
}