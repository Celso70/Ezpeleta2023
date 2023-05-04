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
             
                 $.each(subcategorias, function( index, subcategoria ){
                    //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                    let botonDeshabilitar = '';
                    let botones = '<button type="submit" onclick="BuscarSubCategoria(' + subcategoria.subCategoriaID +')"class="btn btn-outline-warning btn-sm" style="margin-right:5px" onkeyup="this.value.toUpperCase()">Editar</button>' +
                    '<button type="submit" onclick="DeshabilitarSubCategoria(' + subcategoria.subCategoriaID + ',1)" class="btn btn-outline-warning btn-sm">Deshabilitar</button>';
                 //DEFINE SI ESTA ELIMINADA
                if (subcategoria.eliminado) {
                    botonDeshabilitar = 'table-warning';
                    botones = '<button type="submit" onclick="DeshabilitarSubCategoria(' + subcategoria.subCategoriaID + ',0)" class="btn btn-outline-warning btn-sm">Activar</button>';
                }
                     $("#tbody-subcategorias").append(
                        `<tr class="${botonDeshabilitar}">
                         <td class="text-warning">${subcategoria.descripcion}</td> 
                         <td class="text-warning">${subcategoria.categoriaDescripcion}</td>
                         <td class="text-center">${botones}</td></tr>`
                        
                        );
                   
                 });
    
            },
        });
    }



// function eliminarSubCategoria(id,valor){
//     $.ajax({
//         url : '../../SubCategorias/eliminarSubCategoria',
//         data : {id,valor },    
//         type : 'POST',
//         dataType : 'json',
//         success:function(resultado){
//             if (resultado) {
//                 BuscarSubCategorias()
//             }
//             else{
//                 alert('No ha sido posible deshabilitar')
//             }
//         },

//         error:function(error){
//             console.log(error); 
//             alert('Error al cargar Sub-categoría');
            
//         },


//     })
// }


function BuscarSubCategoria(subcategoriaID){
    $.ajax({
      
      url : '../../SubCategorias/BuscarSubCategorias',

      data : { subcategoriaID: subcategoriaID },    

      type : 'GET',

      dataType : 'json',

      success : function(subcategorias) {
            // console.log(subcategorias)
          if (subcategorias.length == 1){
              let subcategoria = subcategorias[0];
              $("#Descripcion").val(subcategoria.Descripcion);
              $("#SubCategoriaID").val(subcategoria.subCategoriaID);
              $("#CategoriaID").val(subcategoria.categoriaID);
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
    // console.log(subcategoriaID);
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

function DeshabilitarSubCategoria(subcategoriaID, eliminado) {
    //JAVASCRIPT
    // let descripcion1 = document.getElementById("Descripcion").value;
    // let descripcion2 = $("#Descripcion").val();
    // let categoriaID = $("#CategoriaID").val();
    // let eliminar = $("#Eliminar").val();
    $.ajax({
        // la URL para la petición
        url: '../../SubCategorias/DeshabilitarSubCategoria',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { SubCategoriaID: subcategoriaID, Eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                BuscarSubCategorias();
               
            }
            // else {
            //     alert("Existe una Categoría con la misma descripción.");
            // }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
        
    });

}