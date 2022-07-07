$(function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/publisher/get',
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
                   '</td><td>' + data[i].address + 
                   '</td><td>' + status + 
                   '</td><td>' + data[i].createdDate + 
                   '</td><td>' + data[i].updatedDate + 
                   '</td><td><a href="#" class="btn btn-primary" id="id" onclick="editPublisher('+ data[i].id + ')">Edit</a> <a href="#" class="btn btn-danger" id="id" onclick="deletePublisher('+ data[i].id + ')">Delete</a></td></tr>';
                }
                $('#tblpublisher').append(tr);
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
                        address:$('#address').val(),
                        status:$('#status').val()
                    }),
                    url:'http://localhost:8080/publisher/add',
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
                        id:$('#idPublisher').val(),
                        name:$('#name').val(),
                        address:$('#address').val(),
                        status:$('#status').val()
                    }),
                    url:'http://localhost:8080/publisher/update',
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
function editPublisher(id){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/publisher/findById?id='+id,
            success:function(data){
                $('#idPublisher').val(data.id);
                $('#name').val(data.name);
                $('#address').val(data.address);
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

function deletePublisher(id){
           if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/publisher/delete?id='+id,
                success:function(d){
                    location.reload(); 
                },
                error: function(){
                    alert("This data is being used");
                }
            });
        }
   }