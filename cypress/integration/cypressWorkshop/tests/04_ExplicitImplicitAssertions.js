describe("Asertions about elements", () => {
  before(() => {
    cy.visit("https://example.cypress.io/commands/assertions");
  });
  
  it("Should", () => {
    cy.get(".assertion-table")
      .find("tbody tr:last")
      .should("have.class", "success")
      .find("td")
      .first()
      // checking the text of the  element in various ways
      .should("have.text", "Column content")
      .should("contain", "Column content")
      .should("have.html", "Column content")
      // chai-jquery uses "is()" to check if element matches selector
      .should("match", "td")
      // to match text content against a regular expression
      // first need to invoke jQuery method text()
      // and then match using regular expression
      .invoke("text")
      .should("match", /column content/i);

    // a better way to check element's text content against a regular expression
    // is to use "cy.contains"
    // https://on.cypress.io/contains
    cy.get(".assertion-table")
      .find("tbody tr:last")
      // finds first  element with text content matching regular expression
      .contains("td", /column content/i)
      .should("be.visible");
  });

  it("Expect", () => {
    expect(true).to.be.true;
    const o = { foo: "bar" };
    expect(o).to.equal(o);
    expect(o).to.deep.equal({ foo: "bar" });
    // matching text using regular expression
    expect("FooBar").to.match(/bar$/i);
    const person = {
      name: "Joe",
      age: 20,
    };
    assert.isObject(person, "value is object");
  });
});
