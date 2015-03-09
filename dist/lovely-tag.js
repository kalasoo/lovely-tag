(function() {
  var LovelyTagInput, Tag;

  Tag = (function() {
    function Tag(str, hasHashTag) {
      if (hasHashTag == null) {
        hasHashTag = true;
      }
      this.text = str;
      this.$checkbox = $('<input>').attr({
        type: 'checkbox',
        name: 'tags',
        value: this.text,
        checked: 'checked'
      });
      this.$ele = $('<div>').addClass('tag').text("" + (hasHashTag ? '#' : void 0) + this.text).append(this.$checkbox).click((function(_this) {
        return function() {
          if (_this.$ele.hasClass('to-be-crossed')) {
            return _this.destroy();
          } else {
            return _this.toBeDeleted();
          }
        };
      })(this));
    }

    Tag.prototype.justAdded = function() {
      this.$ele.addClass('added');
      return this;
    };

    Tag.prototype.toBeDeleted = function() {
      this.$ele.addClass('to-be-crossed');
      return this;
    };

    Tag.prototype.normal = function() {
      this.$ele.removeClass('added to-be-crossed removed');
      return this;
    };

    Tag.prototype.destroy = function() {
      return this.$ele.addClass('removed').remove();
    };

    return Tag;

  })();

  LovelyTagInput = function(ele, options) {
    var $input, $new, $tags, addTag, blurLastTag, selectOrRemoveLastTag, settings, tags, toBeDeletedTag;
    settings = $.extend({
      hasHashTag: true
    }, options || {});
    $new = $(ele);
    tags = [];
    toBeDeletedTag = null;
    $tags = $new.find('.tags');
    $input = $new.find('.new-tag-input');
    addTag = function(str) {
      var _tag;
      _tag = new Tag(str, settings.hasHashTag);
      _tag.$ele.insertBefore($input);
      return tags.push(_tag.justAdded());
    };
    selectOrRemoveLastTag = function() {
      if (toBeDeletedTag) {
        toBeDeletedTag.destroy();
        return toBeDeletedTag = null;
      } else if (tags.length > 0) {
        return toBeDeletedTag = tags.pop().toBeDeleted();
      }
    };
    blurLastTag = function() {
      if (toBeDeletedTag != null) {
        toBeDeletedTag.normal();
        tags.push(toBeDeletedTag);
        return toBeDeletedTag = null;
      }
    };
    return $input.keydown(function(e) {
      var _keyCode, _tagText;
      _keyCode = e.keyCode || e.which;
      _tagText = $input.val();
      if (_tagText.length !== 0 && (_keyCode === 9 || _keyCode === 13)) {
        blurLastTag();
        addTag(_tagText);
        $input.val('');
        e.preventDefault();
      }
      if (_tagText.length === 0 && _keyCode === 8) {
        selectOrRemoveLastTag();
        return e.preventDefault();
      }
    });
  };

  $.fn.LovelyTag = function(options) {
    return this.each(function() {
      var $ele;
      $ele = $(this);
      if (!$ele.data('lovely-tag')) {
        return $ele.data('lovely-tag', new LovelyTagInput(this, options));
      }
    });
  };

  $('.new-tag').LovelyTag();

}).call(this);
