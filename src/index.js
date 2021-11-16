
/*
 * 发送表情极简Demo
 */
(function(){
    var chatbox = document.getElementById("chatbox-message");
    var btn = document.getElementById("chatbox-emoji-btn");
    var panel = document.getElementById("chatbox-emoji-panel");
    var chatshow = document.getElementById("chatbox-show");

    var RongIMEmoji = RongIMLib.RongIMEmoji;

    var config = {
        size: 24,
        // url: '//cdn.ronghub.com/emojis-hd.png?replace', // 传入服务器路径
        url: '../images/emojis-hd.png?replace', // 传入本地路径
        lang: 'zh',
        extension: {
            dataSource: {
                u1F914: {
                    zh: '思考',
                    en: 'thinking face',
                    tag: '🤔',
                    position: '0px 0px'
                }
            },
            url: 'https://cdn.ronghub.com/thinking-face.png'
        }
    };

    RongIMEmoji.init(config);
    appendChild('init: 初始化RongIMEmoji');
    
    btn.onclick = function(){
        panel.style.display = "block";
        var emojis = getEmojiDetailList();
        bindClickEmoji(emojis);
        return false;
    };

    var symbolToEmojiBtn = document.getElementById("symbol-emoji");
    symbolToEmojiBtn.onclick = function(){
        var message = chatbox.value;
        message = RongIMEmoji.symbolToEmoji(message);
        appendChild('symbolToEmoji: ' + message);
        return false;
    };

    var emojiToSymbol = document.getElementById("emoji-symbol");
    emojiToSymbol.onclick = function(){
        var message = chatbox.value;
        message = RongIMEmoji.emojiToSymbol(message);
        appendChild('emojiToSymbol: ' + message);
        return false;
    };


    var emojiToHtmlBtn = document.getElementById("emoji-html");
    emojiToHtmlBtn.onclick = function(){
        var message = chatbox.value;
        message = RongIMEmoji.emojiToHTML(message, 33);
        appendChild('emojiToHtml: ' + message);
        return false;
    };

    var symbolToHtmlBtn = document.getElementById("symbol-html");
    symbolToHtmlBtn.onclick = function(){
        var message = chatbox.value;
        message = RongIMEmoji.symbolToHTML(message);
        appendChild('symbolToHtml: ' + message);
        return false;
    };

    var symbolToEmojiInvalid = document.getElementById("symbol-emoji-invalid");
    symbolToEmojiInvalid.onclick = function() {
        var message = chatbox.value;
        var isSupportEmoji = RongIMEmoji.isSupportEmoji;
        message = RongIMEmoji.symbolToEmoji(message, function(emoji) {
            return isSupportEmoji ? emoji : '<span style="color: rgb(182, 182, 182)">[emoji]</span>';
        });
        appendChild('symbolToEmoji: ' + message);
        return false;
    };


    function appendChild(text) {
        var div = document.createElement('div');
        div.innerHTML = '<li>' + text + '</li>';
        var child = div.childNodes[0];
        chatshow.appendChild(child);
    }

    function getEmojiDetailList() {
        var shadowDomList = [];
        for (var i = 0; i < RongIMEmoji.list.length; i++) {
            var value = RongIMEmoji.list[i];
            shadowDomList.push(value.node);
        }
        return shadowDomList;
    }

    function bindClickEmoji(emojis) {
        for(var i=0;i<emojis.length;i++){
            var emojiHtml = emojis[i];
            panel.appendChild(emojiHtml);
            emojiHtml.onclick = clickEmoji;
        }
    }

    function clickEmoji(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        if (document.all && !document.addEventListener === false) {
            console.log(target);
        }
        chatbox.value = chatbox.value + target.getAttribute("name");
    }
})();

function setupExpand(expandId) {
  var expandDom = document.getElementById(expandId);
  var display = expandDom.style.display;
  display = display === "none" ? "block" : "none";
  expandDom.style.display = display;
}