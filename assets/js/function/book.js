    getCategory();
    getAuthor();
    getPublisher();
    $(function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/book/get',
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
            success: function(data){
                var tr = "";
                for (var i = 0; i< data.length; i++) {
                    let text;
                    if (data[i].status==true) {
                            text ="show"
                       }else{
                        text="hidden"
                       }
                   tr += '<tr><td>' +data[i].id + 
                   '</td><td>' + data[i].name + 
                   '</td><td>'+'<img src="http://localhost:8080/image/'+data[i].fileName+'" alt="Trulli" width="50" height="33">' +
                   '</td><td>'+ data[i].price + 
                   '</td><td>'+ data[i].saleprice + 
                   '</td><td>'+ data[i].quantity + 
                   '</td><td>'+ text + 
                   '</td><td>' + data[i].createdDate + 
                   '</td><td>' + data[i].updatedDate + 
                   '</td><td><a href="#" class="btn btn-primary" id="id" onclick="editBook('+ data[i].id + ')">Edit</a> <a href="#" class="btn btn-danger" id="id" onclick="deleteBook(\''+ data[i].id + '\')">Delete</a></td></tr>';
            }
                $('#tblbook').append(tr);
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
            formData.append("file",document.getElementById("file").files[0]);
            formData.append('name',$('#name').val());
            formData.append('price',$('#price').val());
            formData.append('saleprice',$('#saleprice').val());
            formData.append('status',valstatus);
            formData.append('quantity',$('#quantity').val());
            var cat = document.getElementById("category");
            var aut = document.getElementById("authors");
            var pub = document.getElementById("publisher");
            formData.append('categories',cat.value);
            formData.append('authors',aut.value);
            formData.append('publisher',pub.value);
            if (action!="add") {
                formData.append('id',$('#idBook').val());
            }
            if (action=="add") {
                $.ajax({
                    type:'POST',
                    contentType:false,
                    data: formData,
                    url:'http://localhost:8080/book/add',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    cache : false,
                    processData: false,
                    success:function(){
                        location.reload();  
                    },
                    error: function(){
                alert("Unauthorized");
            }
                });
            }
            else{
              $.ajax({
                    type:'PUT',
                    contentType:false,
                    data: formData,
                    url:'http://localhost:8080/book/update',
                    beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                    cache : false,
                    processData: false,
                    success:function(){
                        location.reload();  
                    },
                    error: function(){
                alert("Unauthorized");
            }
                });  
            }
        });
     });
    function editBook(id){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/book/findById?id='+id,
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
            success:function(data){
                $('#idBook').val(data.id);
                $('#name').val(data.name);
                $('#price').val(data.price);
                $('#saleprice').val(data.saleprice);
                $('#quantity').val(data.quantity);
                 if (data.status==true) {
                    document.getElementById("status").checked = true;
                 }
                $('#myModal').modal('show');
                $('#action').html('edit')
            },
            error: function(){
                alert("Unauthorized");
            }
        });
    }
    function getCategory(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/category/get',
            success:function(data){
                for (var i = 0; i < data.length; i++) {
                    $('#category').append($("<option/>",{
                        value:data[i].name,
                        text:data[i].name,
                    }));
                }
            }
        });
    }

    function getAuthor(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/author/get',
            success:function(data){
                for (var i = 0; i < data.length; i++) {
                    $('#authors').append($("<option/>",{
                        value:data[i].name,
                        text:data[i].name,
                    }));
                }
            }
        });
    }
    function getPublisher(){
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/publisher/get',
            success:function(data){
                for (var i = 0; i < data.length; i++) {
                    $('#publisher').append($("<option/>",{
                        value:data[i].name,
                        text:data[i].name,
                    }));
                }
            }
        }); 
    }
    function deleteBook(id){
        if (confirm('You may want to delete ?')) {
            $.ajax({
                type:'DELETE',
                url:'http://localhost:8080/book/delete?id='+id,
                beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("key"));
            },
                success:function(d){
                    alert(d);
                    window.location.reload();
                },
                error: function(){
                    alert("This data is being used");
                }
            });
        }
    }