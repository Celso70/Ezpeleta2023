using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpeleta2023.Data;
using Ezpeleta2023.Models;

namespace Ezpeleta2023.Controllers;

public class CategoriasController : Controller
{
    private readonly ILogger<CategoriasController> _logger;
    private Ezpeleta2023DbContext _contexto;

    public CategoriasController(ILogger<CategoriasController> logger, Ezpeleta2023DbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult BuscarCategorias(int categoriaID = 0)
    {
        var categorias = _contexto.Categorias.ToList();

        if (categoriaID > 0) {
            categorias = categorias.Where(c => c.CategoriaID == categoriaID).OrderBy(c => c.Descripcion).ToList();
        }

        return Json(categorias);
    }

    public JsonResult GuardarCategoria(int categoriaID, string descripcion)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(descripcion)){

               
                        //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
                    if(categoriaID == 0){
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                        var categoriaOriginal = _contexto.Categorias.Where(c => c.Descripcion == descripcion).FirstOrDefault();
                if(categoriaOriginal == null){
                      //DECLAMOS EL OBJETO DANDO EL VALOR
                        var categoriaGuardar = new Categoria{
                            Descripcion = descripcion
                        };
                        _contexto.Add(categoriaGuardar);
                        _contexto.SaveChanges();
                        resultado = true;

                }

                     
                    }
                    else{
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                        var categoriaOriginal = _contexto.Categorias.Where(c => c.Descripcion == descripcion && c.CategoriaID != categoriaID).FirstOrDefault();
                        if(categoriaOriginal == null){
                            //crear variable que guarde el objeto segun el id deseado
                            var categoriaEditar = _contexto.Categorias.Find(categoriaID);
                            if(categoriaEditar != null){
                                categoriaEditar.Descripcion = descripcion;
                                _contexto.SaveChanges();
                                 resultado = true;
                            }
                        }
                       
           
                        }                          
        }

        return Json(resultado);
    }

public JsonResult eliminarCategoria(int id,bool valor){
    bool resultado= false;
    Categoria categoria = _contexto.Categorias.Find(id);
    if (categoria!=null)
    {
        var categoria30 = _contexto.SubCategorias.Where(s => s.CategoriaID == id && s.Eliminado == false).Count();
        if (categoria30 == 0)
        {
            categoria.Eliminado= valor;
            resultado= true;
            _contexto.SaveChanges();
        }
    }
    return Json(resultado);
    
}


   
}