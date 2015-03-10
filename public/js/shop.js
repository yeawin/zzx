/**
 * 周边商家
 * @author lyw
 * @date 2015-2-25
 */
var Public = new PublicClass();
var promise = false;

$(function(){
	$(".nav-sidebar li").bind("click", function(){
		$(".nav-sidebar li").removeClass("active");
		$(this).addClass("active");
		if (1 == $(this).index()) addShopInit();
		else if (0 == $(this).index()) listShop();
	});
});

/**
 * 商家入驻
 */
function addShopInit()
{
	$.ajaxSetup({
		 cache: true,
		 data: {
			 
		 }
	});
    $.ajax({
    	url: "./shop/signin?" +  Math.random(),   // 提交的页面
        type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	    async : true,
	    dataType : "text",
	    beforeSend : Public.ShowLoading,
	    complete : Public.HideLoading,
	    error: Public.ShowAjaxError,
	    success: function(data){
	    	$("#shop_container").html(data);	
	    	addShopSubmit();
	    	$("input[name=ServicePromise]").bind("click", function(){
	    		if($(this).is(':checked')) {
	    			promise = true;
	    		} else {
	    			promise = false;
	    		}
	    	});
	    }
  });
}


/**
 * 商家入驻提交数据库
 */
function addShopSubmit()
{
	//提交表单
	var opts = {
			url:'./shop/signed',
	        type:      'post' ,      
	        dataType:  'text'   ,    
			beforeSubmit : function(){
				if (!promise) {
					alert('请同意服务承诺！');
					return false;
				}
			},
		    beforeSend: Public.ShowLoading,
			complete: Public.HideLoading,
	        error: Public.ShowAjaxError,
	        success: function(data){
	        	$("#shop_container").html(data);	
	        }

		};	
	$("form[name=FormShopSignin]").ajaxForm(opts);
}

/**
 * 商家列表
 */
function listShop()
{
	$.ajaxSetup({
		 cache: true,
		 data: {
			 
		 }
	});
    $.ajax({
    	url: "./shop/list?" +  Math.random(),   // 提交的页面
        type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	    async : true,
	    dataType : "text",
	    beforeSend : Public.ShowLoading,
	    complete : Public.HideLoading,
	    error: Public.ShowAjaxError,
	    success: function(data){
	    	$("#shop_container").html(data);	    	
	    }
  });
}