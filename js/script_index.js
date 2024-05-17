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

/*  */