	$(function(){
		$.ajax({
            type:'GET',
            url:'http://localhost:8080/user/get',
            success: function(data){
                var tr = "";
                for (var i = 0; i< data.length; i++) {
                	let roles = data[i].roles.map(r => r.name);
                    let status;
                    let gender;
                    if (data[i].status==true) {
                            status ="acceptance"
                       }else{
                        status="block"
                       }
                        if (data[i].gender==true) {
                            gender ="male"
                       }else{
                        gender="female"
                       }
                   tr += '<tr><td>' +data[i].id + 
                   '</td><td>' + data[i].name + 
                   '</td><td>'+ data[i].phone + 
                   '</td><td>'+ data[i].address + 
                   '</td><td>'+ gender + 
                   '</td><td>'+ status + 
                   '</td><td>'+ roles + 
                   '</td><td>' + data[i].createdDate + 
                   '</td><td>' + data[i].updatedDate + 
                   '</td><td><a href="#" class="btn btn-primary" id="id" onclick="editUser('+ data[i].id + ')">Edit</a> <a href="#" class="btn btn-danger" id="id" onclick="deleteUser(\''+ data[i].id + '\')">Delete</a></td></tr>';
            }
                $('#tbluser').append(tr);
            },
            error: function(msg){
                alert(msg.statusText);
            } 
        });
        $('#btnadd').click(function(){
            $('#action').html('add');
            $('#myModal').modal('show');
            $('#formDataHtml').trigger("reset");
            });
         $('#btnsave').click(function(){
         	var action = $('#action').html();
            var status = document.getElementsByName('status');
            var valstatus;
            for(i = 0; i < status.length; i++) {
                if(status[i].checked)
                valstatus=status[i].value;
            }
            var gender = document.getElementsByName('gender');
            var valgender;
            for(i = 0; i < gender.length; i++) {
                if(gender[i].checked)
                valgender=gender[i].value;
            }
         	if (action=="add") {
                $.ajax({
                    type:'POST',
                    url:'http://localhost:8080/auth/signup',
                    contentType: "application/json",
                    data: JSON.stringify({
                        name:$("#name").val(),
                        username:$("#username").val(),
                        password:$("#password").val(),
                        phone:$("#phone").val(),
                        email:$("#email").val(),
                        address:$("#address").val(),
                        gender:valgender,
                        status:valstatus,
                        role:["mod"]
                    }),
                    success:function(){
                        location.reload();  
                    },
                    error: function(msg){
                        alert(msg.statusText);
                    }
                });
            }else{
              $.ajax({
                    type:'PUT',
                    url:'http://localhost:8080/user/update',
                    contentType: "application/json",
                    data: JSON.stringify({
                        id:$("#idUser").val(),
                        name:$("#name").val(),
                        username:$("#username").val(),
                        password:$("#password").val(),
                        phone:$("#phone").val(),
                        email:$("#email").val(),
                        address:$("#address").val(),
                        gender:valgender,
                        status:valstatus,
                        role:["mod"]
                    }),
                    success:function(){
                        location.reload();  
                    },
                    error: function(msg){
                        alert(msg.statusText);
                    }
                });  
            }
        });
	});
	function editUser(id){
		const element = document.getElementById("divpassword");
  				element.remove();
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/user/findById?id='+id,
            success:function(data){
                $('#idUser').val(data.id);
                $('#name').val(data.name);
                $('#username').val(data.username);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                $('#address').val(data.address);
                if (data.gender==true) {
                    document.getElementById("gtrue").checked = true;
                }
                else{
                    document.getElementById("gfalse").checked = true;
                }
                if (data.status==true) {
                    document.getElementById("strue").checked = true;
                }
                else{
                    document.getElementById("sfalse").checked = true;
                }
                $('#myModal').modal('show');
                $('#action').html('edit')
            },
            error:function(msg){
                alert(msg.statusText);
            }
        });
    }
	function deleteUser(id){
        if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/user/delete?id='+id,
                success:function(d){
                    window.location.reload();
                },
                error: function(){
                    alert("This data is being used");
                }
            });
        }
    }