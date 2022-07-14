 $(function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/blog/get',
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
                   '</td><td>' + data[i].title + 
                   '</td><td>' + data[i].content + 
                   '</td><td>' + '<img src="http://localhost:8080/image/'+data[i].fileName+'" alt="Trulli" width="50" height="33">'+
                   '</td><td>' +  status + 
                   '</td><td>' + data[i].createdDate + 
                   '</td><td>' + data[i].updatedDate + 
                   '</td><td><a href="#" class="btn btn-primary" onclick="editblog(\''+ data[i].id + '\')">Edit</a> <a href="#" class="btn btn-danger" onclick="deleteblog(\''+ data[i].id + '\')">Delete</a></td></tr>';
            }
                $('#tblblog').append(tr);
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
            if ($('#file').val() == '') {
                alert('Plase select file');
                return;
            }
            var action = $('#action').html();
             let file = document.getElementById("file");
            var status = document.getElementsByName('status');
            var valstatus;
            for(i = 0; i < status.length; i++) {
                if(status[i].checked)
                valstatus=status[i].value;
            }
            let formData = new FormData();
            if (action!="add") {
                formData.append('id',$('#idBlog').val());
            }
            formData.append('title',$('#title').val());
            formData.append('content',$('#content').val());
            formData.append("file",document.getElementById("file").files[0]);
            if (action == "add") {
                $.ajax({
                    type:'POST',
                    contentType:false,
                    data: formData,
                    url:'http://localhost:8080/blog/add',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    cache : false,
                    processData: false,
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
                    contentType:false,
                    data: formData,
                    url:'http://localhost:8080/blog/update',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    cache : false,
                    processData: false,
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

 function editblog(id){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/blog/findById?id='+id,
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
            success:function(data){
                $('#idBlog').val(data.id);
                $('#title').val(data.title);
                $('#content').val(data.content);
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

function deleteblog(id){
           if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/blog/delete?id='+id,
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