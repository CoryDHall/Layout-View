(function () {
  window.LayoutView = window.LayoutView || {};

  LayoutView.create = function () {
    function BodyLayout() {
      this.$levels = [];
    }

    BodyLayout.prototype.buildFrom = function ($parentEl) {
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
          Math.floor(255 * idx / $levels.length) +
          ", 100%, 50%, 0.8)";
        console.log(color);
        $level.css({ background: color });
      });
      return this;
    };
    return new BodyLayout();
  };
})();