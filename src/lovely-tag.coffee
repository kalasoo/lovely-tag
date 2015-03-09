# TAG
class Tag
    constructor: (str, hasHashTag=true) ->
        @text = str
        @$checkbox = $('<input>').attr
            type: 'checkbox'
            name: 'tags'
            value: @text
            checked: 'checked'
        @$ele = $('<div>')
            .addClass 'tag'
            .text "#{'#' if hasHashTag}#{@text}"
            .append @$checkbox
            .click () =>
                if @$ele.hasClass('to-be-crossed')
                    @destroy()
                else
                    @toBeDeleted()
    justAdded: () ->
        @$ele.addClass('added')
        this
    toBeDeleted: () ->
        @$ele.addClass('to-be-crossed')
        this
    normal: () ->
        @$ele.removeClass('added to-be-crossed removed')
        this
    destroy: () ->
        @$ele.addClass('removed').remove()

LovelyTagInput = (ele, options) ->
        settings = $.extend
            hasHashTag: true
        , options or {}
        $new = $(ele)
        tags = []
        toBeDeletedTag = null
        $tags = $new.find('.tags')
        $input = $new.find('.new-tag-input')

        addTag = (str) ->
            _tag = new Tag str, settings.hasHashTag
            _tag.$ele.insertBefore $input
            tags.push _tag.justAdded()

        selectOrRemoveLastTag = () ->
            if toBeDeletedTag
                toBeDeletedTag.destroy()
                toBeDeletedTag = null
            else if tags.length > 0
                toBeDeletedTag = tags.pop().toBeDeleted()
        
        blurLastTag = () ->
            if toBeDeletedTag?
                toBeDeletedTag.normal()
                tags.push toBeDeletedTag
                toBeDeletedTag = null

        $input.keydown (e) ->
            _keyCode = e.keyCode or e.which
            _tagText = $input.val()
            if _tagText.length isnt 0 and (_keyCode is 9 or _keyCode is 13)
                blurLastTag()
                addTag _tagText
                $input.val ''
                e.preventDefault()
            if _tagText.length is 0 and _keyCode is 8
                selectOrRemoveLastTag()
                e.preventDefault()

$.fn.LovelyTag = (options) ->
    this.each () ->
        $ele = $(this)
        if not $ele.data('lovely-tag')
            $ele.data('lovely-tag', new LovelyTagInput this, options)

# TEST
$('.new-tag').LovelyTag()