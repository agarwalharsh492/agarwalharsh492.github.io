(function(app) {

    function View(id) {
        var ctn = $(id);
        this.elem = {
            taskinput: ctn.find('#task_input'),
            input: ctn.find('#input'),
            mark_all: ctn.find('#mark_all'),
            content: ctn.find('#content'),
            footer: ctn.find('#footer'),
            tasksleft: ctn.find('#tasksleft'),
            states: ctn.find('#states'),
            n_tasks: ctn.find('#n_tasks'),
            all_tasks: ctn.find('#all_tasks'),
            active_tasks: ctn.find('#active_tasks'),
            comp_tasks: ctn.find('#comp_tasks'),
            clear_tasks: ctn.find('#clear_tasks'),
            number_tasks: ctn.find('.tasks'),
            completedTasks: ctn.find('.completed'),
            activetasks: ctn.find('.active'),
            markcomp: ctn.find('.mark_com'),
        };
        this.Template = Handlebars.compile($('#task-template').html());
    }

    View.prototype.bind = function(e, handler) {
        var $elements = this.elem;
        if (e === "taskinput") {
            $elements.taskinput.on('keypress', function(event) {
                var keyCode = event.which,
                    value = $elements.taskinput.val();
                if (keyCode === 13 && value) {
                    handler(value);
                }
            });
        } else if (e === "checkall") {
            $elements.mark_all.on('click', function(event) {
                handler(this.checked);
            });
        } else if (e === "checktask") {
            $('.mark_com').on('click', function(event) {
                handler(this.checked, event.target);
            });
        } else if (e === "deletetask") {
            $('.delete').on('click', function(event) {
                handler(event.target);
            });
        } else if (e === "selectfooterelement") {
            $elements.footer.on('click', function(event) {
                handler(event.target);
            });
        }
    };

    View.prototype.render = function(cmd, parameter, isReturning) {
        var $elements = this.elem,
            values;
        switch (cmd) {
            case "addItem":
                values = this.addTemplateToList(parameter);
                break;

            case "clearInput":
                $elements.taskinput.val("");
                break;

            case "footerVisibility":
                var $footer = $elements.footer;
                (parameter === 0) ? $footer.addClass('hidden') : $footer.removeClass('hidden');
                break;
            
            case "updateCount":
                var c = $('.active').length,
                    str;
                $('#n_tasks').html(c);
                (c == 1) ? str = 'task left' : str = 'tasks left';
                $("#pluralize").html(str);
                break;
            
            case "showClearCompleted":
                ($('.completed').length === 0) ? $elements.clear_tasks.addClass('hidden') : $elements.clear_tasks.removeClass('hidden');
                break;
        }
        if (isReturning) {
            return values;
        }

    };
    
    View.prototype.addTemplateToList = function(val) {
        var values;
        if (typeof val === "string") {
            values = {
                id: this.getTime(),
                status: 'active',
                task: val
            };
        } else if (typeof val === "object") {
            values = val;

        }
        var $elements = this.elem,
            state = values.status;
        $elements.content.prepend(this.Template(values));
        (state === "completed") ? state = true : state = false;
        $('#content div:first').find('input').prop('checked', state);
        return values;
    };
    
    View.prototype.totalTasks = function() {
        var num = $('.tasks').length;
        return num;
    };
    
    View.prototype.toggleAllTasks = function(state) {
        var $tasks = $('.tasks'),
            $markcompleted = $('.mark_com');
        (state) ? $tasks.removeClass('active').addClass('completed') : $tasks.removeClass('completed').addClass('active');
        $markcompleted.prop('checked', state);
    };
    
    View.prototype.toggleTask = function(state, target) {
        var $task = $(target.closest('div'));
        (state) ? $task.removeClass('active').addClass('completed') : $task.removeClass('completed').addClass('active');
        return $task.attr('id');
    };
    
    View.prototype.deleteTask = function(target) {
        var $task = $(target).closest('.tasks'),
            id = $task.attr('id');
        $task.remove();
        return id;
    };
    
    View.prototype.activeFooterTab = function(target) {
        var activeTab = target.id;
        if (activeTab === "all_tasks" || activeTab === "active_tasks" || activeTab === "comp_tasks") {
            $('#footer button').each(function() {
                $(this).removeClass('isActive');
            });
            $(target).addClass('isActive');
        }
        return activeTab;
    };
    
    View.prototype.taskVisibility = function(target) {
        var activeTab, $activetasks = $('.active'),
            $completedTasks = $('.completed');
        if (target) {
            activeTab = target.id;
        } else {
            activeTab = $('.isActive').attr('id');
        }
        if (activeTab === "all_tasks") {
            $('.tasks').each(function() {
                $(this).removeClass('hidden');
            });
        } else if (activeTab === "active_tasks") {
            $completedTasks.each(function() {
                $(this).addClass('hidden');
            });
            $activetasks.each(function() {
                $(this).removeClass('hidden');
            });
        } else if (activeTab === "comp_tasks") {
            $activetasks.each(function() {
                $(this).addClass('hidden');
            });
            $completedTasks.each(function() {
                $(this).removeClass('hidden');
            });
        } else if (activeTab === "clear_tasks") {
            $completedTasks.remove();
        }
    };

    View.prototype.selectMarkAll = function(totalTasks) {
        var $elements = this.elem;
        if (totalTasks === $('.completed').length && totalTasks !== 0) {
            $elements.mark_all.prop('checked', true);
        } else {
            $elements.mark_all.prop('checked', false);
        }
    };

    View.prototype.getTime = function() {
        var timeStamp = new Date().getTime();
        return timeStamp;

    };

    View.prototype.showSavedTasks = function(savedTasks, handler) {
        var $elements = this.elem,
            self = this;
        $.each(savedTasks, function(index) {
            var values = {
                id: savedTasks[index].id,
                status: savedTasks[index].status,
                task: savedTasks[index].task,
            };
            handler(values);
        });
    };

    app.View = View;
})(window.app);