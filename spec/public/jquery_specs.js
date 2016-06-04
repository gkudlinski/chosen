(function() {
  describe("Basic setup", function() {
    it("should add chosen to jQuery object", function() {
      return expect(jQuery.fn.chosen).toBeDefined();
    });
    return it("should create very basic chosen", function() {
      var container, div, select, tmpl;
      tmpl = "      <select data-placeholder='Choose a Country...'>        <option value=''></option>        <option value='United States'>United States</option>        <option value='United Kingdom'>United Kingdom</option>        <option value='Afghanistan'>Afghanistan</option>      </select>    ";
      div = $("<div>").html(tmpl);
      select = div.find("select");
      expect(select.size()).toBe(1);
      select.chosen();
      ["container", "container-single", "single", "default"].forEach(function(clazz) {
        var el;
        el = div.find(".chosen-" + clazz);
        return expect(el.size()).toBe(1);
      });
      expect(select.val()).toBe("");
      container = div.find(".chosen-container");
      container.trigger("mousedown");
      expect(container.hasClass("chosen-container-active")).toBe(true);
      container.find(".active-result").last().trigger("mouseup");
      return expect(select.val()).toBe("Afghanistan");
    });
  });

  describe("search", function() {
    it("should display only matching items when entering a search term", function() {
      var container, div, results, search_field, select, tmpl;
      tmpl = "          <select data-placeholder='Choose a Country...'>            <option value=''></option>            <option value='United States'>United States</option>            <option value='United Kingdom'>United Kingdom</option>            <option value='Afghanistan'>Afghanistan</option>          </select>        ";
      div = $("<div>").html(tmpl);
      select = div.find("select");
      select.chosen();
      container = div.find(".chosen-container");
      container.trigger("mousedown");
      results = div.find(".active-result");
      expect(results.size()).toBe(3);
      search_field = div.find(".chosen-search input").first();
      search_field.val("Afgh");
      search_field.trigger('keyup');
      results = div.find(".active-result");
      expect(results.size()).toBe(1);
      return expect(results.first().text()).toBe("Afghanistan");
    });
    return it("should only show max_shown_results items in results", function() {
      var container, div, results, search_field, select, tmpl;
      tmpl = "          <select data-placeholder='Choose a Country...'>            <option value=''></option>            <option value='United States'>United States</option>            <option value='United Kingdom'>United Kingdom</option>            <option value='Afghanistan'>Afghanistan</option>          </select>        ";
      div = $("<div>").html(tmpl);
      select = div.find("select");
      select.chosen({
        max_shown_results: 1
      });
      container = div.find(".chosen-container");
      container.trigger("mousedown");
      results = div.find(".active-result");
      expect(results.size()).toBe(1);
      search_field = div.find(".chosen-search input").first();
      search_field.val("United");
      search_field.trigger("keyup");
      results = div.find(".active-result");
      expect(results.size()).toBe(1);
      expect(results.first().text()).toBe("United States");
      search_field.val("United Ki");
      search_field.trigger("keyup");
      results = div.find(".active-result");
      expect(results.size()).toBe(1);
      return expect(results.first().text()).toBe("United Kingdom");
    });
  });

}).call(this);
