$(function () {
    'use strict';
    var gridster;
    var wordArray = ['&amp;', 'a', 'a', 'a', 'about', 'above', 'act', 'again', 'age', 'air', 'all', 'alone', 'always', 'am', 'an', 'an', 'and', 'and', 'and', 'and', 'angry', 'apartment', 'are', 'are', 'as', 'as', 'ask', 'at', 'at', 'away', 'bacon', 'bad', 'be', 'be', 'beauty', 'bed', 'been', 'begin', 'being', 'believe', 'belong', 'bitter', 'blank', 'blue', 'break', 'bring', 'burn', 'but', 'but', 'by', 'by', 'call', 'can', 'car', 'change', 'chocolate', 'city', 'clock', 'cold', 'come', 'could', 'cry', 'curse', 'd', 'day', 'dead', 'deep', 'did', 'die', 'different', 'dirty', 'do', 'dog', 'door', 'dream', 'drink', 'drive', 'dry', 'e', 'easy', 'eat', 'ed', 'ed', 'empty', 'end', 'er', 'es', 'es', 'est', 'ever', 'eye', 'face', 'family', 'far', 'feel', 'fight', 'find', 'fire', 'fix', 'for', 'for', 'forever', 'forget', 'forgive', 'friend', 'from', 'from', 'ful', 'funny', 'garden', 'gas', 'get', 'girl', 'give', 'go', 'gone', 'good', 'hair', 'hand', 'happen', 'happiness', 'happy', 'hard', 'has', 'has', 'have', 'have', 'he', 'he', 'heart', 'heavy', 'help', 'her', 'her', 'here', 'high', 'him', 'him', 'his', 'his', 'hold', 'hope', 'hour', 'how', 'hungry', 'I', 'I', 'I', 'ice', 'if', 'in', 'in', 'ing', 'ing', 'ing', 'is', 'is', 'it', 'it', 'keep', 'kill', 'kiss', 'kitchen', 'know', 'late', 'laugh', 'lazy', 'learn', 'less', 'let', 'letter', 'life', 'like', 'like', 'listen', 'little', 'live', 'lock', 'lone', 'long', 'look', 'love', 'ly', 'ly', 'mad', 'make', 'man', 'matter', 'me', 'me', 'mean', 'meet', 'mind', 'minute', 'miss', 'mixtape', 'money', 'moon', 'morning', 'move', 'movie', 'music', 'must', 'my', 'my', 'name', 'near', 'need', 'never', 'new', 'next', 'night', 'no', 'not', 'nothing', 'now', 'number', 'of', 'of', 'okay', 'old', 'on', 'on', 'one', 'or', 'or', 'our', 'out', 'over', 'own', 'page', 'paper', 'party', 'people', 'phone', 'play', 'please', 'pretty', 'purple', 'put', 'question', 'quick', 'r', 'r', 'rain', 'read', 'ready', 'reason', 'red', 'right', 'road', 'room', 'rough', 'run', 's', 's', 's', 's', 'sad', 'safe', 'said', 'same', 'save', 'say', 'see', 'seek', 'shadow', 'she', 'she', 'short', 'should', 'show', 'sick', 'silence', 'sit', 'skin', 'sky', 'sleep', 'slow', 'small', 'smell', 'so', 'some', 'song', 'sorry', 'start', 'stay', 'still', 'stop', 'story', 'sugar', 'summer', 'sun', 'sure', 'sweet', 'table', 'take', 'talk', 'tear', 'tell', 'thank', 'the', 'the', 'the', 'their', 'there', 'these', 'they', 'they', 'thing', 'think', 'those', 'thought', 'through', 'time', 'to', 'to', 'today', 'try', 'TV', 'up', 'us', 'use', 'very', 'wait', 'walk', 'want', 'warm', 'was', 'was', 'water', 'way', 'we', 'week', 'well', 'were', 'wet', 'what', 'when', 'white', 'who', 'why', 'will', 'will', 'window', 'wish', 'with', 'with', 'wonder', 'word', 'work', 'would', 'write', 'y', 'y', 'yet', 'you', 'you', 'young', 'your'];

    gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [70, 45]
    }).data('gridster');

    function getRandomItem() {
        var randomNumber = Math.floor(Math.random() * wordArray.length);
        return randomNumber;
    }

    function getRandomWord() {
        return wordArray[getRandomItem()];
    }

    function getRandomGridsterItem() {
        var word = getRandomWord();
        var len = word.length;
        if (0 < len && len < 4) {
            return ['<li>' + word + '<button class="removeButton">x</button></li>', 1, 1];
        }
        if (3 < len && len < 8) {
            return ['<li>' + word + '<button class="removeButton">x</button></li>', 2, 1];
        } else {
            return ['<li>' + word + '<button class="removeButton">x</button></li>', 3, 1];
        }
    }

    function createRandomGridsterArrayOfSize(noOfWords) {
        var widgets = [];
        for (var i = 0; i < noOfWords; i++) {
            widgets.push(getRandomGridsterItem());
        }
        return widgets;
    }

    var widgets = createRandomGridsterArrayOfSize(15);

    $.each(widgets, function (i, widget) {
        addMagnet(widget);
    });

    function addMagnet(widget) {
        gridster.add_widget.apply(gridster, widget);
    }

    document.getElementById('addMagnetButton').addEventListener('click', addOneMagnet);

    function addOneMagnet() {
        var widget = getRandomGridsterItem();
        gridster.add_widget.apply(gridster, widget);
    }

    $('body').on("click", ".gridster ul > li .removeButton", function () {
        gridster.remove_widget($(this).closest('li'));
    });

    document.getElementById('saveButton').addEventListener('click', postPoemDataToGoogle);

    function postPoemDataToGoogle() {
        var poemTitle = $('#poemTitle').val();
        var gridsterSerializeData = JSON.stringify(gridster.serialize());

        $.ajax({
            url: "https://docs.google.com/forms/d/1_Pao7ZY1IM_cTGXCS7-U6KF9EX6KHZ3U2T96d4xw4CA/formResponse",
            data: {
                "entry_26595242": poemTitle,
                "entry_929054865": gridsterSerializeData
            },
            type: "POST",
            dataType: "json",
            statusCode: {
                0: function () {
                    console.log("0 ok");
                },
                200: function () {
                    console.log("200 ok");
                }
            }
        });
    }

    function getPoemDataFromGoogle() {


        var JSONURL = 'https://spreadsheets.google.com/feeds/list/1SV2Vt-h9V4rOCwB4oE4_LRSBaQbqw2NseqQc_A6YrNU/1/public/values?alt=json';

        function callback(data) {
            var rows = [];

            var cells = data.feed.entry;

            for (var i = 0; i < cells.length; i++) {
                var rowObj = {};
                rowObj.timestamp = cells[i].title.$t;
                var rowCols = cells[i].content.$t.split(',');
                for (var j = 0; j < rowCols.length; j++) {
                    var keyVal = rowCols[j].split(':');
                    rowObj[keyVal[0].trim()] = keyVal[1].trim();
                }
                rows.push(rowObj);
            }

            var poemData = JSON.stringify(rows);
            var poemData_parsed = JSON.parse(poemData);
            console.log(poemData_parsed);

        }

        $.ajax({
            url: JSONURL,
            success: function (data) {
                callback(data);
            }
        });

    }

    getPoemDataFromGoogle();

});