$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/pay/hdDevice/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			merchNo : {
				required : true
			},
			aliLongId:{
				required : true
			},
			code:{
				required : true
			},
			url:{
				required : true
			},
			company:{
				required : true
			}
			
		},
		messages : {
			merchNo : {
				required : icon + "请输入商户号"
			},
			aliLongId : {
				required : icon + "请输入支付宝账号"
			},
			code : {
				required : icon + "请输入编号"
			},
			url : {
				required : icon + "请输入穿透地址"
			},
			company : {
				required : icon + "请选择支付公司穿"
			}
		}
	})
}