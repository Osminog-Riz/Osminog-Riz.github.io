$(document).ready(function () {
    

    // ### Галереи Slick ###

    // Галерея телевизоров
    $(".gallery").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        lazyLoad: "ondemand",
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    arrows: true,
                    dots: false
                }
          }]
    });

    // Галерея сертификатов
    $(".certificate-slider").slick({
        slidesToShow: 3,
        infinite: true,
        prevArrow: "<i class=\"material-icons prev2\">keyboard_arrow_left</i>",
        nextArrow: "<i class=\"material-icons next2\">keyboard_arrow_right</i>",
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    arrows: true,
                    slidesToShow: 2
                }
      }]
    });


    // ### Боковое меню ###

    // Нажатие на кнопку гамбургера (открыть меню)
    $("#nav-btn-open").click(function () {
        $("body").toggleClass("openNav");
    });

    // Нажатие на кнопку крестика (закрыть меню)
    $("#nav-btn-cancel").click(function () {
        $("body").toggleClass("openNav");
    });


    // ### Сохранение введеных данных в LocaleStorage ###

    if (window.localStorage) {

        let elements = document.querySelectorAll("[name]");

        for (var i = 0, length = elements.length; i < length; i++) {
            (function (element) {
                let name = element.getAttribute("name");

                element.value = localStorage.getItem(name) || "";

                element.onkeyup = function () {
                    localStorage.setItem(name, element.value);
                };
            })(elements[i]);
        }
    }


    // ### Работа с формой, AJAX запрос серверу с помощью XMLHttpRequest ###
    // 1. параметр FormID = "myform",
    // id тэга <form> для нужной нам формы
    // 2. параметр Submit Button ID = "myform-sumbit",
    // id кнопки отправки нужной формы
    // 3. параметр Method, не менять!
    // Вызываем AJAX функцию с нашими параметрами формы
    AJAXform("myform", "myform-sumbit", "post");
    AJAXform("modal-myform", "modal-myform-sumbit", "post");

    // Сама функция, которую мы вызываем
    function AJAXform(formID, buttonID, formMethod = "post") {
        // Находим форму по ID.
        var selectForm = document.getElementById(formID);
        // Находим кнопку формы по ID.
        var selectButton = document.getElementById(buttonID);
        // Получаем ссылку на formcarry из action.
        var formAction = document.getElementById(formID).getAttribute("action");
        // Получем данные из input-ов формы.
        var formInputs = document.getElementById(formID).querySelectorAll("input");
        // Получаем данные из textarea формы.
        var formTextAreas = document.getElementById(formID).querySelectorAll("textarea");

        // Функция для отправки данных на сервер
        function XMLhttp() {

            // Создаем пустой запрос
            var httpRequest = new XMLHttpRequest();
            // Создаем объект данных формы
            var formData = new FormData();

            // Заполняем объект данных формы
            for (var i = 0; i < formInputs.length; i++) {
                // Добавляем все инпуты в formData().
                formData.append(formInputs[i].name, formInputs[i].value);
            }
            for (var i = 0; i < formTextAreas.length; i++) {
                // Добавляем все textareas в formData().
                formData.append(formTextAreas[i].name, formTextAreas[i].value);
            }

            // Формируем запрос
            httpRequest.open(formMethod, formAction);
            // Устанавливаем заголовок для получения в ответ JSON файла
            httpRequest.setRequestHeader("Accept", "application/json");
            // Отправляем запрос
            httpRequest.send(formData);
            // Получаем ответ
            httpRequest.onreadystatechange = function () {
                // Когда post прошел успешно
                if (this.readyState == 4 && this.status == 200) {
                    // получить объект ответа
                    var response = JSON.parse(this.response);
                    
                    if(!$("#modal").hasClass("dn")) history.back();
                    alert("Успешно отправлено!");
                    
                    console.log(response);
                    console.log(this);

                }
            };
        }

        // При нажатии на кнопку
        selectButton.onclick = function () {
            // Вызываем функцию, прописанную выше, для отправки данных на сервер
            XMLhttp();
            // Очищаем LocaleStorage
            localStorage.clear();
        }

        // Запрещаем обновление страницы
        selectForm.onsubmit = function () {
            return false;
        }
    }


    var showModal = function () {
        $("#modal").toggleClass("dn");
    }

    window.addEventListener("popstate", function (e) {
        showModal();
    });

    let buttons = document.querySelectorAll(".slbutt");

    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
        var state;
        if (e.target.tagName !== "A") return;
        state = {
            page: e.target.getAttribute("href")
        };
        history.pushState(state, "", state.page);
        showModal();
        e.preventDefault();
    });
    }






});
