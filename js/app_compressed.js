var app=app||{};(function(){app.Person=Backbone.Model.extend({defaults:{name:"",selected:!1,current:!1},toggle:function(){this.save({selected:!this.get("selected")})}})})(jQuery);app=app||{};(function(){app.PersonList=Backbone.Collection.extend({model:app.Person,selected:function(){return this.filter(function(a){return a.get("selected")})},unselected:function(){return this.filter(function(a){return!a.get("selected")})},nextOrder:function(){return!this.length?1:this.last().get("order")+1},comparator:function(a){return a.get("order")}})})(jQuery);app=app||{};
(function(){app.AppView=Backbone.View.extend({el:"#draw-app",events:{"click #edit-draw-items":"editPersons","click #control-button":"draw","click #cancel-edit-items":"cancelEdit","dblclick #ul-draw-list":"editList"},initialize:function(){this.collection=new app.PersonList;this.personListView=new app.PersonListView({collection:this.collection});this.selectedListView=new app.SelectedListView({collection:this.collection});this.personListText=this.$("#text-draw-list")},render:function(){},editList:function(){this.$el.find("#form-edit-list").show();
this.$el.find("#div-draw-list").hide()},cancelEdit:function(){this.$el.find("#form-edit-list").hide();this.$el.find("#div-draw-list").show()},editPersons:function(){this.cancelEdit();var a=this;this.collection.remove(this.collection.models);var b=this.personListText.val().split(/\r\n|\r|\n/);_.each(b,function(b){b=b.trim();""!==b&&a.collection.add({name:b})});this.personListView.render();this.selectedListView.render()},draw:function(){if(0===this.collection.unselected().length)alert("Oops, there is no person left to be selected.");
else{var a=this;if(this.looping)this.$el.find("#control-button").val("Start"),clearInterval(this.looping),delete this.looping,this.currentPerson.set({selected:!0}),this.selectedListView.render();else{this.$el.find("#control-button").val("Stop");var b=function(){a.currentPerson&&a.currentPerson.set({current:!1});a.currentPerson=a.getRandomPerson();a.currentPerson.set({current:!0});a.$el.find("#current-item").html(a.currentPerson.get("name"))};b();this.looping=setInterval(b,100)}}},getRandomPerson:function(){var a=
this.collection.unselected().length,a=_.random(0,a-1);return this.collection.unselected()[a]}})})(jQuery);app=app||{};(function(a){app.PersonView=Backbone.View.extend({tagName:"li",initialize:function(){this.options.selected?this.template=_.template(a("#selected-person-template").html()):(this.options.selected=!1,this.template=_.template(a("#person-template").html()));_.bindAll(this,"render");this.model.on("change",this.render);this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));return this},close:function(){this.off();this.remove()}})})(jQuery);app=app||{};(function(){app.PersonListView=Backbone.View.extend({el:"#ul-draw-list",personViewList:[],initialize:function(){},render:function(){for(var a=this;this.personViewList[0];)this.personViewList.pop().close();_.each(this.collection.models,function(b){b=new app.PersonView({model:b});a.personViewList.push(b);a.$el.append(b.$el)});return this}})})(jQuery);app=app||{};(function(a){app.SelectedView=Backbone.View.extend({tagName:"li",events:{"click .delete":"setUnselected"},initialize:function(){this.template=_.template(a("#selected-person-template").html());_.bindAll(this,"render");this.model.on("change",this.render);this.render()},setUnselected:function(){this.model.set({selected:!1})},render:function(){this.model.get("selected")?this.$el.html(this.template(this.model.toJSON())):this.$el.html("");return this},close:function(){this.off();this.remove()}})})(jQuery);app=app||{};(function(){app.SelectedListView=Backbone.View.extend({el:"#ul-selected-list",personViewList:[],initialize:function(){},render:function(){for(var a=this;this.personViewList[0];)this.personViewList.pop().close();_.each(this.collection.selected(),function(b){b=new app.SelectedView({model:b});a.personViewList.push(b);a.$el.append(b.$el)});return this}})})(jQuery);app=app||{};(function(a){var b=new app.AppView;a("#ul-draw-list").selectLess();0===b.collection.models.length&&(a("#text-draw-list").val("Harry Potter\nRon Weasley\nHermione Granger\nGinny Weasley\nNeville Longbottom\nLuna Lovegood\nDraco Malfoy\nSirius Black\nJames Potter\nLily Potter\nAlbus Dumbledore\nMinerva McGonagall\nRubeus Hagrid\nSeverus Snape\nArthur Weasley\nAlastair Moody\nRemus Lupin\nNymphadora Tonks"),b.editPersons())})(jQuery);