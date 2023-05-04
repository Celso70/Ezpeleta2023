using System.ComponentModel.DataAnnotations;

namespace Ezpeleta2023.Models;

public class Servicio
{
   [Key]
//////////////////////////
//ID DEL SERVICIO
//////////////////////////
public int ServicioID { get; set; }

//////////////////////////
//DESCRIPCION DEL SERVICIO
//////////////////////////

[Display(Name = "Nombre del Servicio")]
[Required(ErrorMessage = "Este valor es Obligatorio.")]
public string? Descripcion { get; set; }

//////////////////////////
//DIRECCION DEL SERVICIO
//////////////////////////

[Display(Name = "Direccion del Servicio")]
[Required(ErrorMessage = "Este valor es Obligatorio.")]
public string? Direccion { get; set; }

//////////////////////////
//TELEFONO DEL SERVICIO
//////////////////////////

[Display(Name = "Telefono")]
[Required(ErrorMessage = "Este valor es Obligatorio.")]
public string? Telefono { get; set; }

//////////////////////////
//ELIMINAR DEL SERVICIO
//////////////////////////

public bool Eliminado { get; set; }

//////////////////////////
//SUBCATEGORIA DEL SERVICIO
//////////////////////////

[Display(Name = "SubCategoria")]

    public int SubCategoriaID { get; set; }

///////////////////////////////////
//RELACIÓN VIRTUAL CON SUBCATEGORIA
///////////////////////////////////
public virtual SubCategoria? SubCategoria { get; set; }



///////////////////////////////////
//COMBO CON EL LISTADO DE CAMPOS
///////////////////////////////////
}

public class vistaservicio{
        public int ServicioID { get; set; }
        public string? Descripcion { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public bool Eliminado { get; set; }
        public int SubCategoriaID { get; set; }
        public string? CategoriaDescripcion { get; set; }
        public int CategoriaID { get; set; }


        public string? SubCategoriaDescripcion { get; set; }
        
}
   
