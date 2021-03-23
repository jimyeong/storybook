const moment = require("moment");


module.exports = {
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let newStr = str + " ";
            newStr = str.substring(0, len);
            newStr = str.substring(0, newStr.lastIndexOf(" "));
            newStr = (newStr.length > 0) ? newStr : newStr.substring(0, len);
            return newStr + "...";
        }
        return str;
    },
    stripTags: function (input) {
        // float 만 style 속성에서 날리자
        return input.replace(/<(?:.|\n)*?>/gm, ''); //regex
    },
    formatDate: function (date, format) {
        return moment(date).format(format);
    },
    select: function (selected, option) {
        return option.fn(this)
            .replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"')
            .replace(new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser == loggedUser) {
            if (floating) {
                return (`<a href="/stories/edit/${storyId}" class='btn-floating halfway-fab blue'>
                        <i class='fa fa-pencil'></i></a>`);
            } else {
                return (`<a href="/stories/edit/${storyId}"><i class='fa fa-pencil'></i></a>`)
            }
        } else {
            return '';
        }
    },
    stringify: function (object) {
        return JSON.stringify(object);
    }
}