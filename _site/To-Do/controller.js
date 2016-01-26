(function(app){
	function Controller(view,model){
		this.view=view;
		this.model=model;
		var self=this;
		this.savedTasks=this.model.tasks;
		this.view.bind("taskinput",function(val){
			self.createNewTask(val);
		});
		this.view.bind("checkall",function(state){
			self.markAllTasks(state);
		});
		this.view.bind("selectfooterelement",function(target){
			self.activeFooterElement(target);
		});
		if(this.savedTasks.length){
			this.showSavesTasks(this.savedTasks);
		}
	}
	Controller.prototype.showSavesTasks=function(savedTasks){
		var self=this;
		this.view.showSavedTasks(savedTasks,function(values){
			self.view.addTemplateToList(values);
		});
		this.view.bind("checktask",function(state,target){self.markTask(state,target);});
		this.view.bind('deletetask',function(target){self.deleteTask(target);});
		this.view.bind('selectfooterelement',function(target){self.activeFooterElement(target);});
		var totalTasks=this.view.totalTasks();
		this.view.selectMarkAll(totalTasks);
		this.view.render("footerVisibility");
		this.view.render("updateCount");
		this.view.render("showClearCompleted");
		this.view.taskVisibility();
		this.view.render("clearInput");
	};
	Controller.prototype.createNewTask=function(val){
		var self = this;
		var values=this.view.render("addItem",val,true);
		this.model.createTask(values);
		this.view.bind("checktask",function(state,target){self.markTask(state,target);});
		this.view.bind('deletetask',function(target){self.deleteTask(target);});
		this.view.render("clearInput");
		this.view.render("footerVisibility");
		this.view.render("updateCount");
		this.view.render("showClearCompleted");
		this.view.taskVisibility();
		var totalTasks=this.view.totalTasks();
		this.view.selectMarkAll(totalTasks);
	};
	Controller.prototype.markAllTasks=function(state){
		this.view.toggleAllTasks(state);
		this.model.changeStatusOfAll(state);
		this.view.render("showClearCompleted");
		this.view.render("updateCount");
		this.view.taskVisibility();
	};
	Controller.prototype.markTask=function(state,target){
		var id=this.view.toggleTask(state,target);
		this.model.changeStatusOfTask(state,id);
		this.view.render("showClearCompleted");
		var totalTasks=this.view.totalTasks();
		this.view.selectMarkAll(totalTasks);
		this.view.taskVisibility();
		this.view.render("updateCount");
	};
	Controller.prototype.deleteTask=function(target){
		var id=this.view.deleteTask(target);
		this.model.removeFromStorage("single",id);
		this.view.render("updateCount");
	};
	Controller.prototype.activeFooterElement=function(target){
		var activeTabId=this.view.activeFooterTab(target);
		if(activeTabId==="clear_tasks"){
				this.model.removeFromStorage("multiple");
			}
		this.view.taskVisibility(target);
		this.view.render("showClearCompleted");
		this.view.render("updateCount");
	};
	app.Controller=Controller;
})(window.app);