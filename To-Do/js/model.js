(function(w) {
    function Model() {
        this.localStorage = w.localStorage;
        if (this.localStorage.getItem('todos') === null) {
            this.localStorage.setItem('todos', JSON.stringify([]));
        }
        this.tasks = $.parseJSON(this.localStorage.getItem('todos'));
    }
    Model.prototype.createTask = function(values) {
        this.tasks.push(values);
        this.localStorage.setItem("todos", JSON.stringify(this.tasks));
    };
    Model.prototype.changeStatusOfTask = function(state, id) {
        var taskArray = this.tasks,
            self = this;
        $.each(taskArray, function(index) {
            if (id === taskArray[index].id.toString()) {
                self.changeStatus(index, state);
                return false;
            }
        });
    };
    Model.prototype.changeStatusOfAll = function(state) {
        var taskArray = this.tasks,
            self = this;
        $.each(taskArray, function(index) {
            self.changeStatus(index, state);
        });
    };
    Model.prototype.changeStatus = function(index, state) {
        var taskStatus, taskArray = this.tasks;
        (state) ? taskStatus = "completed" : taskStatus = "active";
        taskArray[index].status = taskStatus;
        this.localStorage.setItem("todos", JSON.stringify(taskArray));
    };
    Model.prototype.removeFromStorage = function(taskcount, targetid) {
        var taskArray = this.tasks,
            self = this;
        if (taskcount === "single") {
            $.each(taskArray, function(index) {
                if (taskArray[index].id.toString() === targetid) {
                    taskArray.splice(index, 1);
                    return false;
                }
            });
        } else if (taskcount === "multiple") {
            var i = 0;
            len = taskArray.length;
            for (i = 0; i < len; i++) {
                if (taskArray[i].status == "completed") {
                    taskArray.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        this.localStorage.setItem("todos", JSON.stringify(taskArray));
    };
    w.app = w.app || {};
    app.Model = Model;
})(window);