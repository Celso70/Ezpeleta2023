window.onload = BuscarSubCategorias();

function VaciarFormulario(){
    $("#Descripcion").val('');
    $("#SubCategoriaID").val(0);
}

function BuscarSubCategorias(){
    $("#tbody-subcategorias").empty();
        $.ajax({
            // la URL para la petición
            url : '../../SubCategorias/BuscarSubCategorias',
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { },    
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(subcategorias) {
             $("#tbody-subcategorias").empty();
             
                 $.each(subcategorias, function( index, subcategoria ) {
                    //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                    let BotonDeshabilitar = '';
                    let botones = '<button type="button" onclick="DeshabilitarSubCategoria(' + subcategoria.subcategoriaID +')"class="btn btn-primary btn-sm" style="margin-right:5px" onkeyup="this.value.toUpperCase()">Editar</button>' +
                    '<button type="button" onclick="DeshabilitarSubCategoria(' + subcategoria.subCategoriaID + ',1)" class="btn btn-danger btn-sm">Deshabilitar</button>';
                 //DEFINE SI ESTA ELIMINADA
                if (subcategoria.eliminar) {
                    BotonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DeshabilitarSubCategoria(' + subcategoria.subCategoriaID + ',0)" class="btn btn-warning btn-sm">Activar</button>';
                }
                    $("#tbody-subcategorias").append(`'<tr class=' + BotonDeshabilitar + '>' + '<td>' + subcategoria.descripcion + '</td>' + '<td>' + subcategoria.categoriaDescripcion + '</td>' + '<td class="text-center">' + botones + '</td>' + '</tr>'
                    
                 `);
                   
                 });
    
            },
        });
    }



function eliminarSubCategoria(id,valor){
    $.ajax({
        url : '../../SubCategorias/eliminarSubCategoria',
        data : {id,valor },    
        type : 'POST',
        dataType : 'json',
        success:function(resultado){
            if (resultado) {
                BuscarSubCategorias()
            }
            else{
                alert('No ha sido posible deshabilitar')
            }
        },

        error:function(error){
            console.log(error); 
            alert('Error al cargar Sub-categoría');
            
        },


    })
}


function BuscarSubCategoria(subcategoriaID){
    $.ajax({
      
      url : '../../SubCategorias/BuscarSubCategorias',

      data : { subcategoriaID: subcategoriaID },    

      type : 'GET',

      dataType : 'json',

      success : function(subcategorias) {
         
          if (subcategorias.length == 1){
              let subcategoria = subcategorias[0];
              $("#Descripcion").val(subcategoria.descripcion);
              $("#SubCategoriaID").val(subcategoria.subcategoriaID);

              $("#ModalSubCategoria").modal("show");
          }
      },

      error : function(xhr, status) {
          alert('Error al cargar sub categorias');
      },

      complete : function(xhr, status) {

      }
  });
}

function GuardarSubCategoria(){
    //JAVASCRIPT
    let categoriaID = $("#CategoriaID").val();
    let descripcion1 = document.getElementById("Descripcion").value;
    let descripcion2 = $("#Descripcion").val();
    let subcategoriaID = $("#SubCategoriaID").val();
    console.log(descripcion1 +" "+ subcategoriaID )
     $.ajax({
         url : '../../SubCategorias/GuardarSubCategoria',

         data : { subcategoriaID : subcategoriaID,categoriaID : categoriaID, descripcion : descripcion1 },    

         type : 'POST',

         dataType : 'json',

         success : function(resultado) {  
             if(resultado){
                 $("#ModalSubCategoria").modal("hide");
                 BuscarSubCategorias();
             }        
            else{
                 alert("Existe una Sub-Categoría con la misma descripción.");
            }
         },
   

         error : function(xhr, status) {
             alert('Disculpe, existió un problema');
         }
     });
}