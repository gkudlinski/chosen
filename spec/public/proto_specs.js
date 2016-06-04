(function() {
  describe("Basic setup", function() {
    it("should add expose a Chosen global", function() {
      return expect(Chosen).toBeDefined();
    });
    return it("should create very basic chosen", function() {
      var container, div, select, tmpl;
      tmpl = "      <select data-placeholder='Choose a Country...'>        <option value=''></option>        <option value='United States'>United States</option>        <option value='United Kingdom'>United Kingdom</option>        <option value='Afghanistan'>Afghanistan</option>      </select>    ";
      div = new Element("div");
      document.body.insert(div);
      div.update(tmpl);
      select = div.down("select");
      expect(select).toBeDefined();
      new Chosen(select);
      ["container", "container-single", "single", "default"].forEach(function(clazz) {
        var el;
        el = div.down(".chosen-" + clazz);
        return expect(el).toBeDefined();
      });
      expect($F(select)).toBe("");
      container = div.down(".chosen-container");
      container.simulate("mousedown");
      expect(container.hasClassName("chosen-container-active")).toBe(true);
      container.select(".active-result").last().simulate("mouseup");
      expect($F(select)).toBe("Afghanistan");
      return div.remove();
    });
  });

}).call(this);
