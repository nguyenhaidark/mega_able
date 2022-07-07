   $(function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/category/get',
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
            if (action == "add") {
                $.ajax({
                    type:'POST',
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify({
                        name:$('#name').val(),
                        status:$('#status').val()
                    }),
                    url:'http://localhost:8080/category/add',
                    success: function(){
                        location.reload(); 
                    },
                    error: function(msg){
                        alert(msg.statusText);
                    }
                });
            }else{
              $.ajax({
                    type:'PUT',
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify({
                        id:$('#idCategory').val(),
                        name:$('#name').val(),
                        status:$('#status').val()
                    }),
                    url:'http://localhost:8080/category/update',
                    success: function(d){
                        location.reload(); 
                    },
                    error: function(msg){
                        alert(msg.statusText);
                    }
                });  
            }
        });  
     }); 
     function editcategory(id){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/category/findById?id='+id,
            success:function(data){
                $('#idCategory').val(data.id);
                $('#name').val(data.name);
                 if (data.status==true) {
                    document.getElementById("status").checked = true;
                 }
                $('#myModal').modal('show');
                $('#action').html('edit')
            },
            error:function(msg){
                alert(msg.statusText);
            }
        });
    }

function deletecategory(id){
           if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/category/delete?id='+id,
                success:function(d){
                    location.reload(); 
                },
                error: function(){
                    alert("This data is being used");
                }
            });
        }
   }   