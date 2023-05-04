window.onload = BuscarServicios();

function VaciarFormulario(){
    $("#Descripcion").val('');
    $("#ServicioID").val(0);
}

function BuscarServicios(){
    $("#tbody-servicios").empty();
        $.ajax({
            // la URL para la petición
            url : '../../Servicios/BuscarServicios',
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { },    
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(servicios) {
             $("#tbody-servicios").empty();
             
                 $.each(servicios, function( index, servicio ){
                    //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                    let botonDeshabilitar = '';
                    let botones = '<button type="submit" onclick="BuscarServicio(' + servicio.servicioID +')"class="btn btn-outline-warning btn-sm" style="margin-right:5px" onkeyup="this.value.toUpperCase()">Editar</button>' +
                    '<button type="submit" onclick="DeshabilitarServicio(' + servicio.servicioID + ',1)" class="btn btn-outline-warning btn-sm">Deshabilitar</button>';
                 //DEFINE SI ESTA ELIMINADA
                if (servicio.eliminado) {
                    botonDeshabilitar = 'table-dark';
                    botones = '<button type="submit" onclick="DeshabilitarServicio(' + servicio.servicioID + ',0)" class="btn btn-outline-warning btn-sm">Activar</button>';
                }
                     $("#tbody-servicios").append(
                        `<tr class="${botonDeshabilitar}">
                         <td class="text-warning">${servicio.descripcion}</td>
                         <td class="text-warning">${servicio.direccion}</td>
                         <td class="text-warning">${servicio.telefono}</td>
                         <td class="text-warning">${servicio.subCategoriaDescripcion}</td>
                         <td class="text-warning">${servicio.categoriaDescripcion}</td>
                         <td class="text-center">${botones}</td></tr>`
                        
                        );
                   
                 });
    
            },
        });
    }

    function BuscarServicio(servicioID){
        $.ajax({
          
          url : '../../Servicios/BuscarServicios',
    
          data : { servicioID: servicioID },    
    
          type : 'GET',
    
          dataType : 'json',
    
          success : function(servicios) {
             
              if (servicios.length == 1){
                  let servicio = servicios[0];
                  $("#ServicioID").val(servicio.servicioID);
                  $("#Descripcion").val(servicio.descripcion);
                  $("#Direccion").val(servicio.direccion);
                  $("#Telefono").val(servicio.telefono);
                  $("#SubCategoriaID").val(servicio.subcategoriaID);
                  $("#ModalServicio").modal("show");
              }
          },
    
          error : function(xhr, status) {
              alert('Error al cargar servicios');
          },
    
          complete : function(xhr, status) {
    
          }
      });
    }



    function GuardarServicio(){
        //JAVASCRIPT
        let servicioID = $("#ServicioID").val();
        let descripcion = $("#Descripcion").val();
        let direccion = $("#Direccion").val();
        let telefono = $("#Telefono").val();
        let subcategoriaID = $("#SubCategoriaID").val();
        console.log(descripcion +" "+ servicioID )
         $.ajax({
             url : '../../Servicios/GuardarServicio',
    
             data : { servicioID : servicioID,subcategoriaID : subcategoriaID, descripcion : descripcion, direccion : direccion, telefono : telefono },    
    
             type : 'POST',
    
             dataType : 'json',
    
             success : function(resultado) {  
                 if(resultado){
                     $("#ModalServicio").modal("hide");
                     BuscarServicios();
                 }        
                else{
                     alert("Existe un Servicio con la misma descripción.");
                }
             },
       
    
             error : function(xhr, status) {
                 alert('Disculpe, existió un problema');
             }
         });
    }

    function DeshabilitarServicio(servicioID, eliminado) {
        //JAVASCRIPT
        // let descripcion1 = document.getElementById("Descripcion").value;
        // let descripcion2 = $("#Descripcion").val();
        // let categoriaID = $("#CategoriaID").val();
        // let eliminar = $("#Eliminar").val();
        $.ajax({
            // la URL para la petición
            url: '../../Servicios/DeshabilitarServicio',
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: { ServicioID: servicioID, Eliminado: eliminado },
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (resultado) {
                if (resultado) {
                    BuscarServicios();
                   
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