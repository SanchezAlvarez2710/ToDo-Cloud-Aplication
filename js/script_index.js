/* Add Modal */
$(".addTodo").click(function () {
    $(".addmodal").addClass("modal--active");
});
$(".legend__close").click(function () {
    $(".addmodal").removeClass("modal--active");
});

/* Edit Modal */
$(".action--edit").click(function () {
    $(".editmodal").addClass("modal--active");
});
$(".legend__close").click(function () {
    $(".editmodal").removeClass("modal--active");
});

/* Delete Modal */
$(".action--delete").click(function () {
    $(".deletemodal").addClass("modal--active");
});
$(".legend__close").click(function () {
    $(".deletemodal").removeClass("modal--active");
});
$(".options__cancel").click(function () {
    $(".deletemodal").removeClass("modal--active");
});

/* DynamoDB Conection */
const api_root = "https://cdgpy409fg.execute-api.us-east-2.amazonaws.com/register/"
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", api_root);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects["todo"]) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</td>';
                trHTML += '<td>' + object['title'] + '</td>';
                trHTML += '<td>' + object['status'] + '</td>';
                trHTML += '<td>' + object['date'] + '</td>';
                trHTML +=
                    '<td class="table__actions">' +
                    '<button class="action action--edit" onclick="showTodoEditBox(' + object['id'] + ')">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit"' +
                    'width="26" height="26" viewBox="0 0 24 24" stroke-width="1.5" stroke="#363e6b"' +
                    'fill="none" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path stroke="none" d="M0 0h24v24H0z" fill="none" />' +
                    '<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />' +
                    '<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />' +
                    '<path d="M16 5l3 3" />' +
                    '</svg>' +
                    '</button>' +
                    '<button class="action action--delete" onclick="todoDelete(' + object['id'] + ')">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"' +
                    'width="26" height="26" viewBox="0 0 24 24" stroke-width="1.5" stroke="#363e6b"' +
                    'fill="none" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path stroke="none" d="M0 0h24v24H0z" fill="none" />' +
                    '<path d="M4 7l16 0" />' +
                    '<path d="M10 11l0 6" />' +
                    '<path d="M14 11l0 6" />' +
                    '<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />' +
                    '<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />' +
                    '</svg>' +
                    '</button>' +
                    '</td>'
                trHTML += "</tr>";
            }
            document.getElementById("table__body").innerHTML = trHTML;
        }
    };
}
loadTable();

function todoCreate() {
    const title = document.getElementById("title--add").value;
    const date = document.getElementById("date--add").value;
    const description = document.getElementById("description--add").value;
    const status = "ToDo";
    const id = (Math.floor(Math.random() * 10001)).toString();

    const xhttp = new XMLHttpRequest();
    const data = JSON.stringify({ "title": title, "status": status, "description": description, "date": date })
    console.log(data);
    xhttp.open("POST", api_root);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "id": id, "title": title, "status": status, "description": description, "date": date }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}

function showTodoEditBox(id) {
    id = id.toString()
    console.log(id);

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", api_root + "?id=" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify());
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            console.log(objects)
            const todo = objects;
            console.log(todo);
            document.getElementById("id--edit").value(todo["id"]);
            document.getElementById("title--edit").value(todo["title"]);
            document.getElementById("status--edit").value(todo["status"]);
            document.getElementById("date--edit").value(todo["date"]);
            document.getElementById("description--edit").value(todo["description"]);
        }
    };
}

function todoEdit() {
    const id = document.getElementById("id--edit").value;
    const title = document.getElementById("title--edit").value;
    const status = document.getElementById("status--edit").value;
    const date = document.getElementById("date--edit").value;
    const description = document.getElementById("description--edit").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", api_root);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "id": id, "title": title, "status": status, "date": date, "description": description}));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}

function todoDelete(id) {
    id = id.toString()
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", api_root);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify({ "id": id }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}