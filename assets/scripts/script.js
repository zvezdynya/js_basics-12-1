const button = document.querySelector('#send_comment');
let comments = [];
    document.addEventListener("DOMContentLoaded", function(event) {
        const user = localStorage.getItem('user');
        const avatar = localStorage.getItem('avatar');
        if(user != null) {
            document.querySelector('#user_name').value = user;
        }
        if(avatar != null) {
            document.querySelector('#add_avatar').value = avatar;
        }
        loadComments();
    });
        
    button.onclick = function checkMessage() {
        let userName = document.querySelector('#user_name').value;
        let userComment = document.querySelector('#comment').value;
        let avatar = document.querySelector('#add_avatar').value; 
        let newStr = userComment.replaceAll(/\b(viagra|xxx|ххх)\b/gi, '***');

        if(localStorage.getItem('user') == null) {
            localStorage.setItem('user', userName);
        }

        if(localStorage.getItem('avatar') == null) {
            localStorage.setItem('avatar', avatar);
        }

    let commentBody = {
                avatar : avatar,
                userName : userName,
                userComment : newStr,
                time : Math.floor(Date.now()/1000)
            };
            
    comments.push(commentBody);
    saveComments();
    showComments();
    clearInput();
};

function clearInput() {
    let clear = document.querySelector('#comment');
    clear.value = '';
}

function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

function loadComments() {
            if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
            showComments();
}

function showComments() {
    const fieldComments = document.querySelector('#body_comments');
        let addMessage = '';
    comments.forEach(function(item) {
    addMessage += `<p class="time">${timeConverter(item.time)}</p><div class="flex_container"><img src="${item.avatar}" class="avatar"/><div class="user_nickname">${item.userName}</div><div class="user_comment">${item.userComment}</div></div>`;
    });

    fieldComments.innerHTML = addMessage;
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
    return time;
}