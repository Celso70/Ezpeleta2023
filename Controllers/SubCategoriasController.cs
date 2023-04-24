using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpeleta2023.Data;
using Ezpeleta2023.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Ezpeleta2023.Controllers;

public class SubCategoriasController : Controller
{
    private readonly ILogger<SubCategoriasController> _logger;

    private Ezpeleta2023DbContext _contexto;

    public SubCategoriasController(ILogger<SubCategoriasController> logger, Ezpeleta2023DbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        var categorias = _contexto.Categorias.Where(p => p.Eliminado == false).ToList();
        ViewBag.CategoriaID = new SelectList(categorias.OrderBy(p => p.Descripcion),"CategoriaID", "Descripcion");
        return View();
    }

    public JsonResult BuscarSubCategorias(int subcategoriaID = 0)
    {
        List<VistaSubCategoria> subCategoriasMostrar = new List<VistaSubCategoria>();
        var subcategorias = _contexto.SubCategorias.ToList();

        if (subcategoriaID > 0) {
            subcategorias = subcategorias.Where(s => s.SubCategoriaID == subcategoriaID).OrderBy(s => s.Descripcion).ToList();
        }
        foreach (var subCategoria in subcategorias)
        {
            var subCategoriaMostrar = new VistaSubCategoria{
                Descripcion = subCategoria.Descripcion,
                SubCategoriaID = subCategoria.SubCategoriaID,
                CategoriaID = subCategoria.CategoriaID,
                CategoriaDescripcion = subCategoria.Categoria.Descripcion
            };

            subCategoriasMostrar.Add(subCategoriaMostrar);
        }

        return Json(subCategoriasMostrar);
    }

    public JsonResult GuardarSubCategoria(int subcategoriaID, string descripcion, int CategoriaID)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(descripcion)){

               
                        //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
                    if(subcategoriaID == 0){
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                        var subcategoriaOriginal = _contexto.SubCategorias.Where(s => s.Descripcion == descripcion && s.CategoriaID == CategoriaID ).FirstOrDefault();
                    if(subcategoriaOriginal == null){
                      //DECLAMOS EL OBJETO DANDO EL VALOR
                        var subcategoriaGuardar = new SubCategoria{
                            Descripcion = descripcion,
                            CategoriaID = CategoriaID
                        };
                        _contexto.Add(subcategoriaGuardar);
                        _contexto.SaveChanges();
                        resultado = true;

                }

                     
                    }
                    else{
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                        var subcategoriaOriginal = _contexto.SubCategorias.Where(s => s.Descripcion == descripcion && s.SubCategoriaID != subcategoriaID).FirstOrDefault();
                        if(subcategoriaOriginal == null){
                            //crear variable que guarde el objeto segun el id deseado
                            var subcategoriaEditar = _contexto.SubCategorias.Find(subcategoriaID);
                            if(subcategoriaEditar != null){
                                subcategoriaEditar.Descripcion = descripcion;
                                subcategoriaEditar.CategoriaID = CategoriaID;

                                _contexto.SaveChanges();
                                 resultado = true;
                            }
                        }
                       
           
                        }                          
        }

        return Json(resultado);
    }

public JsonResult eliminarSubCategoria(int id,bool valor){
    bool resultado= false;
    SubCategoria? subcategoria = _contexto.SubCategorias.Find(id);
    if (subcategoria!=null)
    {
        subcategoria.Eliminado= valor;
        resultado= true;
        _contexto.SaveChanges();
    }
    return Json(resultado);
    
}

}