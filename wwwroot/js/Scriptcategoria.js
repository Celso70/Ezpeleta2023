window.onload = BuscarCategorias();

function VaciarFormulario(){
    $("#Descripcion").val('');
    $("#CategoriaID").val(0);
}

function BuscarCategorias(){
$("#tbody-categorias").empty();
    $.ajax({
        // la URL para la petición
        url : '../../Categorias/BuscarCategorias',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { },    
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(categorias) {
         $("#tbody-categorias").empty();
         
        //     $.each(categorias, function( index, categoria ) {
        //        $("#tbody-categorias").append(`
        //         <tr>
        //             <td> <a class="btn btn-primary btn-sm" onClick="BuscarCategoria(${categoria.categoriaID})" role="button">${categoria.descripcion}</a></td>
        //         </tr>
                
        //     `);
               
        //     });

        categorias.forEach(categoria=> { 
            let botones = ""
            if(categoria.eliminado){
              botones =`  <td class="text-end"> 
              <button type="submit" class="btn btn-outline-warning btn-sm" onclick="eliminarCategoria(${categoria.categoriaID}, false)">Habilitar</button>
            </td>`
            }
            else{
              botones =` <td class="text-end">
              <button type="submit" class="btn btn-outline-warning btn-sm" onclick="BuscarCategoria(${categoria.categoriaID})">
              Editar
            </button>
            <button type="submit" class="btn btn-outline-warning btn-sm" onclick="eliminarCategoria(${categoria.categoriaID}, true)">
              Deshabilitar
            </button>
            </td>`
            }
            $("#tbody-categorias").append(`
            <tr>
              <td class="${categoria.eliminado ? 'text-decoration-line-through' : ''}"> 
                ${categoria.descripcion}
              </td>
            ${botones}
            </tr>
            `);
    
          })
        },
    });
}
        function eliminarCategoria(id,valor){
            $.ajax({
                url : '../../Categorias/eliminarCategoria',
                data : {id,valor },    
                type : 'POST',
                dataType : 'json',
                success:function(resultado){
                    if (resultado) {
                        BuscarCategorias()
                    }
                    else{
                        alert('No ha sido posible deshabilitar')
                    }
                },

                error:function(error){
                    console.log(error); 
                    alert('Error al cargar categoría');
                    
                },


            })
        }

    //     error : function(xhr, status) {
    //         alert('Error al cargar categorias');
    //     },
   
        
    //     complete : function(xhr, status) {
    //     }
    // });





    
function BuscarCategoria(categoriaID){
      $.ajax({
        
        url : '../../Categorias/BuscarCategorias',

        data : { categoriaID: categoriaID },    

        type : 'GET',

        dataType : 'json',

        success : function(categorias) {
           
            if (categorias.length == 1){
                let categoria = categorias[0];
                $("#Descripcion").val(categoria.descripcion);
                $("#CategoriaID").val(categoria.categoriaID);

                $("#ModalCategoria").modal("show");
            }
        },

        error : function(xhr, status) {
            alert('Error al cargar categorias');
        },

        complete : function(xhr, status) {

        }
    });
}

function GuardarCategoria(){
    //JAVASCRIPT
    let descripcion1 = document.getElementById("Descripcion").value;
    let descripcion2 = $("#Descripcion").val();
    let categoriaID = $("#CategoriaID").val();
    console.log(descripcion1 +" "+ categoriaID )
     $.ajax({
         url : '../../Categorias/GuardarCategoria',

         data : { categoriaID : categoriaID, descripcion : descripcion1 },    

         type : 'POST',

         dataType : 'json',

         success : function(resultado) {  
             if(resultado){
                 $("#ModalCategoria").modal("hide");
                 BuscarCategorias();
             }        
            else{
                 alert("Existe una Categoría con la misma descripción.");
            }
         },
   

         error : function(xhr, status) {
             alert('Disculpe, existió un problema');
         }
     });
}