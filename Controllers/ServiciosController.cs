using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpeleta2023.Data;
using Ezpeleta2023.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using static Ezpeleta2023.Models.Servicio;



namespace Ezpeleta2023.Controllers;

[Authorize]
public class ServiciosController : Controller
{
    private readonly ILogger<ServiciosController> _logger;

    private Ezpeleta2023DbContext _contexto;

    public ServiciosController(ILogger<ServiciosController> logger, Ezpeleta2023DbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index ()
    {
        var subcategorias = _contexto.SubCategorias.Where(p => p.Eliminado == false).ToList();
         ViewBag.SubCategoriaID = new SelectList(subcategorias.OrderBy(p => p.Descripcion),"SubCategoriaID", "Descripcion");
        return View();
    }

    public JsonResult BuscarServicios(int servicioID = 0)
    {
        List<vistaservicio> serviciosMostrar = new List<vistaservicio>();
        var servicios = _contexto.Servicios.Include(s => s.SubCategoria).Include(s => s.SubCategoria.Categoria).Where(s => s.SubCategoria.Eliminado == false).ToList();

        if (servicioID > 0) {
            servicios = servicios.Where(s => s.ServicioID == servicioID).OrderBy(s => s.Descripcion).ToList();
        }
        foreach (var servicio in servicios)
        {
            var servicioMostrar = new vistaservicio{
                ServicioID = servicio.ServicioID,
                Descripcion = servicio.Descripcion,
                Direccion = servicio.Direccion,
                Telefono = servicio.Telefono,
                SubCategoriaID = servicio.SubCategoriaID,
                Eliminado = servicio.Eliminado,
                CategoriaDescripcion = servicio.SubCategoria.Categoria.Descripcion,
                CategoriaID = servicio.SubCategoria.Categoria.CategoriaID,
                
                SubCategoriaDescripcion = servicio.SubCategoria.Descripcion
            };

            serviciosMostrar.Add(servicioMostrar);
        }

        return Json(serviciosMostrar);
    }

    public JsonResult GuardarServicio(int servicioID, string descripcion, string direccion, string telefono , int subcategoriaID )
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(descripcion)){

               
                        //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
                    if(servicioID == 0){
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                        var servicioOriginal = _contexto.Servicios.Where(s => s.Descripcion == descripcion && s.SubCategoriaID == subcategoriaID ).FirstOrDefault();
                    if(servicioOriginal == null){
                      //DECLAMOS EL OBJETO DANDO EL VALOR
                        var servicioGuardar = new Servicio{
                            Descripcion = descripcion,
                            Direccion = direccion,
                            Telefono = telefono,
                            SubCategoriaID = subcategoriaID,
                            
                        };
                        _contexto.Add(servicioGuardar);
                        _contexto.SaveChanges();
                        resultado = true;

                }

                     
                    }
                    else{
                        //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                        var servicioOriginal = _contexto.Servicios.Where(s => s.Descripcion == descripcion && s.ServicioID != servicioID).FirstOrDefault();
                        if(servicioOriginal == null){
                            //crear variable que guarde el objeto segun el id deseado
                            var servicioEditar = _contexto.Servicios.Find(servicioID);
                            if(servicioEditar != null){
                                servicioEditar.Descripcion = descripcion;
                                servicioEditar.Direccion = direccion;
                                servicioEditar.Telefono = telefono;
                                servicioEditar.SubCategoriaID = subcategoriaID;

                                _contexto.SaveChanges();
                                 resultado = true;
                            }
                        }
                       
           
                        }                          
        }

        return Json(resultado);
    }

public JsonResult DeshabilitarServicio(int servicioID, int Eliminado)
    {
        int resultado = 0;
        //SE BUSCA EL ID DE LA CATEGORIA EN EL CONTEXTO
        var servicio = _contexto.Servicios.Find(servicioID);
        //CATEGORIA DIFERENTE DE NULL
        if (servicio != null)
        {
            //CATEGORIA.ELIMINAR IGUAL A FALSO SE ELIMINARA. SI YA ESTA ELIMINADA SE RESTAURA
            if (servicio.Eliminado == false)
            {
                servicio.Eliminado = true;
                _contexto.SaveChanges();

            }
            else
            {

                servicio.Eliminado = false;
                _contexto.SaveChanges();
                


            }
            //PASA RESULTADO A 1
            resultado = 1;
           

        }
        
        return Json(resultado);
    }



}
