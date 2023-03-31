const sendCommentBtn = document.querySelector('#send_comment');
const inUserName = document.querySelector('#user_name');
const inComment = document.querySelector('#comment');
const inAvatar = document.querySelector('#add_avatar');
let comments = [];

// функция форматирования имени
const formatUserName = () => {
    let formatName = inUserName.value.trim(); // получаю имя из инпута в переменную, убираю лишние пробелы по краям
    formatName = formatName.toLowerCase(); // понижаю регистр каждой буквы
    formatName = formatName[0].toUpperCase() + formatName.slice(1); // формирую новую строку, 1буква прописная, остальные - строчные
    return formatName; // возвращаю форматированное имя
};

// функция форматирования комментария
const formatUserComment = () => {
    const regex = /\b(viagra|xxx)\b/gmi; // регулярка для спам-проверки
    let formatComment = inComment.value; // получаю текст комментария
    formatComment = formatComment.replaceAll(regex, '***'); // спам-проверка, заменяю все непроходящие её элементы на ***
    return formatComment; // возвращаю отформатированные коммент
};

// функция добавления объекта комментария в массив
function addCommentToArr() {
    const commentObj = {
        user: formatUserName(),
        avatar: inAvatar.value,
        comment: formatUserComment(),
        data: Math.floor(Date.now()/1000),
    }; // создаю объект комментария
    comments.push(commentObj); // добавляю в массив
}

// проверка локального хранилища и наполнение данными
const checkLocal = () => {
    let user = localStorage.getItem('user'); // получаю в переменную ключ из локал
    let avatar = localStorage.getItem('avatar'); // получаю в переменную ключ из локал
    let comment = localStorage.getItem('comments'); // получаю в переменную ключ из локал

    if(user != null) { // если ключ есть
        document.querySelector('#user_name').value = user; // заполняю инпут для ввода имени значением этого ключа
    }

    if(avatar != null) { // если ключ есть
        document.querySelector('#add_avatar').value = avatar; //заполняю инпут для аватара значением ключа
    }

    if (comment != null) { // если ключ есть
        comments = JSON.parse(localStorage.getItem('comments')); //десериализую сохраненные объекты комментариев
        showComments(); // вывожу на страницу
    }
};

// добавление ключей и значений в локал
const showUser = () => {
    if(localStorage.getItem('user') == null) { // проверяю, есть ли в локал ключ юзер
        localStorage.setItem('user', formatUserName()); // если нет - добавляю пару ключ-значение
    }

    if(localStorage.getItem('avatar') == null) { // проверяю, есть ли в локал ключ аватар
        localStorage.setItem('avatar', inAvatar.value); // если нет - добавляю пару ключ-значение
    }
};

//
function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000); // создаю объект даты, метку времени UNIX преобразую в миллисекунды
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // массив месяцев
    let year = a.getFullYear(); // получаю полную дату
    let month = months[a.getMonth()]; // месяц
    let date = a.getDate(); // день
    let hour = a.getHours(); // час
    let min = a.getMinutes(); // минуты
    let sec = a.getSeconds(); // секунды
    let data = `${date} ${month} ${year} ${hour}:${min}:${sec}`; // формирую строку вывода даты и времени
    return data; // возвращаю
}

// функция создания и отображения на странице новых элементов
function showComments() {
    let fieldComments = document.querySelector('#body_comments'); // получаю контейнер, в который положу новое содержание
    let addMessage = '';
    comments.forEach(item => {
        addMessage += `<p class="time">${timeConverter(item.data)}</p><div class="flex_container"><img src="${item.avatar}" class="avatar"/><div class="user_nickname">${item.user}</div><div class="user_comment">${item.comment}</div></div>`;
    }); // формирую разметку для каждого комментария

    fieldComments.innerHTML = addMessage; // добавляю разметку в контейнер
    return addMessage; // возвращаю новый элемент
}

// очищаю область ввода комментария
function clearInput() {
    let clear = document.querySelector('#comment');
    clear.value = '';
}

// создаю ячейку в локал, куда добавляю ключ и значение - сериализированный массив с объектами комментариев
function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// оборачиваю все функции в одну
function sendCommentToChat() {
    formatUserName();
    formatUserComment();
    addCommentToArr();
    showUser();
    saveComments();
    showComments();
    clearInput();
}

document.addEventListener('DOMContentLoaded', checkLocal); // реагирую на загрузку страницы
sendCommentBtn.addEventListener('click', sendCommentToChat); // реагирую на клик по кнопке