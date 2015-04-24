/**
 * 公用函数
 * @author lyw
 * @date 2015-2-25
 */
/*********************************************************************************/
 /******************************************	公用函数   **************************/
 /**********************************************************************************/
var PublicClass = function(){
	this.ShowLoading = function(){
		var loading = '<div class="modal-backdrop fade in" id="loading"><div><img src="./images/loading.gif"></div></div>';		
		$("body").append(loading);	
		$('#loading').css({'z-index':2000});
		var width = $(window).width();
		var height =$(window).height();
		var padding = (height-128)/2+'px ' + (width-128)/2 + 'px';
		$('#loading div').css({'padding':padding});
		return true;
	};
	
	this.HideLoading = function(){
		$("#loading").remove();
		return true;
	};

	this.ShowAjaxError = function(XMLHttpRequest, textStatus, errorThrown){  
		var ErrorInfo = "";
		if(XMLHttpRequest.readyState == 4){
	    	ErrorInfo = "服务器遇到了意料不到的情况，不能完成您的请求<br>请联系管理员！  错误代码：" + XMLHttpRequest.status;
		}else{
			ErrorInfo = "未知错误！<br>请联系管理员！";
		}
		var alertmodal = 
			'<div class="modal fade" id="alert_modal">' +
				'<div class="modal-dialog">' +
					'<div class="alert alert-danger fade in">' +
						'<h3>' + ErrorInfo +'</h3>' +
						'<p><button type="button" class="btn btn-danger" data-dismiss="modal" aria-hidden="true">确定</button></p>' +
					'</div>' +
				'</div>' +
			'</div>';
		$("#alert_modal").remove();
		$("body").append(alertmodal);
		$("#alert_modal").modal("show");
		return false;
	};
	
	this.appendHints = function(obj, opts){
		opts = jQuery.extend({
			id : 'id',
			message : '警告提示：',
			type : 'alert-warning',
			method : 'append', 
			button : false,
			button_primary : true,
			button_primary_text : '确定',
			button_primary_type : 'btn-warning',
			button_primary_click : function(){
			},
			
			button_default : false,
			button_default_text : '取消',
			button_default_click : function(){
				$("#"+opts.id).remove();
			}
		}, opts||{});
		
		var button = "";
		if (opts.button) {
			button = '<p>';
			if(opts.button_default) {
				button += '<button type="button" class="btn ' + opts.button_primary_type + '">'+ opts.button_primary_text + '</button>&nbsp;&nbsp;<button type="button" class="btn btn-default">' + opts.button_default_text + '</button>';
			} else {
				button += '<button type="button" class="btn btn-default">' + opts.button_default_text + '</button>';
			}
			button += '</p>';
		}
		var hints = 
			'<div id="' + opts.id + '" class="alert ' + opts.type + ' alert-dismissible fade in" role="alert">' +
				'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
				'<p class="lead">' + opts.message +' </p>' + button +
			'</div>';
		switch (opts.method){
			case 'append' : obj.append(hints); break;
			case 'before' : obj.before(hints); break;
			case 'after' : obj.after(hints); break;
			case 'prepend' : obj.prepend(hints); break;
			case 'html' : obj.html(hints); break;
			default : obj.append(hints);
		}
		if (opts.button) {
			$("#"+opts.id + " ." + opts.button_primary_type + "").bind("click", opts.button_primary_click);
		}
		if(opts.button_default){
			$("#"+opts.id + " .btn-default").bind("click", opts.button_default_click);
		}	
		return true;
	};
	//阻止冒泡函数
	this.stopBubble = function (e){   
	    if(e && e.stopPropagation){
	        e.stopPropagation();    //w3c
	    }else{
	        window.event.cancelBubble=true; //IE
	    }
	};
};