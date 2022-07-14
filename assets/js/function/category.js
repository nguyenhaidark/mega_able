   $(function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/category/get',
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
            success: function(data){
                var tr = "";
                for (var i = 0; i< data.length; i++) {
                    let status;
                    if (data[i].status==true) {
                            status ="show"
                       }else{
                        status="hidden"
                       }
                   tr += '<tr><td>' +data[i].id + 
                   '</td><td>' + data[i].name + 
                   '</td><td>' + status + 
                   '</td><td>' + data[i].createdDate + 
                   '</td><td>' + data[i].updatedDate + 
                   '</td><td><a href="#" class="btn btn-primary" onclick="editcategory(\''+ data[i].id + '\')">Edit</a> <a href="#" class="btn btn-danger" onclick="deletecategory(\''+ data[i].id + '\')">Delete</a></td></tr>';
                }
                $('#tblcategory').append(tr);
            },
            error: function(){
                alert("Unauthorized");
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
            if (action == "add") {
                $.ajax({
                    type:'POST',
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify({
                        name:$('#name').val(),
                        status:valstatus
                    }),
                    url:'http://localhost:8080/category/add',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    success: function(){
                        location.reload(); 
                    },
                    error: function(){
                alert("Unauthorized");
            }
                });
            }else{
              $.ajax({
                    type:'PUT',
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify({
                        id:$('#idCategory').val(),
                        name:$('#name').val(),
                        status:valstatus
                    }),
                    url:'http://localhost:8080/category/update',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    success: function(d){
                        location.reload(); 
                    },
                    error: function(){
                alert("Unauthorized");
            }
                });  
            }
        });  
     }); 
     function editcategory(id){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/category/findById?id='+id,
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
            success:function(data){
                $('#idCategory').val(data.id);
                $('#name').val(data.name);
                 if (data.status==true) {
                    document.getElementById("true").checked = true;
                }
                else{
                    document.getElementById("false").checked = true;
                }
                $('#myModal').modal('show');
                $('#action').html('edit')
            },
            error: function(){
                alert("Unauthorized");
            }
        });
    }

function deletecategory(id){
           if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/category/delete?id='+id,
                beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                success:function(d){
                    location.reload(); 
                },
                error: function(){
                    alert("This data is being used");
                }
            });
        }
   }   