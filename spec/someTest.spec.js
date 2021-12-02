describe("A suite is just a function", () => {
    let a;

    it("and so is a spec", () => {
        a = false;

        expect(a).toBe(false);
    });
});