(function () {
  window.LayoutView = window.LayoutView || {};

  var SelectorBox = LayoutView.SelectorBox = function (el) {
    this.$el = $(el);
    this.$box = $('<div>').text(
      this.$el.prop("tagName") + " " +
        this.$el.attr("id") + " " +
        this.$el.attr("class")
    ).addClass("layout-view-sel-box");
  };

  SelectorBox.prototype.show = function () {
    console.log(this);
    var offset = this.$el.offset();
    this.$box
      .css({position: "absolute", top: offset.top, left: offset.left, background: "rgba(255,255,255,0.75)", padding: 20})
      .appendTo('body');
  };

  SelectorBox.prototype.hide  = function () {
    this.$box.remove();
  };

  LayoutView.create = function () {
    function BodyLayout() {
      this.$levels = [];
    }

    BodyLayout.prototype.buildFrom = function ($parentEl) {
      console.log($parentEl);
      var $children = $parentEl.children();
      if ($children.length === 0) {
        return [];
      }
      return [$children].concat(this.buildFrom($children));
    };

    BodyLayout.prototype.buildFromBody = function () {
      var $body = $('body');
      this.$levels.push($body);
      this.$levels = this.$levels.concat(this.buildFrom($body));
      return this;
    };

    BodyLayout.prototype.colorize = function () {
      this.$levels.forEach(function ($level, idx, $levels) {
        var color = "hsla(" +
          Math.floor(255 * idx / ($levels.length - 1)) +
          ", 100%, 50%, 0.8)";
        console.log(color);
        $level.css({ background: color });
      });
      return this;
    };

    BodyLayout.prototype.shadowize = function () {
      this.$levels.forEach(function ($level) {
        $level.css({ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)"});
      });
      return this;
    };

    BodyLayout.prototype.bindSelectorBoxes = function () {
      this.$levels[0].click(function (e) {
        if ($(e.target).hasClass("layout-view-sel-box")) {
          return;
        }
        e.preventDefault();
        console.log(e);
        var selBox;
        selBox = new SelectorBox(e.target);
        selBox.show();
        selBox.$box.click(function (e) {
          selBox.hide();
          delete selBox.$box;
        });
      });
      return this;
    };

    BodyLayout.prototype.complete = function () {
      return this.buildFromBody().colorize().shadowize().bindSelectorBoxes();
    };

    return new BodyLayout();
  };
})();
